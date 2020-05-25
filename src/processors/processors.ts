import joki from '../joki';
import { JokiProcessor } from 'jokits';

export function addProcessor(processor: JokiProcessor): string {
    return joki.processor.add(processor);
}

export function removeProcessor(processorId: string): void {
    return joki.processor.remove(processorId);
}
