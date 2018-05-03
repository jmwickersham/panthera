import { Component } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Panthera';

  onToggle() {
    jQuery('.ui.sidebar').sidebar('setting', 'transition', 'push').sidebar('toggle');
  }
}
