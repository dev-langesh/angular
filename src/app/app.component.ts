import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'test';

  constructor(private _swPush: SwPush) {}

  ngOnInit() {
    this.requestSubscription();
  }

  requestSubscription = () => {
    if (!this._swPush.isEnabled) {
      console.log('Notification is not enabled.');
      return;
    }

    this._swPush
      .requestSubscription({
        serverPublicKey:
          'BGD_vZyUhT9VtIcV5Afabil0l0c32ttwpXU8_Hz_pwlFKa2U_9ZNm0-Is8aXOtty_CtcwNkHUvQr4ZkKdw3wKDY',
      })
      .then((_) => {
        console.log(JSON.stringify(_));
      })
      .catch((_) => console.log);
  };
}
