import { Component, OnInit } from '@angular/core';
import { DataSummary } from 'src/app/models/globalDataModel';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  data: DataSummary[] = [];
  countries: string[] = [];
  totalConfirmedCases = 0;
  totalActiveCases = 0;
  totalDeaths = 0;
  totalRecoveredCases = 0;

  constructor(private service: DataServiceService) { }

  ngOnInit(): void {
    this.service.getCovidData().subscribe(res => {
      this.data = res;
      this.data.forEach((cs: any) => {
        this.countries.push(cs.country)
      })
    })
  }

  updateValues(country: string) {
    console.log(country);
    this.data.forEach((cs: any)=> {
      if (cs.country === country) {
        this.totalActiveCases = cs.active;
        this.totalConfirmedCases = cs.confirmed;
        this.totalDeaths = cs.deaths;
        this.totalRecoveredCases = cs.recovered;
      }
    })
  }

}
