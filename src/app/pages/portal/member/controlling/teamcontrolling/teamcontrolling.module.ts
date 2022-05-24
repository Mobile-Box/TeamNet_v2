import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamcontrollingPageRoutingModule } from './teamcontrolling-routing.module';

import { TeamcontrollingPage } from './teamcontrolling.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamcontrollingPageRoutingModule
  ],
  declarations: [TeamcontrollingPage]
})
export class TeamcontrollingPageModule {}
