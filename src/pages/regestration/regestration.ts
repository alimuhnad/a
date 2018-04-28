import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { PostsMethodsProvider} from '../../providers/posts-methods/posts-methods';
import { ToastController } from 'ionic-angular';
import { LoginPage} from '../../pages/login/login';
import swal from 'sweetalert';


/**
 * Generated class for the RegestrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-regestration',
  templateUrl: 'regestration.html',
})
export class RegestrationPage {
  username:any
  password:any
  email:any
  phone:number
  constructor(public navCtrl: NavController, public navParams: NavParams,private serv:PostsMethodsProvider,private toastCtrl: ToastController) {
  }

  save(): void {
 if(this.username==null || this.username==" " ||
    this.password==null || this.password==" " ||
    this.email==null || this.email==" " ||
    this.phone==null  ){
      this.wrongnull();

    }else{

      let regesteration = {
        username: this.username,
        password: this.password,
        email: this.email,
        phone:this.phone,
      };
  
   this.serv.regs(regesteration).subscribe(res => {
    if(res.status==200 && res.text().trim()=="newok"){
      swal("Good job!", "You clicked the button!", "success");
      this.oktost();
    }else {
      this.wrong();
    }
  });
  } 
  }


 
//if ok 
  oktost() {
    let toast = this.toastCtrl.create({
      message: 'you are regesterd :) ',
      duration: 1000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
this.navCtrl.push(LoginPage)
    });
  
    toast.present();
  }
//if not
  wrong() {
    let toast = this.toastCtrl.create({
      message: 'phone or email alrady regestaerd  ',
      duration: 1000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

//if null
wrongnull() {
  let toast = this.toastCtrl.create({
    message: 'insete all fildes :)',
    duration: 1000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

}
