import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideTtyComponent } from './slide-tty.component';

describe('SlideTtyComponent', () => {
  let component: SlideTtyComponent;
  let fixture: ComponentFixture<SlideTtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideTtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideTtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
