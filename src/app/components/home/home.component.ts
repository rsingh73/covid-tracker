import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { DataSummary } from 'src/app/models/globalDataModel';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalConfirmedCases = 0;
  totalActiveCases = 0;
  totalDeaths = 0;
  totalRecoveredCases = 0;
  globalData: any;
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
  }
  columnChart: GoogleChartInterface = {
    chartType: 'columnChart',
  }

  constructor(private service: DataServiceService) { }

  ngOnInit(): void {
    this.service.getCovidData().subscribe(response => {
      // console.log(response);
      this.globalData = response;
      console.log(this.globalData)
      response.forEach((cs: any) => {
        if (!Number.isNaN(cs.confirmed)) {
          this.totalActiveCases+= cs.active;
        this.totalConfirmedCases+= cs.confirmed;
        this.totalDeaths+= cs.deaths;
        this.totalRecoveredCases+= cs.recovered;
        }

      })
      this.initChart();
    })
  }

  initChart() {

    let dataTable = [];
    dataTable.push(["Country", "Cases"])
    this.globalData.forEach((cs: any) => {
      dataTable.push([cs.country, cs.confirmed])
    })
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: dataTable,
      options: {
        height: 500,
        'Country': 'Cases'
      },
    }
  }
}
