import { Component, Input, Output } from '@angular/core';
import { LoginServices } from './components/login/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output()
  title = 'ciclo4Frontend';

  @Output()
  isAuthenticated!:boolean;

  constructor(public authService: LoginServices) {
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit(): Promise<void> {
    this.isAuthenticated = await this.authService.checkAuthenticated();
  }

  async logout(): Promise<void> {
    await this.authService.logout('/');
  }
}
