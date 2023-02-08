import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directives';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective,
    LoadingSpinnerComponent,
  ],
  exports: [
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}
