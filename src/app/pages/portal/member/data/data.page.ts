import { Component, OnInit } from '@angular/core';
import {CommonPage} from "../../common/CommonPage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-data',
  templateUrl: './data.page.html',
  styleUrls: ['./data.page.scss'],
})
export class DataPage extends CommonPage implements OnInit {

  constructor(public router: Router) {
    super(router);
  }

  ngOnInit() {
  }
}
