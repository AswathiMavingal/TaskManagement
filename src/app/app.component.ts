import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isSidebarOpen = false;
  title = 'EmpManagementApp';
  toggleSideNav() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
