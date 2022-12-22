import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // @Output() featureSelected = new EventEmitter<string>();
  // onSelect(feat: string) {
  //   this.featureSelected.emit(feat);
  // }

  constructor(private dataStoreService: DataStorageService) {}

  onSaveData() {
    this.dataStoreService.storeRecipes();
  }

  onFetchData() {
    this.dataStoreService.fetchRecipesData();
  }
}
