import {NgtUniversalModule} from '@ng-toolkit/universal';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EffectsModule } from '@ngrx/effects';
import {UserEffect} from '../store/effects/user.effect';
import {metaReducers, reducerToken, reducerProvider} from '../store/reducers';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from '../services/guards/auth.guard';
import {RouterEffects} from '../store/effects/router.effect';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SharedModule} from '../modules/shared.module';
import {DataEffects} from '../store/effects/data.effects';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '../services/interceptor';
import {DashboardResolver} from '../services/dashboard.resolver';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogEffects} from '../store/effects/dialog.effects';
import {AddPaymentComponent} from '../components/addPayment/addPayment.component';
import {AddCategoryComponent} from '../components/addCategory/addCategory.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCategoryComponent,
    AddPaymentComponent
  ],
  imports:[
    BrowserAnimationsModule,
    SharedModule,
    NgtUniversalModule,
    HttpClientModule,
    StoreModule.forRoot(reducerToken, { metaReducers }),
    EffectsModule.forRoot([UserEffect, RouterEffects, DataEffects, DialogEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
    MatSnackBarModule,
  ],
  providers: [
    reducerProvider,
    AuthGuard,
    DashboardResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    AddCategoryComponent,
    AddPaymentComponent
  ]
})
export class AppModule { }
