import { Component, OnInit } from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {MenuController, NavController} from '@ionic/angular';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import { ConnApiService } from 'src/app/services/conn-api/conn-api.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss'],
})
export class MemberPage implements OnInit {

  // Url
  private urlTeam = 'team/main';

  // Variables
  oTeam = null;

  currentPageTitle = '/data';

  constructor(public api: ConnApiService, public menuCtrl: MenuController, private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar) { }

  appPages = [
    {
      title: 'Dashboard',
      url: 'dashboard',
      icon: 'person'
    },
    {
      title: 'Meine Daten',
      url: 'data',
      icon: 'person'
    },
    {
      title: 'Controlling',
      url: 'controlling',
      icon: 'create'
    },
    {
      title: 'Arbeitsplanung',
      url: 'scheduling',
      icon: 'send'
    },
    {
      title: 'Info-Channel',
      url: 'information',
      icon: 'stats-chart'
    },

  ];
  selectedIndex = 0;

  ngOnInit() {
    this.menuCtrl.toggle();
  }

  openMenu() {
    this.menuCtrl.open();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

}
