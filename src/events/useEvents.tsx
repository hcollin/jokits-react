import { useState, useEffect } from 'react';
import joki from '../joki';
import { JokiEvent, JokiSubscriber } from 'jokits';

interface EventRules {
    to?: string;
    from?: string;
    action?: string;
}

export default function useEvents(rules: EventRules): JokiEvent[] {
    const [event, setEvent] = useState<JokiEvent[]>([]);

    useEffect(() => {
        function handleEvent(incomingEvent: JokiEvent): void {
            console.log(incomingEvent);
            setEvent(prev => {
                return [...prev, incomingEvent];
            });
        }
        const ev: JokiSubscriber = { ...rules, fn: handleEvent };

        const stop = joki.on(ev);
        return () => {
            stop();
        };
    }, [rules]);

    return event;
}
