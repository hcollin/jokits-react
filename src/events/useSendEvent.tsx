import joki from '../joki';
import { useCallback } from 'react';
import { JokiEvent } from 'jokits';

export default function useSendEvent(
    senderName: string
): (event: JokiEvent) => void {
    const send = useCallback(
        (event: JokiEvent) => {
            const ev: JokiEvent = { ...event, from: senderName };
            joki.trigger(ev);
        },
        [senderName]
    );

    return send;
}
