import {Component, OnInit} from '@angular/core';
import {IState, userStateSelector, dataStateSelector} from '../../store/reducers';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {ICategory, IPayment} from '../../store/reducers/data.reducer';
import {AddCategoryComponent} from './addCategory/addCategory.component';
import {AddCategory} from '../../store/actions/data.actions';

export interface IDialogData {
  name: string;
  percent: number;
  description: string;
  title: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit{
  userName: Observable<string>;
  categories: Observable<ICategory[]>;
  payments: Observable<IPayment[]>;
  sidebarOpened = true;

  constructor(private store: Store<IState>, public dialog: MatDialog) {}

  ngOnInit() {
    this.userName =  this.store.pipe(
      distinctUntilChanged(),
      select(userStateSelector),
      map(({userName}) => userName)
    );

    const dataStateStream = this.store.pipe(
      distinctUntilChanged(),
      select(dataStateSelector),
    );

    this.categories = dataStateStream.pipe(
      map(({categories}) => categories)
    );

    this.payments = dataStateStream.pipe(
      map(({payments}) => payments)
    );
  }

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }

  addNewCategory() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '300px',
      data: {name: null, percent: null, description: null, title: 'Add New Category'}
    });

    dialogRef.afterClosed()
      .subscribe(({name, description, percent}) => {
        this.store.dispatch(new AddCategory(name, percent, description));
      });
  }
}
