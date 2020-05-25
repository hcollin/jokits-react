import { useEffect, useState } from 'react';
import joki from '../joki';
import { JokiState } from 'jokits';


export default function useJokiStateValue(): string | undefined {
    const [currentState, setCurrentState] = useState<string | undefined>(
        undefined
    );

    useEffect(() => {
        const state: JokiState = joki.state.get();
        setCurrentState(state.state);

        const stop = joki.state.listen((st: JokiState) => {
            setCurrentState(st.state);
        });

        return () => {
            stop();
        };
    }, []);

    return currentState;
}
