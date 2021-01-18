import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { CriarComponent } from './criar/criar.component';
import { LoginComponent } from './login/login.component';
import { RecupracaoComponent } from './recupracao/recupracao.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'recuperacao-senha',
        component: RecupracaoComponent
      },
      {
        path: 'criar-conta',
        component: CriarComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
