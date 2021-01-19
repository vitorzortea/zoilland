import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatasService } from '../core/datas.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: HttpService,
    private data: DatasService
  ) { }

  get(){
    console.log('Token: ', localStorage.getItem('token'))
    this.api.get('user').subscribe(
      (res:any)=>{
        this.data.user = res.user
        console.log(this.data.user)
      },
      (error)=>{console.log(error)}
    )
  }
}
