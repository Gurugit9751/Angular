import { Component, OnInit, EventEmitter, Output, ElementRef } from '@angular/core';
import { BookingInformation } from '../../models/booking-info';
import { SearchResponse } from '../../models/search-response';
import { Flights } from '../../models/flights';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { Subject, Observable, forkJoin } from 'rxjs';
import 'rxjs/add/operator/take';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  @Output() onSearchResults = new EventEmitter<SearchResponse>();
  @Output() loadingComponent = new EventEmitter<boolean>();

  // // page variables
  // private search$ = new Subject<BookingInformation>();
  // private flights$: Observable<Flights[]>;

  searchForm: FormGroup;

  refineSearch = new FormControl();
  isFormValid = false;
  filteredOriginCities: string[] = [];
  filteredDestinationCities: string[] = [];
  totalCitiesListedOnServer: string[] = [];
  search: BookingInformation;
  submitted = false;

  constructor(private find: SearchService, private elementRef: ElementRef, private fb: FormBuilder) {

    this.search = {
      departureDate: '',
      returnDate: '',
      destinationCity: '',
      originCity: '',
      orgincode: '',
      descode: '',
      oneway: true,
      passengers: 0,
      refine: 500
    };
  }

  ngOnInit() {
    // Get all the cities available on initialization of component.
    this.searchForm = this.fb.group(
      {
        originCity: ['', Validators.required],
        destinationCity: ['', Validators.required],
        departureDate: ['', Validators.required],
        returnDate: [''],
        passengers: [1, Validators.required],
        refine: [500]
      }
    );
  }

  // getter for form controls
  get f() { return this.searchForm.controls; }

  /**
    * Check validation of form and proceed for search
    * @param formInputs
    */
  public onSubmit(): void {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    } else {
      this.searchClickHandler(this.searchForm.value);
    }
  }


  /**
   *
   * Updates the booking type i.e one way/ two way flight.
   * @param oneway
   */
  public updateBookingType(oneway: boolean): void {
    this.search.oneway = oneway;
    this.searchClickHandler(this.searchForm.value);
  }


  /**
   * Search for flights based on parameters provided.
   * The magic happens here :)
   * @param searchParams
   */
  public searchClickHandler(searchParams: BookingInformation): void {
    console.log('Search click handler params', searchParams);
    this.loadingComponent.emit(true);
    if (!searchParams.returnDate || this.search.oneway === true) {
      console.warn('no return');
      this.performSearch(searchParams).subscribe((flights: Flights[]) => {
        const searhResults: SearchResponse = {
          oneWayFlights: flights,
          oneway: true,
          returningFlights: [],
          bookingInfo: searchParams
        };
        this.onSearchResults.emit(searhResults);
        this.loadingComponent.emit(false);
      });
    } else {
      // first check for one way then for the other
      const returnSearchParams: BookingInformation = {
        originCity: searchParams.destinationCity,
        destinationCity: searchParams.originCity,
        departureDate: searchParams.returnDate,
        returnDate: searchParams.returnDate,
        orgincode: searchParams.orgincode,
        descode: searchParams.descode,
        refine: searchParams.refine,
        passengers: searchParams.passengers,
        oneway: false
      };

      const onwardJourney = this.performSearch(searchParams);
      const returnJourney = this.performSearch(returnSearchParams);

      forkJoin([onwardJourney, returnJourney]).subscribe(res => {
        const searchResults: SearchResponse = {
          oneWayFlights: res[0],
          oneway: false,
          returningFlights: res[1],
          bookingInfo: searchParams
        };
        this.onSearchResults.emit(searchResults);
        this.loadingComponent.emit(false);
      });
    }
  }

  /**
   * Perform the search from service based on params
   * @param searchParams
   */
  private performSearch(searchParams: BookingInformation) {
    return this.find.searchFlightAvailability(searchParams);
  }

  /**
   * On change of slider event
   * autmatically detect flights in range
   * @param e
   */
  public sliderChangeEvent(e) {
    console.log('Slider changed');
    this.searchClickHandler(this.searchForm.value);
  }
}
