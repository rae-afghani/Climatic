import { Routes } from '@angular/router';
import { WeatherComponent } from './components/weather/weather.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    { path: '', component: WeatherComponent},
    { path: '', component: AboutComponent}
];
