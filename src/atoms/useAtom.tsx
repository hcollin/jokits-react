// import styles from './styles.module.css'
import { useState, useEffect, useCallback } from 'react';
import { JokiAtom } from 'jokits';
import joki from '../joki';
import { debug } from '../tools/jokitsLogger';

export default function useAtom<T>(
    atomId: string,
    defaultValue: T
): [T | undefined, (val: T) => void] {
    const [value, setValue] = useState<T>(defaultValue);
    const [atom, setAtom] = useState<JokiAtom<T> | null>(null);

    useEffect(() => {
        if (!joki.atom.has(atomId)) {
            debug(
                `useAtom: creating new atom ${atomId} with value ${defaultValue}`
            );
            joki.atom.set(atomId, defaultValue);
        }

        const a: JokiAtom<T> = joki.atom.get<T>(atomId);
        const aVal: T = a.get();
        debug(`useAtom: Atom ${atomId} currently has value ${aVal}`);
        setAtom(a);
        setValue(aVal);

        const stop = a.subscribe((val: T) => {
            debug(`useAtom: ${atomId} value updated to ${val}`);
            setValue(val);
        });

        return () => {
            debug(`useAtom: ${atomId} stop listening changes`);
            stop();
        };
    }, [atomId, defaultValue]);

    const updateAtomValue = useCallback(
        (val: T): void => {
            debug(`useAtom: ${atomId} update atom value to ${val} by callback`);
            if (atom !== null) {
                atom.set(val);
            }
        },
        [atom]
    );

    return [value, updateAtomValue];
}
