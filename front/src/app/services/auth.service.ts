import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private api: HttpService,
    private router: Router
  ) { }

  loginError = '';

  criarConta(body){
    this.api.post('newuser', body).subscribe(
      (res)=>{
        alert('Usuário criado');
        this.loginAPI(body).subscribe(
          (res: {user, token})=>{this.login(res)},
          (error)=>{console.log(error)}
        );
      },
      (error)=>{console.log(error)}
    )
  }

  loginAPI(body){ return this.api.post('login', {email: body.email, senha: body.senha});  }

  login(res: {user, token}){
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    this.router.navigate(['/']);
  }

  recuperar(){
    alert('Vamos acordar o programador para programar essa parte. Tente amanhã :(')
  }
}
