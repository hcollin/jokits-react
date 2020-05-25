import joki from '../joki';
import { JokiMachineState, JokiState } from 'jokits';


export function addJokiStates(statuses: JokiMachineState[]) {
    joki.state.init(statuses);
}

export function setJokiState(state: string): boolean {
    try {
        joki.state.set(state);
        return true;
    } catch (e) {
        console.warn(e);
        return false;
    }
}

export function getJokiState(): JokiState {
    return joki.state.get();
}
