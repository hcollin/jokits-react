import joki from '../joki';
import { JokiServiceFactory } from 'jokits';

export function addService<T>(service: JokiServiceFactory<T>) {
    joki.service.add(service);
}

export function removeService(serviceId: string) {
    joki.service.remove(serviceId);
}

export function serviceGetState<T>(serviceId: string): T {
    return joki.service.getState(serviceId);
}
