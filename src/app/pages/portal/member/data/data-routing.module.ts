import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataPage } from './data.page';

const routes: Routes = [
  {
    path: '',
    component: DataPage
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataPageRoutingModule {}
