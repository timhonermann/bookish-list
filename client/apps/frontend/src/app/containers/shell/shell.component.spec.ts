import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthActions } from '@bookish-list/frontend/shared/auth';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ShellComponent } from './shell.component';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShellComponent, RouterTestingModule, MatIconTestingModule],
      providers: [provideMockStore()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('utilityMenuItems', () => {
    it('should dispatch logout action on logout invoke', () => {
      // arrange
      const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
      const logoutMenuItem = component.utilityMenuItems.find(
        (i) => i.icon === 'logout'
      );

      // act
      logoutMenuItem?.action?.();

      // assert
      expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.logout());
    });
  });
});
