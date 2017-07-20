import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppConstantsProvider } from '../app-constants/app-constants';

/*
  Generated class for the QuoteDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class QuoteDataProvider {

  private symbols: string[];

  constructor(public http: Http) {
    console.log('Hello QuoteDataProvider Provider');

  }

  getQuoteData(symbolList: string[] | string){
    var resultObject: any;
    var symbols: string;

    if(symbolList == null){
      console.log("passed stock symbol was null");
      return;
    }

    console.log("symbolList passed: " + symbolList);

    if(typeof symbolList === "string"){
      symbols = symbolList;
    } else {
      symbols = symbolList.join('|');
    }

    console.log("Full api call: " + AppConstantsProvider.getApi() + symbols);
    return this.http.get(AppConstantsProvider.getApi() + symbols);
  }

}
