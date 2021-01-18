import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import	{	environment	}	from	'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
  ) { }

  baseURL = environment.api;

  get(url) {
    return this.http.get(this.baseURL+url);
  }
  post(url, body, httpOptions?) {
    return (httpOptions) ? this.http.post(this.baseURL+url, body, httpOptions) : this.http.post(this.baseURL+url, body);
  }
  put(url, body, httpOptions?) {
    return (httpOptions) ? this.http.put(this.baseURL+url, body, httpOptions) : this.http.put(this.baseURL+url, body);
  }
  delete(url, httpOptions?) {
    return (httpOptions) ? this.http.delete(this.baseURL+url, httpOptions) : this.http.delete(this.baseURL+url);
  }
}
