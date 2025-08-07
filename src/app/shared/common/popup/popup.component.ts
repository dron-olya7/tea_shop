import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnDestroy {
  isVisible: boolean = false;
  private subscription: Subscription = new Subscription();
  private delay: number = 10000;
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.subscription = timer(this.delay).subscribe(
      () => {
        if (!document.hidden) {
          this.isVisible = true;
        }
      }
    );
    document.addEventListener('visibilitychange', this.handleVisability);
  }

  handleVisability = () => {
    if (document.hidden) {
      this.isVisible = false;
    }
  }
  goToCatalog(): void {
    this.route.navigate(['/catalog']);
  }
  closePopup(): void {
    this.isVisible = false;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    document.removeEventListener('visibilitychange', this.handleVisability);
  }
}
