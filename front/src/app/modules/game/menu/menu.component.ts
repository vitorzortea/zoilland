import { Component, OnInit } from '@angular/core';
import { DatasService } from 'src/app/core/datas.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.styl']
})
export class MenuComponent implements OnInit {

  constructor(
    private data: DatasService
  ) { }

  ngOnInit() {
  }

}
