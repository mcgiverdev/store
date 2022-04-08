import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {

  activeMenu: boolean = false;
  counter: number = 0;
  token: string = '';
  profile: User | null = null;
  constructor(
    private storeService: StoreService, private authService: AuthService, private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    })
  }
  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
  login() {
    this.authService.loginAndReturnProfile('mcgiver@gmail.com', '123456')
      .subscribe(response => {
        console.log(response);
        this.profile = response
      })
  }
  getProfile() {
    return this.authService.profile()
      .subscribe(profile => {
        this.profile = profile
      })
  }

}
