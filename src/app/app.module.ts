import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { ThreeDeeTouchOriginal} from '@ionic-native/three-dee-touch';
import { ThreeDeeTouch } from '@ionic-native/three-dee-touch/ngx';
// import { VibrationOriginal } from '@ionic-native/vibration';
import { Vibration } from '@ionic-native/vibration/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ThreeDeeTouch, Vibration],
  bootstrap: [AppComponent],
})
export class AppModule {}
