export const LogLevel = {
    LOG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
};

export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

export type LoggerOptions = {
    isEnabled?: boolean;
    logLevel?: LogLevel;
};
