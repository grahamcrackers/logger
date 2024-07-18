// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// credit https://github.com/gregberge/std-mocks

// Expose methods.
exports.use = use;
exports.restore = restore;
exports.flush = flush;

/**
 * Store original writes.
 */

const originalWrites = {
    stdout: process.stdout.write,
    stderr: process.stderr.write,
};

/**
 * Data.
 */

const cachedData = {
    stdout: [],
    stderr: [],
};

/**
 * Defaults.
 */

const defaultOpts = {
    stdout: true,
    stderr: true,
    print: false,
};

/**
 * Start mocking std output.
 *
 * @param {object} [options] Options
 * @param {boolean} [options.stdout=true] Mock stdout
 * @param {boolean} [options.stderr=true] Mock stderr
 * @param {boolean} [options.print=false] Also print to std
 */

function use(options = {}) {
    options = { ...defaultOpts, ...options };

    if (options.stdout) wrapWrite("stdout", options.print);

    if (options.stderr) wrapWrite("stderr", options.print);
}

/**
 * Wrap write method.
 *
 * @param {string} std Std
 * @param {boolean} print Also print to std
 */

function wrapWrite(std, print) {
    process[std].write = function (data) {
        cachedData[std].push(data);

        // eslint-disable-next-line prefer-rest-params
        if (print) originalWrites[std].apply(process[std], arguments);
    };
}

/**
 * Restore std output.
 *
 * @param {object} [options] Options
 * @param {boolean} [options.stdout=true] Mock stdout
 * @param {boolean} [options.stderr=true] Mock stderr
 */

function restore(options = {}) {
    options = { ...defaultOpts, ...options };

    if (options.stdout) process.stdout.write = originalWrites.stdout;

    if (options.stderr) process.stderr.write = originalWrites.stderr;
}

/**
 * Flush collected data.
 *
 * @param {object} [options] Options
 * @param {boolean} [options.stdout=true] Mock stdout
 * @param {boolean} [options.stderr=true] Mock stderr
 * @returns {object} Object containing two array corresponding to outputs.
 */

function flush(options = {}) {
    options = { ...defaultOpts, ...options };

    const flushed = {};

    if (options.stdout) {
        flushed.stdout = cachedData.stdout;
        cachedData.stdout = [];
    }

    if (options.stderr) {
        flushed.stderr = cachedData.stderr;
        cachedData.stderr = [];
    }

    return flushed;
}
