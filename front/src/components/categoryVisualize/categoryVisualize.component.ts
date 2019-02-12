import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IPayment} from '../../store/reducers/data.reducer';

const VISUALISE_BY_CURRENCY = 'byCurrency';
const VISUALISE_BY_DATE = 'byDate';

interface ICategoryVisualize {
  title: string;
  payments: IPayment[];
}

type IActiveTab = 'byDate' | 'byCurrency';

@Component({
  selector: 'app-category-visualize',
  templateUrl: './categoryVisualize.component.html',
  styleUrls: ['./categoryVisualize.component.less']
})
export class CategoryVisualizeComponent {
  activeTab: IActiveTab = VISUALISE_BY_CURRENCY;

  constructor(public dialogRef: MatDialogRef<CategoryVisualizeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ICategoryVisualize) {}

  get isByCurrencyActive(): boolean {
    return this.activeTab === VISUALISE_BY_CURRENCY;
  }

  get isByDateActive(): boolean {
    return this.activeTab === VISUALISE_BY_DATE;
  }

  close() {
    this.dialogRef.close();
  }

  setActiveTab(activeTab: IActiveTab) {
    this.activeTab = activeTab;
  }
}
