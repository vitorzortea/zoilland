import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

  email: string;
  senha: string;

  error = '';


  constructor(
   private api: HttpService,
   private router: Router
  ) { }

  ngOnInit() {
  }

  entrar(){
    if(!this.email || !this.senha ){
      this.error = 'Preencha todos os campos';
      return
    }
    this.api.post('login', {email: this.email, senha: this.senha}).subscribe(
      (res: {token})=>{
        localStorage.setItem('user', res.token);
        this.router.navigate(['/']);
      },
      (error)=>{
        this.error = error.error.message;
      }
    );
  }

}
