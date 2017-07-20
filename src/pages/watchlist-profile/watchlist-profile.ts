import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { WatchlistStocksPage } from '../watchlist-stocks/watchlist-stocks';

import { WatchlistRetrieverProvider } from '../../providers/watchlist-retriever/watchlist-retriever';
import { StocklistRetrieverProvider } from '../../providers/stocklist-retriever/stocklist-retriever';

import { Storage } from '@ionic/storage';
/**
 * Generated class for the WatchlistProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-watchlist-profile',
  templateUrl: 'watchlist-profile.html',
})
export class WatchlistProfilePage {

  //public sampleWatchLists: string[] = ["Watch List 1", "Watch List 2", "Watch List 3"];
  public watchLists: string[] = [];
  private navController: NavController;
  private watchlistProvider: WatchlistRetrieverProvider;
  private instance: WatchlistProfilePage = this;
  watchListChecked = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    watchlistProvider: WatchlistRetrieverProvider,
    public storage: Storage,
    public stocklistRetrieverProvider: StocklistRetrieverProvider,
    public alertCtrl: AlertController) {
    this.navController = navCtrl;
    //this.watchlistProvider = watchlistProvider;
    //this.watchLists = this.instance.watchlistProvider.getWatchLists();
    this.fetchData();
  }

  fetchData(){
    this.storage.keys().then((value) => {
      this.watchLists = value;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WatchlistProfilePage');
  }

  itemSelected(itemSelected: string){
    this.navController.push(WatchlistStocksPage, {
      watchListName: itemSelected
    });
  }

  doPrompt() {
    let stockSymbol: string;
    let prompt = this.alertCtrl.create({
      title: 'Create A Watch List',
      message: "Create a new watch list to track different stocks",
      inputs: [
        {
          name: 'watchList',
          placeholder: 'Watch List Name'
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
            /*this.instance.watchlistProvider.saveWatchList(data.watchList);
            this.watchLists = this.instance.watchlistProvider.getWatchLists();
            */
            this.storage.set(data.watchList, null).then(( ) =>{
              this.fetchData();
            });
            console.log("WatchLists: " + this.watchLists);
          }
        }
      ]
    });

    prompt.present();

  }

  deletePrompt(watchList: string) {
    let confirm = this.alertCtrl.create({
      title: 'Delete',
      message: 'Delete this watch list?',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete clicked');
            //this.watchlistProvider.deleteWatchList(watchList);
            this.storage.remove(watchList).then(( ) =>{
              this.fetchData();
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
