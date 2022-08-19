import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-guide';
  navigateTo = '';

  onNavigate(feature: string) {
    this.navigateTo = feature;
  }
}
