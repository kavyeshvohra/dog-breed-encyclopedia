import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DogBreedListComponent } from "./dog-breed-list/dog-breed-list.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DogBreedListComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
