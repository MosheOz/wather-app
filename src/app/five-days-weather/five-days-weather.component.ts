import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from '../services/weather.service';
import { IFiveDaysRes } from '../types/five-days-res.interface';

@Component({
  selector: 'app-five-days-weather',
  templateUrl: './five-days-weather.component.html',
  styleUrls: ['./five-days-weather.component.scss'],
})
export class FiveDaysWeatherComponent implements OnInit {
  fiveDaysDisplay$: Observable<IFiveDaysRes>;
  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fiveDaysDisplay$ = this.weatherService.fiveDaysData;
  }
}
