import useAtom from './atoms/useAtom';
import useAtomValue from './atoms/useAtomValue';
import useService from './services/useService';
import { addService, serviceGetState } from './services/services';
import joki from './joki';
import { addInterceptor, removeInterceptor } from './interceptors/interceptors';
import useEvents from './events/useEvents';

import useSendEvent from './events/useSendEvent';
import useEventEffect from './events/useEventEffect';
import useJokiState from './states/useJokiState';
import useJokiStateValue from './states/useJokiStateValue';
import {
    addJokiStates,
    getJokiState,
    setJokiState,
} from './states/stateMachine';
import {
    JokiInstance,
    JokiInternalApi,
    JokiServiceApi,
    JokiEvent,
    JokiSubscriber,
    JokiServiceFactory,
    JokiMachineState,
    JokiState,
    JokiInterceptor,
    JokiService,
} from 'jokits';
import { JokiConfigs } from 'jokits/dist/createJoki';

function config(key: keyof JokiConfigs, value: string) {
    joki.config(key, value);
}

export {
    joki,
    useAtom,
    useAtomValue,
    useService,
    addService,
    serviceGetState,
    addInterceptor,
    removeInterceptor,
    useEvents,
    useEventEffect,
    useSendEvent,
    useJokiState,
    useJokiStateValue,
    addJokiStates,
    getJokiState,
    setJokiState,
    config,
    JokiConfigs,
    JokiEvent,
    JokiSubscriber,
    JokiServiceFactory,
    JokiInstance,
    JokiMachineState,
    JokiState,
    JokiInterceptor,
    JokiInternalApi,
    JokiServiceApi,
    JokiService,
};
