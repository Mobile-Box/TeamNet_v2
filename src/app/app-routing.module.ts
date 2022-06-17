import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {MemberPage} from './pages/portal/member/member.page';

const routes: Routes = [
  {path: 'app-root', component: AppComponent},
  {
    path: 'member',
    loadChildren: () => import('./pages/portal/member/member.module').then( m => m.MemberPageModule)
  },
  {
    path: 'controlling-team',
    loadChildren: () => import('./pages/portal/member/controlling/teamcontrolling/teamcontrolling.module').then( m => m.TeamcontrollingPageModule)
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
