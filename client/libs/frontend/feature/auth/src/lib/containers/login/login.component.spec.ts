import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthActions } from '@bookish-list/frontend/shared/auth';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    it('should dispatch login action', () => {
      // arrange
      const dispatchSpy = jest.spyOn(mockStore, 'dispatch');

      // act
      component.login();

      // assert
      expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.login());
    });
  });
});
