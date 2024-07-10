# @grahamcrackers/logger

A naive logger for client side applications.

## basic usage

```ts
// src/logger.ts

import { createLogger, LogLevel } from "@grahamcrackers/logger";

const logger = createLogger({
    // defaults to LogLevel.Log or (0)
    logLevel: LogLevel.Info,
});
```

## settings for different .env

I wanted a logger that I could log during development and if I forget to remove a console log because of reasons
it won't output critical info if building for production.

I mainly use vite for front end apps these days so this example is using that setup. If you use webpack, you can translate the environment variables to your setup.

### .env
your local set up to log everything
```bash
VITE_LOG_LEVEL=0
VITE_LOGGING_ENABLED=true;
```
### .env.production

```bash
VITE_LOG_LEVEL=3
# or disable everything
VITE_LOGGING_ENABLED=false;
```

```ts
// src/logger.ts

import { createLogger, LogLevel } from "@grahamcrackers/logger";

const logger = createLogger({

    isEnabled
    // defaults to LogLevel.Log or (0)
    logLevel: LogLevel.Info,
    
});
```
