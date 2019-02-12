import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {IPayment} from '../../store/reducers/data.reducer';

interface ICategoryVisualize {
  title: string;
  payments: IPayment[];
}

@Component({
  selector: 'app-category-visualize',
  templateUrl: './categoryVisualize.component.html',
  styleUrls: ['./categoryVisualize.component.less']
})
export class CategoryVisualizeComponent {

  constructor(public dialogRef: MatDialogRef<CategoryVisualizeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ICategoryVisualize) {}

  onNoClick() {
    this.dialogRef.close();
  }
}
