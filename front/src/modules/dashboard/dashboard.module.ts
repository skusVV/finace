import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard.routing';
import {SharedModule} from '../shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {HeaderComponent} from './header/header.component';
import {CategoriesListComponent} from './categoriesList/categoriesList.component';
import {AddCategoryComponent} from './addCategory/addCategory.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    CategoriesListComponent,
    AddCategoryComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    MatSidenavModule
  ],
  providers: [
  ],
  bootstrap: [DashboardComponent],
  entryComponents: [AddCategoryComponent]
})
export class DashboardModule { }
