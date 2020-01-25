export class Flags {
  readonly loading = false;
  readonly loaded = false;
  readonly error = false;

  static loading(): Flags {
    return Object.assign(
      new Flags(),
      {
        loading: true,
      }
    );
  }

  static loaded(): Flags {
    return Object.assign(
      new Flags(),
      {
        loaded: true,
      }
    );
  }

  static error(): Flags {
    return Object.assign(
      new Flags(),
      {
        error: true,
      }
    );
  }
}
