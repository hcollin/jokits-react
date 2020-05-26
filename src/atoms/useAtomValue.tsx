// import styles from './styles.module.css'
import { useState, useEffect } from 'react';
import { JokiAtom } from 'jokits';
import joki from '../joki';

export default function useAtomValue<T>(atomId: string, defaultValue: T) {
    const [value, setValue] = useState<T>(defaultValue);

    useEffect(() => {
        if (!joki.atom.has(atomId)) {
            joki.atom.set(atomId, defaultValue);
        }

        const a: JokiAtom<T> = joki.atom.get<T>(atomId);
        setValue(a.get());

        const stop = a.subscribe((val: T) => {
            setValue(val);
        });

        return () => {
            stop();
        };
    }, [atomId, defaultValue]);

    return value;
}
