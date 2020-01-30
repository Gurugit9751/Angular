import { Component, OnInit, Input } from '@angular/core';
import { BookingInformation } from '../../models/booking-info';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.css']
})
export class InfoBoxComponent implements OnInit {

  @Input() queriedData: BookingInformation;
  @Input() onewayStatus;
  constructor() { }

  ngOnInit() {}
}
