import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ServesProvider } from '../providers/serves/serves';
import { RegestrationPage } from '../pages/regestration/regestration';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { SettingsPage } from '../pages/settings/settings';
//=======================================================
import { PostsMethodsProvider } from '../providers/posts-methods/posts-methods';
import { PutMethodsProvider } from '../providers/put-methods/put-methods';
import { DeleteMethodsProvider } from '../providers/delete-methods/delete-methods';
import { GetMethodsProvider } from '../providers/get-methods/get-methods';
//=======================================================

@NgModule({
  declarations: [
    MyApp,
    MainPage,
    LoginPage,
    SettingsPage,
    HomePage,
    RegestrationPage
  ],
  imports: [
    BrowserModule,
    HttpModule,

    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegestrationPage,
    MainPage,
    SettingsPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServesProvider,
    PostsMethodsProvider,
    PutMethodsProvider,
    DeleteMethodsProvider,
    GetMethodsProvider
  ]
})
export class AppModule {}
