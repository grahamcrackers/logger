import { createLogger } from "../src/index";

const logger = createLogger({
    isEnabled: true,
});


logger.log("Test Log")
