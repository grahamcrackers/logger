// example of custom logger for client side apps
// https://stackoverflow.com/a/18939803

import { NOOP } from "./helpers";
import type { LoggerOptions } from "./types";
import { LogLevel } from "./types";

// TODO: Look at winston to see how it handles logging to the console. I really just wanted an option to log
// to console while developing and then turn it off in a production build.

export const createLogger = ({ isEnabled = true, logLevel = LogLevel.LOG }: LoggerOptions = {}) => {
    if (typeof window === "undefined") {
        isEnabled = false;
        console.debug("Logging only supported in the browser for now.");
    }

    return {
        log: (...params: Parameters<typeof console.log>) => {
            if (!isEnabled || logLevel > 0) return NOOP;

            return window.console.log.bind(window.console, "log: %o")(...params);
        },
        info: (...params: Parameters<typeof console.info>) => {
            if (!isEnabled && logLevel > 1) return NOOP;

            return window.console.info.bind(window.console, "info: %o")(...params);
        },
        warn: (...params: Parameters<typeof console.warn>) => {
            if (!isEnabled && logLevel > 2) return NOOP;

            return window.console.warn.bind(window.console, "warn: %o")(...params);
        },
        error: (...params: Parameters<typeof console.error>) => {
            if (!isEnabled) return NOOP;

            return window.console.error.bind(window.console, "error: %o")(...params);
        },
    };
};
