import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { DataSummary } from 'src/app/models/globalDataModel';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading = true;
  totalConfirmedCases = 0;
  totalActiveCases = 0;
  totalDeaths = 0;
  totalRecoveredCases = 0;
  globalData: any;
  value: any;
  radioButtons = [
    {
      value: 'c',
      id: 'c',
      label: 'Confirmed',
    },
    {
      value: 'd',
      id: 'd',
      label: 'Deaths',
    },
    {
      value: 'r',
      id: 'r',
      label: 'Recovered',
    },
    {
      value: 'a',
      id: 'a',
      label: 'Active',
    },
  ];
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
  };
  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
  };

  constructor(private service: DataServiceService) {}

  ngOnInit(): void {
    this.service.getCovidData().subscribe({
      next: (response) => {
        this.globalData = response;
        response.forEach((cs: any) => {
          if (!Number.isNaN(cs.confirmed)) {
            this.totalActiveCases += cs.active;
            this.totalConfirmedCases += cs.confirmed;
            this.totalDeaths += cs.deaths;
            this.totalRecoveredCases += cs.recovered;
          }
        });
        this.initChart('c');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  initChart(caseType: string) {
    let dataTable = [];
    dataTable.push(['Country', 'Cases']);
    this.globalData.forEach((cs: any) => {

      if (caseType == 'c') {
        if (cs.confirmed > 2000) {
          this.value = cs.confirmed;
        }
      }
      if (caseType == 'a') {
        if (cs.active > 2000) {
          this.value = cs.active;
        }
      }
      if (caseType == 'd') {
        if (cs.deaths > 2000) {
          this.value = cs.deaths;
        }
      }
      if (caseType == 'r') {
        if (cs.recovered > 2000) {
          this.value = cs.recovered

        }
      }
      dataTable.push([cs.country, this.value]);
    });
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: dataTable,
      options: {
        height: 500,
      },
    };

    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: dataTable,
      options: {
        height: 500,
      },
    };
  }

  updateChart(value: string) {
    this.initChart(value)
  }
}
