import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';

const routes: Routes = [
  {path: 'app-root', component: AppComponent},
  {
    path: 'member',
    loadChildren: () => import('./pages/portal/member/member-routing.module').then( m => m.MemberPageRoutingModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/portal/member/data/main/main.module').then( m => m.MainPageModule)
  },
  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
