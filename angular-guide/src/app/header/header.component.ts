import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;

  private destroy = new Subject<void>();
  constructor(
    private dataStoreService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user.pipe(takeUntil(this.destroy)).subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    this.dataStoreService.storeRecipes();
  }

  onFetchData() {
    this.dataStoreService.fetchRecipesData().subscribe();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
