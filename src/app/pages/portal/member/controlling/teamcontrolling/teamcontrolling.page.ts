import { Component, OnInit } from '@angular/core';
import {ConnApiService} from "../../../../../services/conn-api/conn-api.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-teamcontrolling',
  templateUrl: './teamcontrolling.page.html',
  styleUrls: ['./teamcontrolling.page.scss'],
})
export class TeamcontrollingPage implements OnInit {

  // urls
  private urlControllingTeam = 'team/controlling/team';


  // variables
  private lTime = [{key: 'total', name: 'Gesamt'}, {key: 'year', name: 'Jahr'}, {key: 'month', name: 'Monat'}, {key: 'weeknumber', name: 'Kalenderwoche'}];
  private oTime = this.lTime[2];

  private lChoiceYear = [{key: 'this', name: 'Dieses Jahr'}, {key: 'last', name: 'Letztes Jahr'}];
  private lChoiceMonth = [{key: 'this', name: 'Dieser Monat'}, {key: 'last', name: 'Letzter Monat'}];
  private lChoiceWeeknumber = [{key: 'this', name: 'Diese Kalenderwoche'}, {key: 'last', name: 'Letzte Kalenderwoche'}];
  private lChoice = this.lChoiceMonth
  private oChoice = this.lChoice[0];

  private lGroupTotal = [{key: 'year', name: 'Jahr'}, {key: 'month', name: 'Monat'}, {key: 'none', name: 'Keine Auswahl'}];
  private lGroupYear = [{key: 'month', name: 'Monat'}, {key: 'weeknumber', name: 'Kalenderwoche'}, {key: 'none', name: 'Keine Auswahl'}];
  private lGroupMonth = [{key: 'weeknumber', name: 'Kalenderwoche'}, {key: 'none', name: 'Keine Auswahl'}];
  private lGroup = this.lGroupMonth;

  private oGroup = null;

  constructor(private connApi: ConnApiService) { }

  ngOnInit() {
    console.log(this.lTime);
  }

  onLoad() {
    let json = {
      kTime: this.oTime.key,
      kChoice: this.oChoice.key,
      kGroup: this.oGroup.key
    }

    this.connApi.safePost(this.urlControllingTeam, json).subscribe((response: HttpResponse<any>) => {
      console.log(response.body);
    })

  }

  onFilterChange() {
    switch (this.oTime.key) {
      case 'year':
        this.lChoice = this.lChoiceYear;
        this.oChoice = this.lChoiceYear[0];
        break;
      case 'month':
        this.lChoice = this.lChoiceMonth;
        this.oChoice = this.lChoiceMonth[0];
        break;
      case 'weeknumber':
        this.lChoice = this.lChoiceWeeknumber;
        this.oChoice = this.lChoiceWeeknumber[0];
        break;
    }
  }
}
