import { LoggingService } from "./logging.service";
import { EventEmitter, Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AccountsService {
  constructor(private loggingService: LoggingService) {}

  accounts = [
    {
      name: "Master Account",
      status: "active",
    },
    {
      name: "Test Account",
      status: "inactive",
    },
    {
      name: "Hidden Account",
      status: "unknown",
    },
  ];

  statusUpdated = new EventEmitter<string>();

  addAccount(name: string, status: string) {
    this.accounts.push({ name, status });
    this.loggingService.logStatusChange(status);
  }
  updateAccount(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
}
