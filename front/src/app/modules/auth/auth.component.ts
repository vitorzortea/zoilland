import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.styl']
})
export class AuthComponent implements OnInit {
  imgArray = ['1','2','3','4','5','6'];
  bgNow;
  bgOld;
  index = 0;

  constructor() { }

  ngOnInit() {
    this.embaralharArray(this.imgArray);
    this.bgNow = this.imgArray[this.index];
    this.bgOld = this.imgArray[this.imgArray.length - 1];
    const mudar = setInterval(()=>this.mudarBanner(), 5000);
  }

  mudarBanner(){
    const indexOld = this.index;
    const banner = document.querySelector('section>div>span');
    this.index++;
    if(this.index > (this.imgArray.length - 1)){ this.index = 0; }
    banner.animate([
      {opacity: 0},
      {opacity: 1}
    ], {duration: 1000});
    this.bgNow = this.imgArray[this.index];
    this.bgOld = this.imgArray[indexOld];
  }

  embaralharArray(array) {
    let m = array.length;
    let t;
    let i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }
}
