import { Component, OnInit } from '@angular/core';
import { AccountServer, AccountsService } from './accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountsService],
})
export class AppComponent implements OnInit {
  accounts: AccountServer[] = [];

  constructor(private accountService: AccountsService) {}

  ngOnInit(): void {
    this.accounts = this.accountService.accounts;
  }
}
