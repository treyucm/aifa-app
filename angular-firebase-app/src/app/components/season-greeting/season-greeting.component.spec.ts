import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonGreetingComponent } from './season-greeting.component';

describe('SeasonGreetingComponent', () => {
  let component: SeasonGreetingComponent;
  let fixture: ComponentFixture<SeasonGreetingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeasonGreetingComponent]
    });
    fixture = TestBed.createComponent(SeasonGreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
