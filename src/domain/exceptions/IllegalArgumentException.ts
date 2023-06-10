// import { logger } from "../../logger";
//
// const log = logger();

export class IllegalArgumentException extends Error {
  constructor(message: string | undefined) {
    super(message);
    // log.error(message);
  }
}