import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideInitComponent } from './slide-init.component';

describe('SlideInitComponent', () => {
  let component: SlideInitComponent;
  let fixture: ComponentFixture<SlideInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
