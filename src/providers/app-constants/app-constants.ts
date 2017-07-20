import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the AppConstantsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AppConstantsProvider {

  //private cnbcApi: string = "https://quote.cnbc.com/quote-html-webservice/quote.htm?symbols=";
  private static cnbcApi: string = "https://quote.cnbc.com/quote-html-webservice/quote.htm?output=json&symbols=";

  constructor() {
    console.log('Hello AppConstantsProvider Provider');
  }

  static getApi(){
    return this.cnbcApi;
  }

}
