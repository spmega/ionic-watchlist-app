import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private storage: Storage) {
    // set a key/value
    var tempArray: string[] = ['Whatever', 'hahahah', 'dwqdwqw'];
    storage.set('name', tempArray.join(','));

    // Or to get a key/value pair
    storage.get('name').then((val) => {
      console.log('Your name is', val.split(','));
    });
  }

}
