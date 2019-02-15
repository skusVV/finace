import {NgtUniversalModule} from '@ng-toolkit/universal';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EffectsModule } from '@ngrx/effects';
import {UserEffect} from '../store/effects/user/user.effect';
import {metaReducers, reducerToken, reducerProvider} from '../store/reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from '../services/guards/auth.guard';
import {RouterEffects} from '../store/effects/router/router.effect';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SharedModule} from '../modules/shared.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '../services/interceptor';
import {DashboardResolver} from '../services/dashboard.resolver';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogEffects} from '../store/effects/dialog/dialog.effects';
import {AddPaymentComponent} from '../components/addPayment/addPayment.component';
import {AddCategoryComponent} from '../components/addCategory/addCategory.component';
import {CategoriesEffects} from '../store/effects/categories/categories.effects';
import {PaymentsEffects} from '../store/effects/payments/payments.effects';
import {LoadEffects} from '../store/effects/load/load.effects';
import {ConfirmComponent} from '../components/confirm/confirm.component';
import {CategoryVisualizeComponent} from '../components/categoryVisualize/categoryVisualize.component';
import {CurrencyService} from '../services/currency.service';
import {PieChartComponent} from '../components/pieChart/pieChart.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCategoryComponent,
    AddPaymentComponent,
    ConfirmComponent,
    CategoryVisualizeComponent,
    PieChartComponent
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    NgtUniversalModule,
    HttpClientModule,
    StoreModule.forRoot(reducerToken, { metaReducers }),
    EffectsModule.forRoot([
      UserEffect,
      RouterEffects,
      CategoriesEffects,
      PaymentsEffects,
      LoadEffects,
      DialogEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
    MatSnackBarModule,
  ],
  providers: [
    reducerProvider,
    AuthGuard,
    DashboardResolver,
    CurrencyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    AddCategoryComponent,
    AddPaymentComponent,
    ConfirmComponent,
    CategoryVisualizeComponent,
  ]
})
export class AppModule { }
