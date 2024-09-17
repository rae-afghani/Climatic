import { Component, OnInit } from '@angular/core';
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
import { MatRadioModule } from '@angular/material/radio';
import { IPVersion } from 'net';

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


export class WeatherComponent implements OnInit {
  weatherData: Weather | null = null;
  errorMessage: string | null = null;
  /*toggleForm: FormGroup; */
  metricForm: FormGroup;
  unitControl: FormControl;
  location: string = 'Frisco'; //default location
  formattedDate: string | null = null;
  formattedTime: string | null = null

  constructor(private weatherService: WeatherApiService, private formBuilder: FormBuilder) {
    this.unitControl = new FormControl(1); // 1 - Celsius  2 - Fahrenheit
    this.metricForm = this.formBuilder.group({
      unit: this.unitControl
    });
    // listen for changes in unit selection
    this.unitControl.valueChanges.subscribe(value => {
      this.onUnitChange(value);
    });
  }

  ngOnInit(): void {
    this.setDefaultLocation();
  }

  setDefaultLocation(): void {
    this.weatherService.getWeather(this.location).subscribe(
      (data) => {
        this.weatherData = data;
        console.log(this.weatherData);
        this.formatDateTime();
      }
    )
  }

  formatDateTime(): void {
    if (this.weatherData && this.weatherData.location && this.weatherData.location.localtime) {
      const localtime = this.weatherData.location.localtime; // Example: "2024-09-16 14:45"
      const [date, time] = localtime.split(' ');
  
      // Format the date to "Month Day, Year" manually
      const [year, month, day] = date.split('-');
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      this.formattedDate = `${monthNames[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
  
      // Convert the time to 12-hour format with AM/PM manually
      let [hours, minutes] = time.split(':').map(Number);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12; // Convert 24-hour to 12-hour format
      this.formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    }
  }

  onToggleChange(event: any): void {
    const isCelsius = event.checked; //checked if celsius
    this.unitControl.setValue(isCelsius ? 1:2);
  }

  onUnitChange(unitValue: number): void {
    if (unitValue === 1) {
      console.log('Celsius selected');
    } else if (unitValue === 2) {
      console.log('Fahrenheit selected');
    }
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