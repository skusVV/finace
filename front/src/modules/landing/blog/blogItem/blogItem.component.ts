import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-blog-item',
  templateUrl: './blogItem.component.html',
  styleUrls: ['./blogItem.component.less']
})
export class BlogItemComponent {
  // TODO add type for data
  @Input() data: any;
}
