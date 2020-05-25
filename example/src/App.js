import React from 'react';

import {
    useAtom,
    useAtomValue,
    useService,
    addService,
    addProcessor,
    useEvents,
    useEventEffect,
    addJokiStates,
    useJokiStateValue,
    useJokiState,
    config,
} from 'jokits-react';
import 'jokits-react/dist/index.css';

// config('logger', 'ON');

function TestService(serviceId, api) {
    const state = new Map();

    function eventHandler(event) {
        if (event.to === serviceId && event.action === 'add') {
            state.set(event.data.id, event.data.data);
            api.updated(state);
        }
    }

    function getState() {
        return state;
    }

    return {
        eventHandler,
        getState,
    };
}

addService({
    serviceId: 'testService',
    service: TestService,
});

function mapToArrayProcessor(event) {
    if (!event.data instanceof Map) {
        return event;
    }

    const ev = { ...event };
    const arr = [];
    ev.data.forEach((v, k) => {
        arr.push({
            id: k,
            value: v,
        });
    });
    ev.data = arr;

    return ev;
}

function alertProcessor(event, api) {
    if (event.action !== 'ProcessorAlert') {
        api.trigger({
            from: 'Processor',
            action: 'ProcessorAlert',
            data: event,
        });
    }

    return event;
}

addProcessor({
    action: 'ServiceStateUpdated',
    fn: mapToArrayProcessor,
});

addProcessor({
    action: 'getServiceState',
    fn: mapToArrayProcessor,
});

addProcessor({
    fn: alertProcessor,
});

addJokiStates([
    {
        state: 'ANONYM',
        validNext: ['USER', 'ADMIN'],
        initial: true,
    },
    {
        state: 'USER',
        validNext: 'ANONYM',
    },
    {
        state: 'ADMIN',
        validNext: 'ANONYM',
    },
]);

const App = () => {
    const appState = useJokiStateValue();
    console.log(appState);

    if (!appState) {
        return <div>Loading...</div>;
    }

    if (appState === 'ANONYM') {
        return <LoginButton />;
    }

    return (
        <div>
            <LoginButton />
            <TestComp />
            <TestComp />
            <AtomDisplay />
            <EventTracker />
            <Alert />
        </div>
    );
};

function LoginButton() {
    const [jokiState, change] = useJokiState();

    if (jokiState !== 'ANONYM') {
        return (
            <div>
                <button onClick={() => change('ANONYM')}>LOGOUT</button>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => change('USER')}>Login</button>
        </div>
    );
}

function TestComp() {
    const [val, setVal] = useAtom('tst', 0);

    const [st, send] = useService('testService');

    function more() {
        setVal(val + 1);
        send('add', { id: `id-${val + 1}`, data: `Number ${val + 1} reached` });
    }

    return (
        <div>
            <h1>COMPONENT</h1>
            <p>Value: {val} </p>
            <button onClick={more}>MORE!</button>
        </div>
    );
}

function AtomDisplay() {
    const value = useAtomValue('tst', 0);

    return (
        <div>
            <h1>{value}</h1>
        </div>
    );
}

function EventTracker() {
    useEventEffect((data, event) => {
        console.log('DATA!', data, event);
    }, []);

    const data = useEvents({});
    console.log('EVENT', data);
    return null;
}

function Alert() {
    useEventEffect(
        (data, event) => {
            console.log('PROCESSOR ALERT!', event, data);
        },
        { action: 'ProcessorAlert' }
    );

    return null;
}

export default App;
