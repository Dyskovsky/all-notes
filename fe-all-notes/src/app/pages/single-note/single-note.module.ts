import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleNoteComponent } from './single-note.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SingleNoteComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SingleNoteModule { }
