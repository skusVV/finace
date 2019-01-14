import {Component, Input} from '@angular/core';
import {ICategory} from '../../../store/reducers/data.reducer';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CategoryComponent {
  @Input() category: ICategory;
  @Input() payments: any[];

  displayedColumns: string[] = ['created_date', 'amount'];
  expandedElement: any;
}
