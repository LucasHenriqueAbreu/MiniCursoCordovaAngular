import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodebarComponent } from './codebar.component';

describe('CodebarComponent', () => {
  let component: CodebarComponent;
  let fixture: ComponentFixture<CodebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
