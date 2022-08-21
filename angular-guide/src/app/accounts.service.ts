import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';


export type AccountServer = {
  name: string;
  status: string;
};

@Injectable()
export class AccountsService {
  accounts: AccountServer[] = [
    {
      name: 'Master Account',
      status: 'active',
    },
    {
      name: 'Testaccount',
      status: 'inactive',
    },
    {
      name: 'Hidden Account',
      status: 'unknown',
    },
  ];

  constructor(private loggingService: LoggingService) {}

  addAccount(name: string, status: string) {
    this.accounts.push({ name, status });
    this.loggingService.logStatus(status);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatus(status);
  }
}
