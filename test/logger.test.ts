import stdMocks from "./mocks/std-mocks";
import { beforeAll, describe, expect, test, vi } from "vitest";
import { createLogger } from "../src/index";

let logger: ReturnType<typeof createLogger>;

const getLogs = () => {
    stdMocks.restore();
    const output = stdMocks.flush();

    return output.stdout;
};

describe("createLogger", () => {
    beforeAll(async () => {
        logger = createLogger();
        stdMocks.use();
    });

    test("log with prefix", async () => {
        const spy = vi.spyOn(logger, "log");

        logger.log("test log");
        stdMocks.restore();
        const { stdout: output } = stdMocks.flush();
        console.log(output);

        expect(spy).toBeCalled();
        expect(output).toContain("log: test log\n");

        spy.mockRestore();
    });
});

describe("createLogger is disabled", () => {
    beforeAll(async () => {
        logger = createLogger({ isEnabled: false });
        stdMocks.use();
    });

    test("log returns nothing", () => {
        const spy = vi.spyOn(logger, "log");

        logger.log("test log");
        const output = getLogs();

        expect(spy).toHaveBeenCalled();
        expect(output.length).toBeFalsy();

        spy.mockRestore();
    });
});
