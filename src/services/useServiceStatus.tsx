import { JokiEvent, JokiServiceEvent, JokiServiceStatus } from 'jokits';
import { useEffect, useState } from 'react';
import joki from '../joki';

export default function useServiceStatus(serviceId: string): JokiServiceStatus {
    const [status, setStatus] = useState<JokiServiceStatus>(
        JokiServiceStatus.UNKNOWN
    );

    useEffect(() => {
        return joki.on({
            from: serviceId,
            action: JokiServiceEvent.StatusUpdate,
            fn: (event: JokiEvent) => {
                setStatus((prev: JokiServiceStatus) => {
                    if (event.data === prev) return prev;
                    return event.data;
                });
            },
        });
    }, []);

    return status;
}
