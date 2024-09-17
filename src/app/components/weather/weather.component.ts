import { Component } from '@angular/core';
import { WeatherApiService } from '../../services/weather-api.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SearchbarComponent } from '../../ui/searchbar/searchbar.component';
import { Weather } from '../../models/weather.model';
import { MatIcon } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    SearchbarComponent,
    MatTabsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatIconButton,
    MatIcon,
    MatRadioModule
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {
  weatherData: Weather | null = null;
  errorMessage: string | null = null;
  toggleForm: FormGroup;
  unitControl: FormControl;
  location: string = 'Aveiro';

  constructor(private weatherService: WeatherApiService, private formBuilder: FormBuilder) {
    this.unitControl = new FormControl(1); // 1 - Celsius  2 - Fahrenheit
    this.toggleForm = this.formBuilder.group({
      unit: this.unitControl
    });
  }

  handleSearch(searchText: string) {
    this.location = searchText;
    this.errorMessage = null;
    this.weatherService.getWeather(this.location).subscribe(
      (data) => {
        this.weatherData = data;
        console.log(this.weatherData);
      },
      (error) => {
        this.weatherData = null;
        this.errorMessage = 'Please check your location name and try again.';
      }
    );
  }

  getTemperature(tempC: number, tempF: number): number {
    return this.unitControl.value === 1 ? tempC : tempF;
  }
}