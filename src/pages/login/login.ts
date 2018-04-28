import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { PostsMethodsProvider } from '../../providers/posts-methods/posts-methods';
import { MainPage } from '../../pages/main/main';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
username:any
password:any
  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController,private serv:PostsMethodsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login(){

    // let login = {
    //   username: this.username,
    //   password: this.password
  
    // };
    this.oktost();

    // this.serv.login(login).subscribe(res => {
    //   console.log(res.status)

    //   if(res.status==200 && res.text().trim()=="y"){
    //     this.oktost();
    //   }else {
    //     this.wrong();
    //   }
    // });
    
  }

  oktost() {
    let toast = this.toastCtrl.create({
      message: 'you are logged in :) ',
      duration: 1000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      this.navCtrl.setRoot(MainPage)
    });
  
    toast.present();
  }

  wrong() {
    let toast = this.toastCtrl.create({
      message: 'wrong user or password',
      duration: 1000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
