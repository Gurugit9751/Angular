import { Component } from '@angular/core';
import { BookingInformation } from '../models/booking-info';
import { SearchResponse } from '../models/search-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Flight Search Engine';
  bookingInfo: BookingInformation;
  searchResults: SearchResponse;
  loading = false;
  fly = false;

  constructor() {
    this.bookingInfo = {
      originCity: '',
      destinationCity: '',
      departureDate: '',
      orgincode: '',
      descode: '',
      returnDate: '',
      passengers: 1,
      oneway: true,
      refine: 500
    };
    this.searchResults = {
      oneWayFlights: [],
      returningFlights: [],
      oneway: true,
      bookingInfo: this.bookingInfo
    };
  }

  /**
   * Listener for EventEmitter on child pages.
   * @param searchResults
   */
  public updateInputParams(searchResults: SearchResponse) {
    console.log('Ok got that emitted value mate', searchResults);
    this.bookingInfo = searchResults.bookingInfo;
    this.searchResults = searchResults;
  }

  public swapLoading(loading: boolean) {
    console.log('Swapping', loading)
    this.loading = loading;
  }
}
