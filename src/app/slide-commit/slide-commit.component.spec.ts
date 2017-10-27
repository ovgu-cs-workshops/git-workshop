import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideCommitComponent } from './slide-commit.component';

describe('SlideCommitComponent', () => {
  let component: SlideCommitComponent;
  let fixture: ComponentFixture<SlideCommitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideCommitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideCommitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
