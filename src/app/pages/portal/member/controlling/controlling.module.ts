import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {MatIconModule} from '@angular/material/icon';
import { ControllingPageRoutingModule } from './controlling-routing.module';

import { ControllingPage } from './controlling.page';

@NgModule({
  imports: [
    MatIconModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ControllingPageRoutingModule
  ],
  declarations: [ControllingPage]
})
export class ControllingPageModule {}
