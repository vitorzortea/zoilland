import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-criar',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.styl']
})
export class CriarComponent implements OnInit {

  nome: string;
  email: string;
  senha: string;
  confSenha: string;
  avatar = '1-1';
  createOn = new Date;
  zoicoin = 2000;

  samePass = false
  erroPass = '';

  headers = new HttpHeaders();


  constructor(
   private api: HttpService
  ) { }

  ngOnInit() {
  }

  createUser(){
    if(!this.samePass){
      alert('O campo "Senha" e o campo "Confirmar Senha" tem que ser iguais')
      return
    }
    const body = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      avatar: this.avatar,
      createOn: this.createOn,
      zoicoin: this.zoicoin,
    }
    this.api.post('newuser', body).subscribe(
      (res)=>{
        alert('Usuário criado');
        this.api.post('login', {email: this.email, senha: this.senha}).subscribe(
          (res: {auth, token})=>{
            localStorage.setItem('user', res.token);
          },
          (error)=>{alert('Errou rude! 2'); console.log(error);}
        )
      },
      (error)=>{
        alert('Errou rude!');
        console.log(error)
      }
    )
  }

  verifyPass(){
    if(this.senha && this.confSenha){
      if(this.senha == this.confSenha){
        this.samePass = true;
        this.erroPass = '';
      } else {
        this.samePass = true;
        this.erroPass = 'Senhas diferentes';
      }
    }else{
      this.samePass = false;
      this.erroPass = '';
    }
  }

}
