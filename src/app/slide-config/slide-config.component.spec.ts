import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideConfigComponent } from './slide-config.component';

describe('SlideConfigComponent', () => {
  let component: SlideConfigComponent;
  let fixture: ComponentFixture<SlideConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
