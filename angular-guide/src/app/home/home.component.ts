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
        if (count == 2) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      }, 1000);
    });

    customIntervalObservable.pipe(takeUntil(this.destroy)).subscribe({
      next: (data) => console.log(data),
      error: (error: Error) => alert(error.message),
      complete: () => console.log('Completed!'),
    });
  }

  ngOnDestroy(): void {
    // this.firstObsSubscription.unsubscribe()
    this.destroy.next('');
    this.destroy.complete();
  }
}
