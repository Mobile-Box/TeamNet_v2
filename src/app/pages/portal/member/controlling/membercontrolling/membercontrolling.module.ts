import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembercontrollingPageRoutingModule } from './membercontrolling-routing.module';

import { MembercontrollingPage } from './membercontrolling.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembercontrollingPageRoutingModule
  ],
  declarations: [MembercontrollingPage]
})
export class MembercontrollingPageModule {}
