import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  email: string;
  senha: string;

  error;


  constructor(
   private api: AuthService,
  ) { }

  ngOnInit() {
  }

  entrar(){
    if(!this.email || !this.senha ){
      this.error = 'Preencha todos os campos';
      return
    }
    this.api.loginAPI({email: this.email, senha: this.senha}).subscribe(
      (res: {user, token})=>{this.api.login(res)},
      (error)=>{ this.error = error.error.message; }
    );
  }

}
