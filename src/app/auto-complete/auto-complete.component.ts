import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
} from 'rxjs/operators';
import { WeatherService } from '../services/weather.service';
import { IAutoCompleteRes } from '../types/auto-complete-res.interface';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss'],
})
export class AutoCompleteComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}
  searchControl = new FormControl();
  form = new FormGroup({
    searchControl: this.searchControl,
  });
  options$: Observable<IAutoCompleteRes[]>;

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // wait 300ms after the last event before emitting last event
        distinctUntilChanged(), // only emit if value is different from previous value

        startWith(''),
        map((value) => this._filter(value))
      )
      .subscribe();
    this.options$ = this.weatherService.searchOptions;
  }

  optionPicked(selection: MatAutocompleteSelectedEvent): void {
    const {
      option: { value },
    } = selection;

    const selectedObject = this.weatherService.searchOptionsValue.filter(
      (o) => o.AdministrativeArea.LocalizedName === value
    );
    const id = selectedObject[0].Key;
    this.weatherService.fiveDaysReq(id);
    this.weatherService.currentWeather(id);
    this.weatherService.setSelectedPlace({ id, name: value });
  }

  private _filter(value: string): void {
    if (!value) return;
    this.weatherService.autoComplete(value);
  }
}
