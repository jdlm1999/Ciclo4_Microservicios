import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardShopingComponent } from './card-shoping.component';

describe('CardShopingComponent', () => {
  let component: CardShopingComponent;
  let fixture: ComponentFixture<CardShopingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardShopingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardShopingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
