import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-toggle-field',
  templateUrl: './toggleField.component.html',
  styleUrls: ['./toggleField.component.less']
})
export class ToggleFieldComponent {
  @Input() data: string;
  @Input() placeholder: string;
  @Output() onChange = new EventEmitter<string>();

  editable = false;

  toggleField() {
    this.editable = !this.editable;
  }

  change({target: {value}}: any){
    this.onChange.emit(value);
    this.toggleField();
  }
}
