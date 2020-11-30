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
    JokiEvent,
    JokiSubscriber,
    JokiConfigs,
    JokiSubscriberOnce,
} from 'jokits';
// import { JokiConfigs } from 'jokits/dist/createJoki';
import { toggleLogging } from './tools/jokitsLogger';
import useSetAtom from './atoms/useSetAtom';

function config(key: keyof JokiConfigs, value: string) {
    joki.config(key, value);
}

function trigger(event: JokiEvent) {
    joki.trigger(event);
}

function on(subscriber: JokiSubscriber) {
    return joki.on(subscriber);
}

function once(subscriber: JokiSubscriberOnce) {
    return joki.once(subscriber);
}

export {
    joki,
    toggleLogging,
    useAtom,
    useAtomValue,
    useSetAtom,
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
    trigger,
    on,
    once,
};
