import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DataPage} from "./data/data.page";
import { MemberPage } from './member.page';

const routes: Routes = [
  {
    path: 'member/menu',
    component: MemberPage,
    children: [
      {
        path: 'data',
        loadChildren: () => import('./data/data.module').then( m => m.DataPageModule)
      },
      {
        path: 'controlling',
        loadChildren: () => import('./controlling/controlling.module').then( m => m.ControllingPageModule)
      }
    ]
  },
  {
    path: 'member',
    redirectTo: 'member/menu/data'
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberPageRoutingModule {}
