import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberPage } from './member.page';

const routes: Routes = [
  {
    path: '',
    component: MemberPage
  },
  {
    path: 'data',
    loadChildren: () => import('./data/data.module').then( m => m.DataPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberPageRoutingModule {}
