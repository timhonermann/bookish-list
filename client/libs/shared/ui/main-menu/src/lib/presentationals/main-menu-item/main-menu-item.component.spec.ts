import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MainMenuItemComponent } from './main-menu-item.component';

describe('MainMenuItemComponent', () => {
  let component: MainMenuItemComponent;
  let fixture: ComponentFixture<MainMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainMenuItemComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MainMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
