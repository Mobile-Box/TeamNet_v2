import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControllingPage } from './controlling.page';

const routes: Routes = [
  {
    path: '',
    component: ControllingPage
  },
  {
    path: 'teamcontrolling',
    loadChildren: () => import('./teamcontrolling/teamcontrolling.module').then( m => m.TeamcontrollingPageModule)
  },
  {
    path: 'membercontrolling',
    loadChildren: () => import('./membercontrolling/membercontrolling.module').then( m => m.MembercontrollingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControllingPageRoutingModule {}
