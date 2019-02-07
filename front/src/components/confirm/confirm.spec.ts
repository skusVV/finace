import { TestBed, async, ComponentFixture} from '@angular/core/testing';
import { ConfirmComponent } from './confirm.component';
import { By } from '@angular/platform-browser';

const MOCK_TITLE = 'mocked title';

describe('ConfirmComponent', () => {
  let fixture: ComponentFixture<ConfirmComponent>;
  let component: ConfirmComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      declarations: [
        ConfirmComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance;
    component.title = MOCK_TITLE;
    fixture.detectChanges();
  }));

  describe('Initial state', () => {
    it('Component exist', () => {
      expect(component).toBeTruthy();
    });

    it('Component to have title', () => {
      expect(component.title).toBeTruthy();
    });

    it('Title have passed text', () => {
      expect(component.title).toBe(MOCK_TITLE);
    });

    it('Title presented in template with correct text', () => {
      expect(fixture.nativeElement.querySelector('.confirm_title').innerText).toBe(MOCK_TITLE);
    });

    it('Cancel button exist with correct text', () => {
      expect(fixture.nativeElement.querySelector('.confirm_button-ok').innerText).toBe(component.positiveButtonText);
    });

    it('Ok button exist with correct text', () => {
      expect(fixture.nativeElement.querySelector('.confirm_button-cancel').innerText).toBe(component.negativeButtonText);
    });
  });

  describe('Actions', () => {
    it('Click to positive button call correct event handler', () => {
      const spy = spyOn(component, 'handlePositiveButton').and.callThrough();

      fixture.debugElement.query(By.css('.confirm_button-ok')).triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });

    it('Click to negative button call correct event handler', () => {
      const spy = spyOn(component, 'handleNegativeButton').and.callThrough();

      fixture.debugElement.query(By.css('.confirm_button-cancel')).triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });

    it('HandlePositiveButton emit with correct value', () => {
      let confirmed = null;

      component.confirmed.subscribe(isConfirmed => {
        confirmed = isConfirmed
      });
      fixture.debugElement.query(By.css('.confirm_button-ok')).triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(confirmed).toBe(true);
    });

    it('HandleNegativeButton emit with correct value', () => {
      let confirmed = null;

      component.confirmed.subscribe(isConfirmed => {
        confirmed = isConfirmed
      });
      fixture.debugElement.query(By.css('.confirm_button-cancel')).triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(confirmed).toBe(false);
    });
  });
});
