import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControllingPageRoutingModule } from './controlling-routing.module';

import { ControllingPage } from './controlling.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControllingPageRoutingModule
  ],
  declarations: [ControllingPage]
})
export class ControllingPageModule {}
