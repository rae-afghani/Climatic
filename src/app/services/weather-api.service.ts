import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private apiKey = '0aea6d983ec3411f9f2231237241609';
  private apiUrl = 'http://api.weatherapi.com/v1';

  constructor(private http: HttpClient) {}
  
  // getWeather(location: string): Observable<Weather> {
  //   return this.http.get<any>(`${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${location}&days=7&aqi=no`);
  // }

  getWeather(location: string, days: number = 7): Observable<any> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('q', location)
      .set('days', days.toString());

      console.log(`${this.apiUrl}/forecast.json`, { params });
    return this.http.get(`${this.apiUrl}/forecast.json`, { params });
  }
}