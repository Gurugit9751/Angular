import { async, TestBed, inject } from '@angular/core/testing';

import { MockBackend } from '@angular/http/testing';

import {  HttpClient, HttpClientModule, HttpBackend  } from '@angular/common/http';

import { SearchService } from './search.service';

describe('SearchService', () => {

  let service: SearchService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService],
      imports: [HttpClientModule]
    });
    TestBed.compileComponents();
    // inject service at start of each test
    service = TestBed.get(SearchService);
   });

  it('should be created', () => {
    console.log('serice test1', service);
    expect(service).toBeTruthy();
  });

  it('should run a test that gives the response', (done) => {
    const searchParams = {
      destinationCity: 'kol', originCity: 'mum',
      orgincode: 'kol',
      descode: 'mum',
      departureDate: '2020-01-30', returnDate: '2020-01-30', oneway: true, passengers: 1,
      refine: 10000
    };
    service.searchFlightAvailability(searchParams).subscribe(
      (result) => {
        console.log('serice test2', result);
        expect(result).toBeDefined();
        expect(typeof result).toEqual('object');
        done();
      });
  });

});
