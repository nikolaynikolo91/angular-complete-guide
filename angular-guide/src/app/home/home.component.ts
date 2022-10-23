import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // private firstObsSubscription: Subscription;
  private destroy = new Subject();
  constructor() {}

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => console.log(count))
    // interval(1000)
    //   .pipe(takeUntil(this.destroy))
    //   .subscribe((count) => console.log(count));

    const customIntervalObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000);
    });

    customIntervalObservable
      .pipe(takeUntil(this.destroy))
      .subscribe((data) => console.log(data));
  }

  ngOnDestroy(): void {
    // this.firstObsSubscription.unsubscribe()
    this.destroy.next('');
    this.destroy.complete();
  }
}
