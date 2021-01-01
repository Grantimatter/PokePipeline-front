import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './modules/loginregister/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './components/test/test.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TempNavBarComponent } from './components/temp-nav-bar/temp-nav-bar.component';
import { PokemonUtilityModule } from './modules/pokemon-utility/pokemon-utility.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TrainerHubModule } from './modules/trainer-hub/trainer-hub.module';


@NgModule({
  declarations: [
    AppComponent, 
    TestComponent, 
    TempNavBarComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    HttpClientModule,
    PokemonUtilityModule,
    FontAwesomeModule,
    TrainerHubModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
