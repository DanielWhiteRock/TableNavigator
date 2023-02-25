import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableDetailComponent } from './table-detail/table-detail.component';
import { FilesComponent } from './files/files.component';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CdkAccordionModule
  ],
  declarations: [
    AppComponent,
    TableComponent,
    DashboardComponent,
    FilesComponent,
    TableDetailComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
