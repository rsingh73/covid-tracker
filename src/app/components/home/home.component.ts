import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private service: DataServiceService) { }

  ngOnInit(): void {
    this.service.getCovidData().subscribe(response => {
      console.log(response);

    })
  }

}
