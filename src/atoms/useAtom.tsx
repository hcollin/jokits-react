// import styles from './styles.module.css'
import { useState, useEffect, useCallback } from 'react';
import { JokiAtom } from 'jokits';
import joki from '../joki';

export default function useAtom<T>(
    atomId: string,
    defaultValue: T
): [T | undefined, (val: T) => void] {
    const [value, setValue] = useState<T | undefined>(defaultValue);
    const [atom, setAtom] = useState<JokiAtom<T> | null>(null);

    useEffect(() => {
        if (!joki.atom.has(atomId)) {
            joki.atom.set(atomId, defaultValue);
        }

        const a: JokiAtom<T> = joki.atom.get<T>(atomId);
        setAtom(a);
        setValue(a.get());

        const stop = a.subscribe((val: T) => {
            setValue(val);
        });

        return () => {
            stop();
        };
    }, [atomId, defaultValue]);

    const updateAtomValue = useCallback(
        (val: T): void => {
            if (atom !== null) {
                atom.set(val);
            }
        },
        [atom]
    );

    return [value, updateAtomValue];
}
