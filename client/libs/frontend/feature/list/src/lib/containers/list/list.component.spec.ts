import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMock } from '@bookish-list/shared/testing';
import { DialogService } from '@bookish-list/shared/ui/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ListActions } from '../../state/list.actions';
import { ListSelectors } from '../../state/list.selectors';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let store: MockStore;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideMockStore(), provideMock(DialogService)],
    }).overrideComponent(ListComponent, {
      set: {
        imports: [],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });

    store = TestBed.inject(MockStore);

    store.overrideSelector(ListSelectors.searchResults, []);
    store.overrideSelector(ListSelectors.isLoading, false);

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSearchValueChanged', () => {
    it('should dispatch lookupItems action', () => {
      // arrange
      const searchValue = 'some search value';
      const dispatchSpy = jest.spyOn(store, 'dispatch');

      // act
      component.onSearchValueChanged(searchValue);

      // assert
      expect(dispatchSpy).toHaveBeenCalledWith(
        ListActions.lookupItems({ searchValue }),
      );
    });
  });
});
