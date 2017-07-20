import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { StockDetailsPage } from '../stock-details/stock-details';

import { StocklistRetrieverProvider } from '../../providers/stocklist-retriever/stocklist-retriever';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the WatchlistStocksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-watchlist-stocks',
  templateUrl: 'watchlist-stocks.html',
})
export class WatchlistStocksPage {

  stock: any = {};
  public watchList: string;
  //public sampleStockList: string[] = ["Stock 1", "Stock 2", "Stock 3"];
  public sampleStockList: string[];
  private instance: WatchlistStocksPage = this;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public stocklistRetrieverProvider: StocklistRetrieverProvider,
    public storage: Storage,
    public alertCtrl: AlertController,) {
    console.log("Passed Params are " + navParams.get("watchListName"));
    this.watchList = navParams.get("watchListName");
    //this.sampleStockList = stocklistRetrieverProvider.getStockList(navParams.get("watchListName"));
    this.fetchData();
    console.log("Stock List is " + this.sampleStockList);
  }

  fetchData(){
    this.storage.get(this.watchList).then( (value) => {
      if(value != null){
        this.sampleStockList = value.split(',');
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WatchlistStocksPage');
  }

  itemSelected(item: string){
    console.log("item passed to StockDetailsPage: " + item);
    this.navCtrl.push(StockDetailsPage, {
      symbol: item
    });
  }

  doPrompt() {
    let stockSymbol: string;
    let prompt = this.alertCtrl.create({
      title: 'Add a Stock',
      message: "Add a new stock to keep track of in your watch list",
      inputs: [
        {
          name: 'stock',
          placeholder: 'Stock Symbol i.e. MSFT'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            console.log('data: ' + JSON.stringify(data));
            /*this.instance.stocklistRetrieverProvider.saveStock(this.watchList, data.stock);
            this.sampleStockList = this.instance.stocklistRetrieverProvider.getStockList(this.watchList);*/
            this.storage.get(this.watchList).then((value) => {
              if(value == null){
                var stockList: string[] = new Array(0);
              } else {
                var stockList: string[] = value.split(',');
              }

              stockList.push(data.stock);

              //update the data
              this.storage.set(this.watchList, stockList.join(',')).then(() => {
                this.fetchData();
              });

            console.log("leaving prompt");
            });
          }
        }
      ]
    });

    prompt.present();

  }

  deletePrompt(stock: string) {
    let confirm = this.alertCtrl.create({
      title: 'Delete',
      message: 'Delete this stock from the watch list?',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete clicked');
            /*this.stocklistRetrieverProvider.deleteStock(this.watchList, stock);
            this.sampleStockList = this.instance.stocklistRetrieverProvider.getStockList(this.watchList);*/
            this.storage.get(this.watchList).then((value) => {
              var stockList: string[] = value.split(',');
              var index = stockList.indexOf(stock);
              stockList.splice(index, 1);

              this.storage.set(this.watchList, stockList.join(',')).then(() => {
                this.fetchData();
              });
            });
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    confirm.present()
  }

}
