// crude parseBool function
export const parseBool = (value: string): boolean => {
    return /true/i.test(value as string);
};

/** Check to see if value contains false */
export const loggingEnabled = (value: string): boolean => {
    return /(LOG|INFO|WARN|ERROR)/gi.test(value as string);
};

export const NOOP = () => {};
