// Extends Express' Request type with the userId that the auth middleware sets on it.
export {};

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}
