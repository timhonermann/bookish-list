import { HttpRequest } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { APP_CONFIG } from '../models/config.models';
import { serverUrlInterceptor } from './server-url.interceptor';

describe('ServerUrlInterceptor', () => {
  const serverUrl = 'https://testing-url.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: APP_CONFIG,
          useValue: { serverUrl },
        },
      ],
    });
  });

  it(`should do nothing if the request starts with 'assets'`, waitForAsync(() => {
    // arrange
    const url = 'assets/some-thing';
    const req = {
      url,
    } as HttpRequest<unknown>;
    const next = jest.fn().mockImplementation((val) => of(val));

    // act
    const result$ = TestBed.runInInjectionContext(() =>
      serverUrlInterceptor()(req, next),
    );

    // assert
    result$.subscribe(() => {
      expect(next).toHaveBeenCalledWith(req);
    });
  }));

  it(`should do nothing if the request starts with 'http' already`, waitForAsync(() => {
    // arrange
    const url = 'http://some-thing';
    const req = {
      url,
    } as HttpRequest<unknown>;
    const next = jest.fn().mockImplementation((val) => of(val));

    // act
    const result$ = TestBed.runInInjectionContext(() =>
      serverUrlInterceptor()(req, next),
    );

    // assert
    result$.subscribe(() => {
      expect(next).toHaveBeenCalledWith(req);
    });
  }));

  it(`should do nothing if the request starts with 'https' already`, waitForAsync(() => {
    // arrange
    const url = 'https://some-thing';
    const req = {
      url,
    } as HttpRequest<unknown>;
    const next = jest.fn().mockImplementation((val) => of(val));

    // act
    const result$ = TestBed.runInInjectionContext(() =>
      serverUrlInterceptor()(req, next),
    );

    // assert
    result$.subscribe(() => {
      expect(next).toHaveBeenCalledWith(req);
    });
  }));

  it(`should add the server url if url does not start with assets or http`, waitForAsync(() => {
    // arrange
    const url = '/some-url';
    const fullUrl = `${serverUrl}${url}`;
    const req = {
      url,
      clone: (val: HttpRequest<unknown>) => val,
    } as HttpRequest<unknown>;
    const next = jest.fn().mockImplementation((val) => of(val));

    // act
    const result$ = TestBed.runInInjectionContext(() =>
      serverUrlInterceptor()(req, next),
    );

    // act
    result$.subscribe(() => {
      expect(next).toHaveBeenCalledWith({ url: fullUrl });
    });
  }));
});
