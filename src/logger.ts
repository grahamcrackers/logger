// example of custom logger for client side apps
// https://stackoverflow.com/a/18939803

import { NOOP } from "./helpers";
import type { LoggerOptions } from "./types";
import { LogLevel } from "./types";

// TODO: Look at winston to see how it handles logging to the console. I really just wanted an option to log
// to console while developing and then turn it off in a production build.

export const createLogger = ({ isEnabled = true, logLevel = LogLevel.LOG }: LoggerOptions = {}) => {
    return {
        log: (...params: Parameters<typeof console.log>) => {
            if (!isEnabled || logLevel > 0) return NOOP;

            return global.console.log.bind(global.console, "log: %s")(...params);
        },
        info: (...params: Parameters<typeof console.info>) => {
            if (!isEnabled && logLevel > 1) return NOOP;

            return global.console.info.bind(global.console, "info: %s")(...params);
        },
        warn: (...params: Parameters<typeof console.warn>) => {
            if (!isEnabled && logLevel > 2) return NOOP;

            return global.console.warn.bind(global.console, "warn: %s")(...params);
        },
        error: (...params: Parameters<typeof console.error>) => {
            if (!isEnabled) return NOOP;

            return global.console.error.bind(global.console, "error: %s")(...params);
        },
    };
};
