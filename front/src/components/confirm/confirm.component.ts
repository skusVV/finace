import {Component, Input, Output, EventEmitter} from '@angular/core';

const POSITIVE_BUTTON_TEXT = 'Ok';
const NEGATIVE_BUTTON_TEXT = 'Cancel';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.less']
})
export class ConfirmComponent {
  @Input() title: string;
  @Output() confirmed = new EventEmitter<boolean>();

  positiveButtonText = POSITIVE_BUTTON_TEXT;
  negativeButtonText = NEGATIVE_BUTTON_TEXT;

  handlePositiveButton() {
    this.confirmed.emit(true);
  }

  handleNegativeButton() {
    this.confirmed.emit(false);
  }
}
