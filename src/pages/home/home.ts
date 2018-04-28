import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http,Headers} from '@angular/http';
import { ViewController } from 'ionic-angular';
import { ServesProvider} from '../../providers/serves/serves'
import { RegestrationPage} from '../../pages/regestration/regestration'
import { LoginPage} from '../../pages/login/login';
import swal from 'sweetalert';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public http:Http,public viewCtrl: ViewController,private serv:ServesProvider) {

  }

v(){
  
}
  
  reg(): void {
    this.navCtrl.push(RegestrationPage)
}
 login(){
  this.navCtrl.push(LoginPage)

 }
 
}
