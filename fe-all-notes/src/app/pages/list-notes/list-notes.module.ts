import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListNotesComponent } from './list-notes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ListNotesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ]
})
export class ListNotesModule { }
