import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseSchemeComponent } from './response-scheme.component';

describe('ResponseSchemeComponent', () => {
  let component: ResponseSchemeComponent;
  let fixture: ComponentFixture<ResponseSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
