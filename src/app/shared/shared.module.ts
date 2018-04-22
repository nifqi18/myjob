import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { BigInputComponent } from './big-input/big-input.component';
import { BigInputActionComponent } from './big-input/big-input-action.component';
import { SearchControlComponent } from '@app/component/search-control/search-control.component';
import { MessageComponent } from '@app/shared/toast/message.component';
import { SpinnerComponent } from '@app/component/spinner/spinner.component';
import { MatProgressBarModule, MatCardModule, MatIconModule, MatFormFieldModule, MatListModule, MatOptionModule, MatSelectModule, MatSidenavModule, MatMenuModule, MatToolbarModule, MatButtonModule} from '@angular/material';
import { AuthLoaderComponent } from '@app/component/auth-loader/auth-loader.component';
import { LoginComponent } from '@app/page/user/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatListModule,
    MatOptionModule,
    MatSelectModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: [
    BigInputComponent, 
    BigInputActionComponent, 
    SearchControlComponent, 
    MessageComponent ,
    SpinnerComponent, 
    AuthLoaderComponent,
    LoginComponent,
    
    ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatListModule,
    MatOptionModule,
    MatSelectModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,

    BigInputComponent,
    BigInputActionComponent,
    SearchControlComponent,
    MessageComponent,
    SpinnerComponent,
    AuthLoaderComponent,
    LoginComponent,
    
  ]
})
export class SharedModule {}
