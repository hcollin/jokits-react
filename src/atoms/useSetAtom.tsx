// import styles from './styles.module.css'
import { useCallback } from 'react';
import joki from '../joki';

export default function useSetAtom<T>(atomId: string): (val: T) => void {
    const updateAtomValue = useCallback(
        (val: T): void => {
            joki.atom.set(atomId, val);
        },
        [atomId]
    );

    return updateAtomValue;
}
