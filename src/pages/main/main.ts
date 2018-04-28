import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { GetMethodsProvider} from '../../providers/get-methods/get-methods';
import 'rxjs/add/operator/map';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
data:any=[];
  constructor(public serv:GetMethodsProvider,public navCtrl: NavController, public navParams: NavParams) {
this.serv.getitems().map(res => res.json()).subscribe(data => {
  this.data = data;
});
  }
  
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

}
