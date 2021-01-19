import { Component, OnInit } from '@angular/core';
import { DatasService } from 'src/app/core/datas.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.styl']
})
export class MenuComponent implements OnInit {

  timeConfig = {timeZone: 'America/Sao_Paulo', hour: '2-digit', minute:'2-digit', second: '2-digit'}
  zoiTime


  constructor(
    private data: DatasService
  ) { }

  ngOnInit() {
    this.setDate();
    setInterval(()=>{this.setDate();}, 100)
  }

  setDate(){
    this.zoiTime =  new Date().toLocaleTimeString('pt-BR', this.timeConfig);
  }

}
