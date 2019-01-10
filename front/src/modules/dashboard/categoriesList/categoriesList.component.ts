import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ICategory} from '../../../store/reducers/data.reducer';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categoriesList.component.html',
  styleUrls: ['./categoriesList.component.less']
})
export class CategoriesListComponent {
  @Input() categories: ICategory[];
  @Output() addNewCategory = new EventEmitter<void>();

  addCategory() {
    this.addNewCategory.emit();
  }
}
