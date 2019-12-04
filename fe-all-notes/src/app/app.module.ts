import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { LayoutModule } from './modules/layout/layout.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxsModule.forRoot([], {
      developmentMode: isDevMode(),
      selectorOptions: {
        suppressErrors: false,
        injectContainerState: false,
      },
    }),
    SharedModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
