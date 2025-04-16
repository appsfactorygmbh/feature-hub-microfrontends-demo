import { CommonModule } from '@angular/common';
import { Component, Inject, Input, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IAuthModule } from '@apps/feature-service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'feature-app-angular';

  userName: string = '';

  constructor(
    @Inject('AuthModule') authModule: IAuthModule,
    private ngZone: NgZone
  ) {
    const callback = (userName: string) => {
      this.ngZone.run(() => {
        this.userName = userName;
      });
    };
    authModule.subscribe(callback);
  }
}
