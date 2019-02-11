import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  @Input() userName: string;
  @Input() title: string;
  @Output() logout = new EventEmitter<void>();
}
