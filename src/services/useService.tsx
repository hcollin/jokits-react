import { useState, useEffect, useCallback } from 'react';
import joki from '../joki';
import { JokiEvent } from 'jokits';


export default function useService<T>(
    serviceId: string,
    name?: string
): [T | undefined, (action: string, data?: any) => void] {
    const [serviceState, setServiceState] = useState<T | undefined>(undefined);

    useEffect(() => {
        const service: T = joki.service.getState(serviceId) as T;
        setServiceState(service);

        const stop = joki.on({
            from: serviceId,
            action: 'ServiceStateUpdated',
            fn: (event: JokiEvent) => {
                if (event.data) {
                    setServiceState(event.data);
                }
            },
        });

        return () => {
            stop();
        };
    }, [serviceId]);

    const send = useCallback(
        (action: string, dataBody?: any) => {
            const ev: JokiEvent = {
                to: serviceId,
                action: action,
            };
            if (dataBody) {
                ev.data = dataBody;
            }
            if (name) {
                ev.from = name;
            }
            joki.trigger(ev);
        },
        [serviceId, name]
    );

    return [serviceState, send];
}
