import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService } from './services/authguard.service';

const routes: Routes =  [
  {
    path: '',
    loadChildren: './modules/game/game.module#GameModule',
    canActivate:	[AuthguardService],
  },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
