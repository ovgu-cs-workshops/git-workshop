import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideCommitExampleComponent } from './slide-commit-example.component';

describe('SlideCommitExampleComponent', () => {
  let component: SlideCommitExampleComponent;
  let fixture: ComponentFixture<SlideCommitExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideCommitExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideCommitExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
