import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private authService: AuthService) { }


  // form slide trigger
  slideCheck = false;

  ngOnInit(): void {

  }

  slideTrigger(){
    if (this.slideCheck == false) {
      this.slideCheck = true;
    } else {
      this.slideCheck = false;
    }
  }
  // OAuth
  hostSignInWithGoogle(): void {
    this.authService.hostSignInWithGoogle();
  }

  playerSignInWithGoogle(): void {
    this.authService.playerSignInWithGoogle();

  }

}
