let loggingOn: boolean = false;


export function debug(msg: string, args?: any): void {
    loggingOn && console.log(`jokits-react:DEBUG: ${msg}`, args);
}

export function log(msg: string, args?: any): void {
    loggingOn && console.log(`jokits-react:LOG: ${msg}`, args);
}

export function warn(msg: string, args?: any): void {
    loggingOn && console.warn(`jokits-react:WARN: ${msg}`, args);
}

export function error(msg: string, args?: any): void {
    loggingOn && console.error(`jokits-react:ERROR: ${msg}`, args);
}

export function toggleLogging(to?: boolean) {
    if (to !== undefined) {
        loggingOn = to;
    } else {
        loggingOn = !loggingOn;
    }
}
