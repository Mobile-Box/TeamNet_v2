import {Component, OnInit} from '@angular/core';
import {ConnApiService} from "../../../../../services/conn-api/conn-api.service";
import {HttpResponse} from "@angular/common/http";
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-teamcontrolling',
  templateUrl: './teamcontrolling.page.html',
  styleUrls: ['./teamcontrolling.page.scss'],
})
export class TeamcontrollingPage implements OnInit {

  // urls
  private urlControllingTeam = 'team/controlling/team';


  // variables
  private lTime = [{key: 'total', name: 'Gesamt'}, {key: 'year', name: 'Jahr'}, {
    key: 'month',
    name: 'Monat'
  }, {key: 'weeknumber', name: 'Kalenderwoche'}];
  private oTime = this.lTime[2];

  private lChoiceYear = [{key: 'this', name: 'Dieses Jahr'}, {key: 'last', name: 'Letztes Jahr'}];
  private lChoiceMonth = [{key: 'this', name: 'Dieser Monat'}, {key: 'last', name: 'Letzter Monat'}];
  private lChoiceWeeknumber = [{key: 'this', name: 'Diese Kalenderwoche'}, {key: 'last', name: 'Letzte Kalenderwoche'}];
  private lChoice = this.lChoiceMonth
  private oChoice = this.lChoice[0];

  private lGroupTotal = [{key: 'year', name: 'Jahr'}, {key: 'month', name: 'Monat'}, {
    key: 'none',
    name: 'Keine Auswahl'
  }];
  private lGroupYear = [{key: 'month', name: 'Monat'}, {key: 'weeknumber', name: 'Kalenderwoche'}, {
    key: 'none',
    name: 'Keine Auswahl'
  }];
  private lGroupMonth = [{key: 'weeknumber', name: 'Kalenderwoche'}, {key: 'none', name: 'Keine Auswahl'}];
  private lGroup = this.lGroupMonth;

  private oGroup = this.lGroup[0];

  // Data
  lData = null;
  savedData = "not saved";


  // Table
  ctx = null;
  myChart = null;

  constructor(private connApi: ConnApiService) {
  }

  ngOnInit() {
    // gets called by every new loading of this page

    const kTime = localStorage.getItem('kTime');
    const kChoice = localStorage.getItem('kChoice');
    const kGroup = localStorage.getItem('kGroup');

    if (kTime !== null && kChoice !== null && kGroup !== null) {
      console.log("localStorage-Keys not null")

      // oTime
      var index = this.lTime.findIndex(p => p.key == kTime);
      this.oTime = this.lTime[index];

      // lChoice & lGroup
      switch (this.oTime.key) {
        case 'year':
          this.lChoice = this.lChoiceYear;
          this.lGroup = this.lGroupYear;
          break;
        case 'month':
          this.lChoice = this.lChoiceMonth;
          this.lGroup = this.lGroupMonth;
          break;
        case 'weeknumber':
          this.lChoice = this.lChoiceWeeknumber;
          break;
      }

      // oChoice
      this.oChoice = this.lChoice[this.lChoice.findIndex(p => p.key == kChoice)];

      // oGroup
      this.oGroup = this.lGroup[this.lGroup.findIndex(p => p.key == kGroup)];

      this.onLoad();
    }
  }

  onLoad() {
    let json = {
      kTime: this.oTime.key,
      kChoice: this.oChoice.key,
      kGroup: this.oGroup.key,
      bTotal: 1
    }

    this.connApi.safePost(this.urlControllingTeam, json).subscribe((response: HttpResponse<any>) => {
      console.log("dataServer");
      console.log(response.body);
      this.lData = response.body;
      this.setTable();
    })
  }

  onFilterChange() {
    this.savedData = "data saved after filterChange";

    this.onLoad();

    switch (this.oTime.key) {
      case 'year':
        this.lChoice = this.lChoiceYear;
        this.oChoice = this.lChoiceYear[0];
        this.lGroup = this.lGroupYear;

        break;
      case 'month':
        this.lChoice = this.lChoiceMonth;
        this.oChoice = this.lChoiceMonth[0];
        this.lGroup = this.lGroupMonth;
        break;
      case 'weeknumber':
        this.lChoice = this.lChoiceWeeknumber;
        this.oChoice = this.lChoiceWeeknumber[0];
        break;
    }

    // localStorage
    localStorage.setItem('kTime', this.oTime.key);
    localStorage.setItem('kChoice', this.oChoice.key);
    localStorage.setItem('kGroup', this.oGroup.key);
  }

  isSelf($id) {
    return $id == this.lData;
  }

  getYearFromDate(dStart: any) {

  }

  getGroup(nGroup) {
    switch (this.oGroup.key) {
      case "year":
      case "weeknumber":
        return nGroup;
      case "month":
        let lMonth: string[] = [];
        lMonth[1] = "Januar";
        lMonth[2] = "Februar";
        lMonth[3] = "März";
        lMonth[4] = "April";
        lMonth[5] = "Mai";
        lMonth[6] = "Juni";
        lMonth[7] = "Juli";
        lMonth[8] = "August";
        lMonth[9] = "September";
        lMonth[10] = "Oktober";
        lMonth[11] = "November";
        lMonth[12] = "Dezember";
        return lMonth[nGroup]
    }
  }

  getNumber(s: string | null) {

  }


  setTable() {
    console.log(this.lData);

    // Data
    let data = [];
    console.log("Before: "+data);
    // TODO: create forloop that iterates through lData and receive nProcessed from each row and add it
    // TODO: to our new int array - data --> Therefore check how to add a value to an int array

    for(let i=0; i < this.lData.length-1; i++) {
      data.push(this.lData[i].nProcessed);
    }

    console.log("After: "+data);

    // Labels
    let labels = [];
    console.log("Before: "+data);


    for(let i=0; i < this.lData.length-1; i++) {
      labels.push(this.lData[i].nGroup);
    }


    if (this.myChart !== null) this.myChart.destroy();
    this.ctx = document.getElementById('myChart');
    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '# of Votes',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            title: {
              display: true,
              text: 'Erfolgreich geprüfte Geräte'
            },
            beginAtZero: true,
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Prüfen'
          }
        }
      }
    });


  }


}
