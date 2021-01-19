import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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


  constructor(
   private api: AuthService,
  ) { }

  ngOnInit() {
  }

  createUser(){
    if(!this.samePass){
      alert('O campo "Senha" e o campo "Confirmar Senha" tem que ser iguais')
      return
    }else{
      const body = {
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        avatar: this.avatar,
        createOn: this.createOn,
        zoicoin: this.zoicoin,
      }
      this.api.criarConta(body);
    }
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
