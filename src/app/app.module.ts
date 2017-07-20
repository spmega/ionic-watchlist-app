import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WatchlistProfilePage } from '../pages/watchlist-profile/watchlist-profile';
import { WatchlistStocksPage } from '../pages/watchlist-stocks/watchlist-stocks';
import { StockDetailsPage } from '../pages/stock-details/stock-details';

import { WatchlistRetrieverProvider } from '../providers/watchlist-retriever/watchlist-retriever';
import { StocklistRetrieverProvider } from '../providers/stocklist-retriever/stocklist-retriever';
import { AppConstantsProvider } from '../providers/app-constants/app-constants';
import { XmlToJsonProvider } from '../providers/xml-to-json/xml-to-json';
import { NativeStorage } from '@ionic-native/native-storage';
import { IonicStorageModule } from '@ionic/storage';
import { QuoteDataProvider } from '../providers/quote-data/quote-data';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WatchlistProfilePage,
    WatchlistStocksPage,
    StockDetailsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot({
      name: 'watchlsitdb',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
   }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WatchlistProfilePage,
    WatchlistStocksPage,
    StockDetailsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WatchlistRetrieverProvider,
    StocklistRetrieverProvider,
    AppConstantsProvider,
    XmlToJsonProvider,
    NativeStorage,
    QuoteDataProvider
  ]
})
export class AppModule {}
