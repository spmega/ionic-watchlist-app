import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as xml2js from "xml2js";

import { WatchlistRetrieverProvider } from '../../providers/watchlist-retriever/watchlist-retriever';
/*
  Generated class for the StocklistRetrieverProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class StocklistRetrieverProvider {

  private static stockLists: string[][] = new Array(10);

  constructor(public http: Http,
    public watchlistRetrieverProvider: WatchlistRetrieverProvider) {
    console.log('Hello StocklistRetrieverProvider Provider');
  }

  public static getStockLists(){
    return this.stockLists;
  }

  getStockList(watchList: string){
    /*
    var parser = new xml2js.Parser();
    var xml: string = "<config><test>Hello</test><data>SomeData</data></config>";
    parser.parseString(xml, function(err, result){
        console.log(result['config']['data']);
    });

    var stockList: string[] = new Array(this.sampleStockList.length);
    for(var i: number = 0; i < this.sampleStockList.length; i++){
      stockList[i] = watchList + this.sampleStockList[i];
    }

    let text = "";
    this.http.get('https://quote.cnbc.com/quote-html-webservice/quote.htm?symbols=FB|XOM')
    .map(res => res.text())
    .subscribe(
      data => {
          text = data;
          text = text.substring(text.indexOf('<QuickQuote>'));
          text = '<QuickQuoteResult>' + text;
          var jsonObject: any;
          console.log("Text " + text);
          parser.parseString(text, function(err, result){
              console.log("Result " + JSON.stringify(result));
              console.log("Error " + JSON.stringify(err));
              console.log(result.QuickQuoteResult.QuickQuote[0].symbol);
          });
     });*/
     /*
     var stockList: string[];

     this.storage.get(watchList).then((value) => {
       stockList = value;
     }).catch(() => {
       stockList = null;
     });

     return stockList;*/

     var indexOfWatchList: number = this.watchlistRetrieverProvider.getWatchLists().indexOf(watchList);

     if(indexOfWatchList == -1){
       return null;
     }

     return StocklistRetrieverProvider.getStockLists()[indexOfWatchList];
  }

  saveStock(watchList: string, stock: string){
    console.log("watchlist in saveStock " + watchList);
    console.log("stock in saveStock " + stock);

    var indexOfWatchList: number = this.watchlistRetrieverProvider.getWatchLists().indexOf(watchList);

    if(indexOfWatchList == -1){
      this.watchlistRetrieverProvider.getWatchLists().push(watchList);
      indexOfWatchList = this.watchlistRetrieverProvider.getWatchLists().indexOf(watchList);
    }

    if(StocklistRetrieverProvider.getStockLists()[indexOfWatchList] == null){
      StocklistRetrieverProvider.getStockLists()[indexOfWatchList] = new Array(0);
    }

    StocklistRetrieverProvider.getStockLists()[indexOfWatchList].push(stock);
  }

  deleteStock(watchList: string, stock: string){
    var indexOfWatchList: number = this.watchlistRetrieverProvider.getWatchLists().indexOf(watchList);

    if(indexOfWatchList == -1){
      return;
    }

    if(StocklistRetrieverProvider.getStockLists()[indexOfWatchList] == null){
      return;
    }

    var indexOfStock = StocklistRetrieverProvider.getStockLists()[indexOfWatchList].indexOf(stock);

    if(indexOfStock == -1){
      return;
    }

    StocklistRetrieverProvider.getStockLists()[indexOfWatchList].splice(indexOfStock, 1);
  }

  deleteStocks(watchList: string){
    var indexOfWatchList: number = this.watchlistRetrieverProvider.getWatchLists().indexOf(watchList);

    if(indexOfWatchList == -1){
      return;
    }

    if(StocklistRetrieverProvider.getStockLists()[indexOfWatchList] == null){
      return;
    }

    StocklistRetrieverProvider.getStockLists()[indexOfWatchList] = null;
  }

}
