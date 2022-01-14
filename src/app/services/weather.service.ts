import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAutoCompleteRes } from '../types/auto-complete-res.interface';
import { ICurrentWeather } from '../types/current-weather.interface';
import { IFiveDaysRes } from '../types/five-days-res.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  autoCompleteUrl =
    'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';

  fiveDaysUrl = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day';
  currentWeatherUrl = `http://dataservice.accuweather.com/currentconditions/v1`;

  apiKey = '3A9dKdvoIGh2jTtN1ThwAvpGaICA22x9';
  private searchOptions$ = new BehaviorSubject<IAutoCompleteRes[]>(null);

  private fiveDaysRes$ = new BehaviorSubject<IFiveDaysRes>(null);
  private currentWeather$ = new BehaviorSubject<ICurrentWeather>(null);
  private selectedPlace$ = new BehaviorSubject<{ id: string; name: string }>(
    null
  );
  private favoritesList$ = new BehaviorSubject<
    {
      id: string;
      name: string;
      weather: number;
      icon: number;
    }[]
  >([]);
  constructor(private http: HttpClient) {}

  get searchOptions(): Observable<IAutoCompleteRes[]> {
    return this.searchOptions$.asObservable();
  }

  get searchOptionsValue(): IAutoCompleteRes[] {
    return this.searchOptions$.value;
  }

  get fiveDaysData(): Observable<IFiveDaysRes> {
    return this.fiveDaysRes$.asObservable();
  }

  get currentWeatherTemp(): Observable<ICurrentWeather> {
    return this.currentWeather$.asObservable();
  }

  get selectedPlace(): Observable<{ id: string; name: string }> {
    return this.selectedPlace$.asObservable();
  }

  get favoritesList(): Observable<
    {
      id: string;
      name: string;
      weather: number;
    }[]
  > {
    return this.favoritesList$.asObservable();
  }
  get favoritesListValues() {
    return this.favoritesList$.value;
  }

  setSelectedPlace(value: { id: string; name: string }) {
    this.selectedPlace$.next(value);
  }
  setFavorietsList(value: {
    id: string;
    name: string;
    weather: number;
    icon: number;
  }) {
    const newArr = [...this.favoritesListValues, value];
    this.favoritesList$.next(newArr);
  }

  async autoComplete(location: string): Promise<void> {
    try {
      const res = await this.http
        .get<IAutoCompleteRes[]>(
          `${this.autoCompleteUrl}?apikey=${this.apiKey}&q=${location}`
        )
        .toPromise();

      this.searchOptions$.next(res);
    } catch (err) {
      alert(err.error.message);
    }
  }

  async fiveDaysReq(id: string): Promise<void> {
    try {
      const res = await this.http
        .get<IFiveDaysRes>(
          `${this.fiveDaysUrl}/${id}?apikey=${this.apiKey}&details=false&metric=true`
        )
        .toPromise();
      this.fiveDaysRes$.next(res);
    } catch (err) {
      alert(err.error.message);
    }
  }

  async currentWeather(id: string) {
    try {
      const res = await this.http
        .get<ICurrentWeather>(
          `${this.currentWeatherUrl}/${id}?apikey=${this.apiKey}&details=false`
        )
        .toPromise();

      this.currentWeather$.next(res);
    } catch (err) {
      alert(err.error.message);
    }
  }
}
