import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { QuoteDataProvider } from '../../providers/quote-data/quote-data';
/**
 * Generated class for the StockDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-stock-details',
  templateUrl: 'stock-details.html',
})
export class StockDetailsPage {

  public symbolData:any;
  private instance: StockDetailsPage = this;
  private refreshDataTask: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public quoteDataProvider:QuoteDataProvider) {

    this.refreshDataTask = setInterval(() => {
      this.instance.fetchStockSymbolData();
    }, 1500);

    console.log("item retrieved from navParams was: " + navParams.get("symbol"));
    quoteDataProvider.getQuoteData(navParams.get("symbol")).map(res => res.json())
    .subscribe(data => {
      console.log("data retrieved: " + JSON.stringify(data));
      this.symbolData = data.QuickQuoteResult.QuickQuote;
      console.log("symboldata: " + JSON.stringify(this.symbolData));
    }, err => {
      console.log("error occured: " + err);
    });
    console.log("constructor: " + this.symbolData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockDetailsPage');
  }

  ionViewWillLeave(){
    console.log('ionViewWillLeave StockDetailsPage');
    clearInterval(this.refreshDataTask);
  }

  fetchStockSymbolData(){
    this.quoteDataProvider.getQuoteData(this.navParams.get("symbol")).map(res => res.json())
    .subscribe(data => {
      console.log("data retrieved: " + JSON.stringify(data));
      this.symbolData = data.QuickQuoteResult.QuickQuote;
      console.log("symboldata: " + JSON.stringify(this.symbolData));
    }, err => {
      console.log("error occured: " + err);
    });
  }
}
