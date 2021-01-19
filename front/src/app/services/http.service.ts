import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import	{	environment	}	from	'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseURL = environment.api;
  httpOptions;
  constructor(
    private http: HttpClient,
  ) {
    this.setHeader();
  }

  setHeader(){
    if(localStorage.getItem('token')){
      this.httpOptions = { headers: new HttpHeaders({'x-access-token': localStorage.getItem('token')}) }
    }
  }
  get(url) { console.log('header: ', this.httpOptions); return this.http.get(this.baseURL+url, this.httpOptions) }
  post(url, body) { return this.http.post(this.baseURL+url, body, this.httpOptions) }
  put(url, body) { return this.http.put(this.baseURL+url, body, this.httpOptions) }
  delete(url) { return this.http.delete(this.baseURL+url, this.httpOptions) }
}
