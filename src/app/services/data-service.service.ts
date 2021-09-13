import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/09-12-2021.csv';
  constructor(private http: HttpClient) { }

  getCovidData() {
    return this.http.get(this.url, {responseType: 'text'}).pipe(
      map(response => {
        // console.log(response)
        return response
      })
    )
  }
}
