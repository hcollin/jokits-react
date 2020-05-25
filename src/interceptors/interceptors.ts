import joki from '../joki';
import { JokiInterceptor } from 'jokits';

export function addInterceptor(interceptor: JokiInterceptor): string {
    return joki.interceptor.add(interceptor);
}

export function removeInterceptor(interceptorId: string): void {
    return joki.interceptor.remove(interceptorId);
}
