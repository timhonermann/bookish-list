import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ListSelectors } from '../../state/list.selectors';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let store: MockStore;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    }).overrideComponent(ListComponent, {
      set: {
        imports: [],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });

    store = TestBed.inject(MockStore);

    store.overrideSelector(ListSelectors.searchResults, []);

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
