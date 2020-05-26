import joki from '../joki';
import { JokiMachineState, JokiState } from 'jokits';
import { debug } from '../tools/jokitsLogger';


export function addJokiStates(statuses: JokiMachineState[]) {
    joki.state.init(statuses);
    debug(`StateEngine initialized`, statuses);
}

export function setJokiState(state: string): boolean {
    try {
        joki.state.set(state);
        debug(`StateEngine state changed to ${state}`);
        return true;
    } catch (e) {
        console.warn(e);
        return false;
    }
}

export function getJokiState(): JokiState {
    return joki.state.get();
}
