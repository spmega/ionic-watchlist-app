import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the WatchlistRetrieverProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class WatchlistRetrieverProvider {

  private static watchLists: string[] = new Array(0);

  constructor(public http: Http) {
    console.log('Hello WatchlistRetrieverProvider Provider');
  }

  getWatchLists(){
    return WatchlistRetrieverProvider.watchLists;
  }

  saveWatchList(watchList: string){
    WatchlistRetrieverProvider.watchLists.push(watchList);
  }

  deleteWatchList(watchList: string){
    if(watchList == null){
      console.log("WatchlistRetrieverProvider:deleteWatchList => watchList is null");
      return;
    }

    var index:number = WatchlistRetrieverProvider.watchLists.indexOf(watchList);

    if(index != -1){
      console.log("WatchlistRetrieverProvider:deleteWatchList => index is " + index);
      WatchlistRetrieverProvider.watchLists.splice(index, 1);
    } else {
      console.log("WatchlistRetrieverProvider:deleteWatchList => watchList is doesnt exist");
    }

  }
}
