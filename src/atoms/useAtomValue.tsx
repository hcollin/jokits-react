// import styles from './styles.module.css'
import { useState, useEffect } from 'react';
import { JokiAtom } from 'jokits';
import joki from '../joki';
import { debug } from '../tools/jokitsLogger';

export default function useAtomValue<T>(atomId: string, defaultValue: T) {
    const [value, setValue] = useState<T>(defaultValue);

    useEffect(() => {
        if (!joki.atom.has(atomId)) {
            debug(
                `useAtomValue: creating new atom ${atomId} with value ${defaultValue}`
            );
            joki.atom.set(atomId, defaultValue);
        }

        const a: JokiAtom<T> = joki.atom.get<T>(atomId);
        const aVal: T = a.get();
        debug(`useAtomValue: Atom ${atomId} currently has value ${aVal}`);
        setValue(aVal);

        const stop = a.subscribe((val: T) => {
            debug(`useAtomValue: ${atomId} value updated to ${val}`);
            setValue(val);
        });

        return () => {
            debug(`useAtomValue: ${atomId} stop listening changes`);
            stop();
        };
    }, [atomId, defaultValue]);

    return value;
}
