import { Provider } from '@angular/core';

export function autoMock<T>(obj: new (...args: any[]) => T): T {
  const res = {} as T;

  const keys = Object.getOwnPropertyNames(obj.prototype);

  const allMethods = keys.filter((key) => {
    try {
      return typeof obj.prototype[key] === 'function';
    } catch (_) {
      return false;
    }
  });

  const allProperties = keys.filter((key) => !allMethods.includes(key));

  allMethods.forEach((method: string) => {
    Object.defineProperty(res, method, {
      value: jest.fn(),
    });
  });

  allProperties.forEach((property) => {
    Object.defineProperty(res, property, {
      get: function () {
        return '';
      },
      configurable: true,
    });
  });

  return res;
}

export function provideAbstractMock<T, M extends T>(
  type: abstract new (...args: any[]) => T,
  mockType: new (...args: any[]) => M,
): Provider {
  const mock = autoMock(mockType);

  return { provide: type, useValue: mock };
}

export function provideMock<T>(type: new (...args: any[]) => T): Provider {
  return { provide: type, useValue: autoMock(type) };
}
