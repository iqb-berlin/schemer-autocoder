import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarSchemeComponent } from './var-scheme.component';

describe('VarSchemeComponent', () => {
  let component: VarSchemeComponent;
  let fixture: ComponentFixture<VarSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VarSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
