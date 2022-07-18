import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembercontrollingPage } from './membercontrolling.page';

const routes: Routes = [
  {
    path: '',
    component: MembercontrollingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembercontrollingPageRoutingModule {}
