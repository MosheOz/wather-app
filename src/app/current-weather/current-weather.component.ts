import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { WeatherService } from '../services/weather.service';
import { ICurrentWeather } from '../types/current-weather.interface';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  currentWeather$: Observable<ICurrentWeather>;
  optionSelected$: Observable<{ id: string; name: string }>;

  constructor(
    private weatherService: WeatherService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.currentWeather$ = this.weatherService.currentWeatherTemp;
    this.optionSelected$ = this.weatherService.selectedPlace;
  }

  onAddToFavorite(
    optionSelected: { id: string; name: string },
    weather: number,
    icon: number
  ) {
    const isExists = this.weatherService.favoritesListValues.find(
      (o) => o.id === optionSelected.id
    );
    this.snackBar.open(
      isExists ? 'Already Exists' : 'Added successfully',
      'Close'
    );
    if (isExists) return;
    this.weatherService.setFavorietsList({
      id: optionSelected.id,
      name: optionSelected.name,
      weather: Math.floor(weather),
      icon,
    });
  }
}
