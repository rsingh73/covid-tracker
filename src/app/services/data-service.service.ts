import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { DateData } from '../models/dateData';
import { DataSummary } from '../models/globalDataModel';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private url =
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/09-30-2021.csv';
  private urlDate =
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
  constructor(private http: HttpClient) {}

  getDateDate() {
    return this.http.get(this.urlDate, { responseType: 'text' }).pipe(
      map((result) => {
        let rows = result.split('\n');
        let actualData = {};
        let header = rows[0];
        let dates = header.split(/,(?=\S)/);
        dates.splice(0, 4);
        rows.splice(0, 1);

        rows.forEach((row) => {
          let cols = row.split(/,(?=\S)/);
          let con = cols[1];
          cols.splice(0, 4);
          actualData[con] = [];
          cols.forEach((value, index) => {
            let dw: DateData = {
              cases: +value,
              country: con,
              date: new Date(Date.parse(dates[index])),
            };
            actualData[con].push(dw);
          });
        });
        // console.log(actualData)
        return actualData;
      })
    );
  }

  getCovidData() {
    return this.http.get(this.url, { responseType: 'text' }).pipe(
      map((response) => {
        let data: DataSummary[] = [];
        let raw: any = {};
        let rows = response.split('\n');
        rows.splice(0, 1);
        // console.log(rows)
        rows.forEach((row) => {
          let cols = row.split(/,(?=\S)/);

          let cs: any = {
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10],
          };
          let temp: DataSummary = raw[cs.country];
          if (temp) {
            temp.active = cs.active + temp.active;
            temp.confirmed = cs.confirmed + temp.confirmed;
            temp.deaths = cs.deaths + temp.deaths;
            temp.recovered = cs.recovered + temp.recovered;

            raw[cs.country] = temp;
          } else {
            raw[cs.country] = cs;
          }
        });
        // console.log(raw);
        return <DataSummary[]>Object.values(raw);
        // return Object.values(raw);
      })
    );
  }
}
