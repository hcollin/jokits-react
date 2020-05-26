// import styles from './styles.module.css'
import { useState, useEffect } from 'react';
import { JokiAtom } from 'jokits';
import joki from '../joki';

export default function useAtomValue<T>(atomId: string, defaultValue: T) {
    const [value, setValue] = useState<T>(defaultValue);

    useEffect(() => {
        if (!joki.atom.has(atomId)) {
            console.log(
                `jokits-react: useAtomValue: creating new atom ${atomId} with value ${defaultValue}`
            );
            joki.atom.set(atomId, defaultValue);
        }

        const a: JokiAtom<T> = joki.atom.get<T>(atomId);
        const aVal: T = a.get();
        console.log(
            `jokits-react: useAtomValue: Atom ${atomId} currently has value ${aVal}`
        );
        setValue(aVal);

        const stop = a.subscribe((val: T) => {
            console.log(
                `jokits-react: useAtomValue: ${atomId} value updated to ${val}`
            );
            setValue(val);
        });

        return () => {
            console.log(
                `jokits-react: useAtomValue: ${atomId} stop listening changes`
            );
            stop();
        };
    }, [atomId, defaultValue]);

    return value;
}
