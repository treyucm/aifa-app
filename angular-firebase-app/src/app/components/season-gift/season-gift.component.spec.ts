import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonGiftComponent } from './season-gift.component';

describe('SeasonGiftComponent', () => {
  let component: SeasonGiftComponent;
  let fixture: ComponentFixture<SeasonGiftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeasonGiftComponent]
    });
    fixture = TestBed.createComponent(SeasonGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
