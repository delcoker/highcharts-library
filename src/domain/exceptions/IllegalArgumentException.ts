import { logger } from '../../logger';

const log = logger();

export class IllegalArgumentException extends Error {
  constructor(message) {
    super(message);
    log.error(message);
  }
}