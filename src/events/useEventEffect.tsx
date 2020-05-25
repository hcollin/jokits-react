import { useEffect } from 'react';
import joki from '../joki';
import { JokiEvent, JokiSubscriber } from 'jokits';

interface EventRules {
    to?: string;
    from?: string;
    action?: string;
}

export default function useEventEffect<T>(
    cb: <T>(
        data?: T | undefined,
        event?: JokiEvent,
        eventRules?: EventRules
    ) => void,
    eventRules: EventRules
): void {
    useEffect(() => {
        function eventHandler(event: JokiEvent) {
            if (event.data !== undefined) {
                const eventData: T = event.data as T;
                cb<T>(eventData, event, eventRules);
            } else {
                cb<T>(undefined, event, eventRules);
            }
        }

        const eventSub: JokiSubscriber = { ...eventRules, fn: eventHandler };
        const stop = joki.on(eventSub);

        return () => {
            stop();
        };
    }, [cb, eventRules]);
}
