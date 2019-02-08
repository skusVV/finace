import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AddCategoryComponent} from '../addCategory/addCategory.component';

interface IConfirmDialog {
  title: string;
  positiveButtonText: string;
  negativeButtonText: string;
}

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.less']
})
export class ConfirmComponent {

  constructor(public dialogRef: MatDialogRef<AddCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IConfirmDialog) {}

  onNoClick() {
    this.dialogRef.close();
  }
}
