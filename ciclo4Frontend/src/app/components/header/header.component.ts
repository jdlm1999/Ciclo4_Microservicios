import { Component, OnInit, Input } from '@angular/core';
import { LoginServices } from '../login/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  title!: string;
  @Input()
  isAuthenticated!:boolean;

  constructor(private login:LoginServices) { }

  async logout(): Promise<void> {
    await this.login.logout('/');
  }

  ngOnInit(): void {
  }

}
