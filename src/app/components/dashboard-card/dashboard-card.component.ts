import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  @Input('confirmedCases') confirmedCases = 0;
  @Input('deaths') deaths = 0;
  @Input('activeCases') activeCases = 0;
  @Input('recoveredCases') recoveredCases = 0;


  constructor() { }

  ngOnInit(): void {
  }

}
