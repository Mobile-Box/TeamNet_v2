import {Router} from '@angular/router';

export class CommonPage {

  constructor(public router: Router) {
  }

  onLogOut() {
    //localStorage.setItem('token', null);
    //this.router.navigate(['login']);
    console.log("LogOut needs to be implemented");
  }
}
