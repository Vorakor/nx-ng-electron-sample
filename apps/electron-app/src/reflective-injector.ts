/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';

export class ReflectiveInjector {
  private static _records: { token: any; dependencies: any; value?: any }[] =
    [];

  static resolveAndCreate(inTokens: any[]): ReflectiveInjector {
    inTokens.forEach((lToken: any) => {
      ReflectiveInjector._records.push({
        token: lToken,
        dependencies: lToken.ctorParameters
          ? lToken.ctorParameters().map((t: any) => t.type)
          : Reflect.getOwnMetadata('design:paramtypes', lToken),
      });
    });

    return this;
  }

  static resolveWith(inToken: any, inValue: any): ReflectiveInjector {
    ReflectiveInjector._records.push({
      token: inToken,
      dependencies: inToken.ctorParameters
        ? inToken.ctorParameters().map((t: any) => t.type)
        : Reflect.getOwnMetadata('design:paramtypes', inToken),
      value: inValue,
    });

    return this;
  }

  static get<T>(inToken: new (...args: any[]) => T): T {
    const lRecord = ReflectiveInjector._records.find((lRecord) => {
      return lRecord.token == inToken;
    });

    if (!lRecord) {
      throw new Error(
        `ReflectiveInjector Failed To Find Inject Token '${typeof inToken}'`
      );
    }

    if (!lRecord.value) {
      const lDependencies = (lRecord.dependencies || []).map(
        (lDependency: any) => ReflectiveInjector.get(lDependency)
      );

      lRecord.value = new lRecord.token(...lDependencies);
    }

    return lRecord.value;
  }
}
