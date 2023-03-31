import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuteComponent } from './rute.component';

describe('RuteComponent', () => {
  let component: RuteComponent;
  let fixture: ComponentFixture<RuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
