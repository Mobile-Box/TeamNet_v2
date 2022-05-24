import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamcontrollingPage } from './teamcontrolling.page';

const routes: Routes = [
  {
    path: '',
    component: TeamcontrollingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamcontrollingPageRoutingModule {}
