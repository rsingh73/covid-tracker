import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateData } from 'src/app/models/dateData';
import { DataSummary } from 'src/app/models/globalDataModel';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  loading = true;
  data: DataSummary[] = [];
  countries: string[] = [];
  totalConfirmedCases = 0;
  totalActiveCases = 0;
  totalDeaths = 0;
  totalRecoveredCases = 0;
  dataWithDate: any;
  selectedCountrydata: DateData[] = [];
  lineChart: GoogleChartInterface = {
    chartType: 'LineChart',
  };

  constructor(private service: DataServiceService) {}

  ngOnInit(): void {
    merge(
      this.service.getDateDate().pipe(
        map((res) => {
          this.dataWithDate = res;
        })
      ),
      this.service.getCovidData().pipe(
        map((result) => {
          this.data = result;
          this.data.forEach((cs: any) => {
            this.countries.push(cs.country);
          });
        })
      )
    ).subscribe({
      complete: () => {
        this.updateValues('India');
        this.loading = false;
      },
    });
  }

  updateChart() {
    let dataTable = [];
    dataTable.push(['Date', 'Cases']);
    this.selectedCountrydata.forEach((cs) => {
      dataTable.push([cs.cases, cs.date]);
    });
    this.lineChart = {
      chartType: 'LineChart',
      dataTable: dataTable,
      //firstRowIsData: true,
      options: {
        height: 500,
      },
    };
  }

  updateValues(country: string) {
    this.data.forEach((cs: any) => {
      if (cs.country === country) {
        this.totalActiveCases = cs.active;
        this.totalConfirmedCases = cs.confirmed;
        this.totalDeaths = cs.deaths;
        this.totalRecoveredCases = cs.recovered;
      }
    });

    this.selectedCountrydata = this.dataWithDate[country];
    // console.log(this.selectedCountrydata);
    this.updateChart();
  }
}
