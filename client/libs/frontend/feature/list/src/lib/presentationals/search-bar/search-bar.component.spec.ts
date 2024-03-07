import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { LookupItem } from '../../models/list.models';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, MatIconTestingModule],
      providers: [provideAnimations(), provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('isLoading', false);
    fixture.componentRef.setInput('searchResult', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onOptionSelected', () => {
    it('should emit optionSelected', () => {
      // arrange
      const lookupItem = {
        isbn: '123',
      } as LookupItem;
      const event = {
        option: {
          value: lookupItem,
        },
      } as MatAutocompleteSelectedEvent;
      const emitSpy = jest.spyOn(component.optionSelected, 'emit');

      // act
      component.onOptionSelected(event);

      // assert
      expect(emitSpy).toHaveBeenCalledWith(lookupItem);
    });
  });
});
