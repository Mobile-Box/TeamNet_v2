import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  observe: 'response' as 'body'
}

@Injectable({
  providedIn: 'root'
})
export class ConnApiService {
  private urlApi: string = 'https://www.svp-api.com/api/public/index.php/'
  private urlServer: string = 'https://www.svp-api.com/'

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get<HttpResponse<any>>(`${this.urlApi}${url}`, httpOptions);
  }

  safeGet(url: string) {
    var httpOptionsToken = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      observe: 'response' as 'body'
    }
    console.log(httpOptionsToken);
    return this.http.get<HttpResponse<any>>(`${this.urlApi}${url}`, httpOptionsToken);
  }

  post(url: string, json: any) {
    console.log(url);
    return this.http.post<HttpResponse<any>>(`${this.urlApi}${url}`, json, httpOptions);
  }

  safePost(url: string, json: any) {
    var httpOptionsToken = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      observe: 'response' as 'body'
    }
    return this.http.post<HttpResponse<any>>(`${this.urlApi}${url}`, json, httpOptionsToken);
  }

  safePut(url: string, json: any) {
    var httpOptionsToken = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      observe: 'response' as 'body'
    }
    return this.http.put<HttpResponse<any>>(`${this.urlApi}${url}`, json, httpOptionsToken);
  }

  safeUpload(url: string, data: any) {
    var httpOptionsToken = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      observe: 'response' as 'body'
    }
    return this.http.post<HttpResponse<any>>(`${this.urlApi}${url}`, data, httpOptionsToken);
  }

  safeGetFile(url: string): any {
    return this.http.get(`${this.urlApi}${url}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      responseType: 'blob'
    });
  }

  getFile(url: string): any {
    return this.http.get(`${this.urlApi}${url}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      responseType: 'blob'
    });
  }



  safePostPDF(url: string, data: any): any {
    return this.http.post(`${this.urlApi}${url}`, data,{
      headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      responseType: 'blob'
    });
  }

  safeDownload(url: string): any {
    return this.http.get(`${this.urlApi}${url}`, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      responseType: 'blob'
    });
  }

  safeDelete(url: string) {
    var httpOptionsToken = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', `Bearer ${localStorage.getItem('token')}`),
      observe: 'response' as 'body'
    }
    return this.http.delete<HttpResponse<any>>(`${this.urlApi}${url}`, httpOptionsToken);
  }
}
