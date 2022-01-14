import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavorietsListComponent } from './favoriets-list.component';

describe('FavorietsListComponent', () => {
  let component: FavorietsListComponent;
  let fixture: ComponentFixture<FavorietsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavorietsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavorietsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
