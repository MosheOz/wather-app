import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-favoriets-list',
  templateUrl: './favoriets-list.component.html',
  styleUrls: ['./favoriets-list.component.scss'],
})
export class FavorietsListComponent implements OnInit {
  favoritesList$: Observable<any>;
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.favoritesList$ = this.weatherService.favoritesList;
  }

  onFavoriteClicked(f: { id: string; name: string; weather: number }) {
    this.weatherService.fiveDaysReq(f.id);
    this.weatherService.currentWeather(f.id);
    this.weatherService.setSelectedPlace({ id: f.id, name: f.name });
  }
}
