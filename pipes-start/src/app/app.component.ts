import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  appStatus = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("online");
    }, 1500);
  });
  servers = [
    {
      instanceType: "medium",
      name: "Production Server",
      status: "stable",
      started: new Date(2017, 1, 15),
    },
    {
      instanceType: "large",
      name: "User Database",
      status: "stable",
      started: new Date(2017, 1, 15),
    },
    {
      instanceType: "small",
      name: "Development Server",
      status: "offline",
      started: new Date(2017, 1, 15),
    },
    {
      instanceType: "small",
      name: "Testing Environment Server",
      status: "stable",
      started: new Date(2017, 1, 15),
    },
  ];
  filteredStatus = "";

  getStatusClasses(server: {
    instanceType: string;
    name: string;
    status: string;
    started: Date;
  }) {
    return {
      "list-group-item-success": server.status === "stable",
      "list-group-item-warning": server.status === "offline",
      "list-group-item-danger": server.status === "critical",
    };
  }
  onAddServer() {
    this.servers.push({
      instanceType: "small",
      name: "New Shit",
      status: "stable",
      started: new Date(),
    });
  }
}
