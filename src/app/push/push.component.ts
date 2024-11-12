import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-push',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.css'],
})
export class PushComponent implements OnInit {
  readonly VAPID_PUBLIC_KEY =
    'BGD_vZyUhT9VtIcV5Afabil0l0c32ttwpXU8_Hz_pwlFKa2U_9ZNm0-Is8aXOtty_CtcwNkHUvQr4ZkKdw3wKDY';
  private swPush = inject(SwPush);
  private http = inject(HttpClient);

  ngOnInit() {
    this.subscribeToNotifications();
  }

  subscribeToNotifications() {
    if (this.swPush.isEnabled) {
      this.swPush
        .requestSubscription({
          serverPublicKey: this.VAPID_PUBLIC_KEY,
        })
        .then((subscription) => {
          // Send subscription to the server
          this.http
            .post('http://localhost:5000/subscribe', subscription)
            .subscribe({
              next: () => console.log('Subscription sent to server'),
              error: (err) =>
                console.error('Error sending subscription to server', err),
            });
        })
        .catch((err) =>
          console.error('Could not subscribe to notifications', err)
        );
    } else {
      console.warn('Push notifications are not enabled');
    }
  }
}
