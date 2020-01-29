import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Base Application component
import { AppComponent } from './app.component';

// Other components
import { SearchBoxComponent } from '../components/search-box/search-box.component';
import { InfoBoxComponent } from '../components/info-box/info-box.component';
import { FlightDetailsCardComponent } from '../components/flight-details-card/flight-details-card.component';

// services
import { SearchService } from '../services/search.service';

// We have to write seperate functions for this Ng module properties
export function providers() {
  return [SearchService];
}

export function imports() {
  return [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ];
}

export function declarations() {
  return [
    AppComponent,
    SearchBoxComponent,
    InfoBoxComponent,
    FlightDetailsCardComponent
  ];
}

@NgModule({
  declarations: declarations(),
  imports: imports(),
  providers: providers(),
  bootstrap: [AppComponent]
})
export class AppModule { }
