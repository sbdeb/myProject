import { Component } from '@angular/core';
// import { ThreeDeeTouchOriginal, ThreeDeeTouchForceTouch, ThreeDeeTouchQuickAction } from '@ionic-native/three-dee-touch';
import { ThreeDeeTouch, ThreeDeeTouchQuickAction, ThreeDeeTouchForceTouch } from '@ionic-native/three-dee-touch/ngx';
// import { VibrationOriginal } from '@ionic-native/vibration';
import { Vibration } from '@ionic-native/vibration/ngx';
// import { VibrationOriginal } from '@ionic-native/vibration';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  sub :any
  messages: string[] = [];
  constructor(public navCtrl: NavController, public threeDeeTouch: ThreeDeeTouch, private platform: Platform, public vibration: Vibration) {
    this.platform.ready().then(() => {
      if(this.platform.is('ios')){

        this.threeDeeTouch.onHomeIconPressed().subscribe((payload) => {
          this.messages.push("Icon pressed. Type: " + payload.type + ". Title: " + payload.title + ".");
          if (payload.type == 'checkin') {
            var document: { location: string; }
            document.location = 'checkin.html';
          } else if (payload.type == 'share') {
            document.location = 'share.html';
          } else {
            // wrapping in a timeout, otherwise it collides with the splashscreen
            setTimeout(function() {
              alert(JSON.stringify(payload));
            }, 500);
          }
        });
        
      }
    });
  }

 
  vibrate(){
    this.vibration.vibrate(50);
    
  }
  isAvailable(){
  this.threeDeeTouch.isAvailable().then(isAvailable => this.messages.push('3D Touch available? ' + isAvailable));
  this.vibration.vibrate(100);
  }
    enableLinkPreview(){
      this.threeDeeTouch.enableLinkPreview();
      this.vibration.vibrate(100);
  
    }
    disableLinkPreview(){
      this.threeDeeTouch.disableLinkPreview();
      this.vibration.vibrate(100);
  
    }
  watchForceTouches(){
    this.vibration.vibrate(100);
  this.threeDeeTouch.watchForceTouches()
    .subscribe(
      (data: ThreeDeeTouchForceTouch) => {
        this.messages.push('Force touch %' + data.force);
        this.messages.push('Force touch timestamp: ' + data.timestamp);
        this.messages.push('Force touch x: ' + data.x);
        this.messages.push('Force touch y: ' + data.y);
      }
    );
   
   
  let actions: Array<ThreeDeeTouchQuickAction> = [
    {
      type: 'checkin',
      title: 'Check in',
      subtitle: 'Quickly check in',
      iconType: 'Compose'
    },
    {
      type: 'share',
      title: 'Share',
      subtitle: 'Share like you care',
      iconType: 'Share'
    },
    {
      type: 'search',
      title: 'Search',
      iconType: 'Search'
    },
    {
      title: 'Show favorites',
      iconTemplate: 'HeartTemplate'
    }
  ];
  
  this.threeDeeTouch.configureQuickActions(actions);
   
  this.sub=this.threeDeeTouch.onHomeIconPressed().subscribe(
   (payload) => {
     // returns an object that is the button you presed
     this.messages.push('Pressed the ${payload.title} button')
     this.messages.push(payload.type)
   
   }
  )
  this.sub.unsubscribe();
  }


}
