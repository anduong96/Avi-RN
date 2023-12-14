import { Logger } from './_instance';

export const logger = new Logger();

export const createLogger = (name: string) => logger.getSubLogger(name);
