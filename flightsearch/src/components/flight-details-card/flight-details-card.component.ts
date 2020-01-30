import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { SearchResponse } from '../../models/search-response';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'flight-details-card',
  templateUrl: './flight-details-card.component.html',
  styleUrls: ['./flight-details-card.component.css']
})
export class FlightDetailsCardComponent implements OnInit, OnChanges {

  @Input() searchResults: SearchResponse;
  @Output() fly = new EventEmitter<boolean>();

  // page variables
  bookingIcons: string;
  constructor() {
    this.bookingIcons = `./assets/img/aero.jpg`;
  }

  ngOnInit() { }

  ngOnChanges() {
    console.log('OnChangesData', this.searchResults);
  }
}
