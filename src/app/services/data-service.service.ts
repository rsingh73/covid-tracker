import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators'
import { DataSummary } from '../models/globalDataModel';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/09-19-2021.csv';
  constructor(private http: HttpClient) { }

  getCovidData() {
    return this.http.get(this.url, {responseType: 'text'}).pipe(
      map(response => {
        let data: DataSummary[] = [];
        let raw: any = {};
        let rows = response.split("\n");
        rows.splice(0, 1);
        // console.log(rows)
        rows.forEach(row => {
          let cols = row.split(/,(?=\S)/)

          let cs: any = {
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10]
          }
          let temp: DataSummary = raw[cs.country]
          if (temp) {
            temp.active = cs.active + temp.active
            temp.confirmed = cs.confirmed + temp.confirmed
            temp.deaths = cs.deaths + temp.deaths
            temp.recovered = cs.recovered + temp.recovered

            raw[cs.country] = temp;
          } else {
            raw[cs.country] = cs
          }


        })
        // console.log(raw);
        return <DataSummary[]>Object.values(raw);
        // return Object.values(raw);
      })
    )
  }
}
