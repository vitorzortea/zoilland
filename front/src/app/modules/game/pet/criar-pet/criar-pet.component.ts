import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-criar-pet',
  templateUrl: './criar-pet.component.html',
  styleUrls: ['./criar-pet.component.styl']
})
export class CriarPetComponent implements OnInit {

  constructor(
    private api: HttpService,
  ) { }
  tipo: string = 'fogo';
  nome: string;

  ngOnInit() {
  }

  criarPet(){
    const generos = ['Macho','Macho','Fêmea','Fêmea', 'Indefinido' ];
    const body = {nome: this.nome, tipo: this.tipo, genero: generos[Math.floor(Math.random() * 5)]}
    this.api.post('pet/create', body)
      .subscribe(
        (res)=>{ alert('Salvou'); console.log(res)},
        (error)=>{console.log(error)}
      );
  }

}
