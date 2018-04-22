import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogRoutingModule } from './dialog-routing.module';
import { MatDialogModule, MatStepperModule} from '@angular/material';
import { DialogComponent, DialogContentComponent } from '@app/_dialog/dialog/dialog.component';
import { KerjaComponent } from '@app/_dialog/kerja/kerja.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { SharedModule } from '@app/shared';
import { CoreDialogService } from '@app/_dialog/core.dialog.service';

@NgModule({
  entryComponents: [DialogContentComponent],
  imports: [
    CommonModule,
    DialogRoutingModule,
    MatDialogModule,
    CKEditorModule,
    MatStepperModule,
    SharedModule
  ],
  declarations: [DialogComponent, KerjaComponent, DialogContentComponent ],
  providers: [CoreDialogService]
})
export class DialogModule { 
  constructor(){}
}
