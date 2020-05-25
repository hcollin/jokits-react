import { useEffect, useState, useCallback } from 'react';
import joki from '../joki';
import { JokiState } from 'jokits';


export default function useJokiState(): [
    string,
    (newState: string) => boolean
] {
    const [jokiState, setJokiState] = useState<JokiState | undefined>();

    useEffect(() => {
        const state: JokiState = joki.state.get();
        setJokiState(state);

        const stop = joki.state.listen((st: JokiState) => {
            setJokiState(st);
        });

        return () => {
            stop();
        };
    }, []);

    const change = useCallback(
        (newState: string): boolean => {
            if (jokiState !== undefined) {
                if (jokiState.validNext.includes(newState)) {
                    joki.state.set(newState);
                    return true;
                }
            } else {
                console.warn('No initial state defined for Joki.');
            }

            return false;
        },
        [jokiState]
    );

    const currentState: string = jokiState !== undefined ? jokiState.state : '';

    return [currentState, change];
}
