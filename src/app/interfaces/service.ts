/**
 * Service<T>
 *
 * An interface that accepts a type T and performs an application service with said type.
 * validateSelf(): boolean
 * Returns true|false which describe validity of service data.
 * provideService(arg:T)
 * executes the service of the implementor.
 *
 */
interface Service<T, O> {
  validateServiceArgument?: (arg: T) => boolean;
  provideService: (arg: T) => O;
}

export { Service };
