import { FileUploadComponent } from './shared/file-upload/file-upload.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {APP_CONFIG, AppConfig} from './config/app.config';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/modules/shared.module';
import {CoreModule} from './core/core.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from './app.translate.factory';
import {HeroTopComponent} from './heroes/hero-top/hero-top.component';
import {ProgressBarService} from './core/shared/progress-bar.service';
import {ProgressInterceptor} from './shared/interceptors/progress.interceptor';
import {TimingInterceptor} from './shared/interceptors/timing.interceptor';
import {NgxExampleLibraryModule} from '@ismaestro/ngx-example-library';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import { TransactionListComponent } from './transactions/transaction-list/transaction-list.component';
import { TransactionDetailComponent } from './transactions/transaction-detail/transaction-detail.component';
import { TransactionsComponent } from './transactions/transactions.component';
import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';


@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule.forRoot(),
    NgxExampleLibraryModule.forRoot({
      config: {
        say: 'hello'
      }
    }),
    CoreModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HeroTopComponent,
  //  FileUploadComponent
    // TransactionsComponent
    // TransactionListComponent,
    // TransactionDetailComponent,
    // TransactionsRoutingComponent
  ],
  providers: [
    {provide: APP_CONFIG, useValue: AppConfig},
    {provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true, deps: [ProgressBarService]},
    {provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
