import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RecupracaoComponent } from './recupracao/recupracao.component';
import { CriarComponent } from './criar/criar.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RecupracaoComponent, CriarComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
