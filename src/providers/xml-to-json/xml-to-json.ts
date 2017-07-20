import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import xml2js from 'xml2js';

/*
  Generated class for the XmlToJsonProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class XmlToJsonProvider {

  private http: Http;

  constructor(http: Http) {
    console.log('Hello XmlToJsonProvider Provider');
    this.http = http;
  }

  parseWithParams(url: string, params: any){
    return this.http.get(url, params)
    .map(res => res.json);
  }

  parse(url: string){
    return this.http.get(url)
    .map(res => res.json);
  }
}
