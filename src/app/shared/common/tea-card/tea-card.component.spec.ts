import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaCardComponent } from './tea-card.component';

describe('TeaCardComponent', () => {
  let component: TeaCardComponent;
  let fixture: ComponentFixture<TeaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeaCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
