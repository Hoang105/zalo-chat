import { from } from 'rxjs';
import { NotifyService } from './service/notify.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ListItemChatComponent } from './list-item-chat/list-item-chat.component';
import { ListItemContactComponent } from './list-item-contact/list-item-contact.component';
import { ListItemInvitationsComponent } from './list-item-invitations/list-item-invitations.component';

import { AuthGuard } from './auth/auth.guard';

import { DialogUpdateComponent } from './dialog-update/dialog-update.component';
import { SharedModule } from './shared/model/shared.module';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { ContentChatComponent } from './content-chat/content-chat.component';
import { DialogAddFriendComponent } from './dialog-add-friend/dialog-add-friend.component';
import { DialogFindfriendComponent } from './dialog-findfriend/dialog-findfriend.component';
import { NotifyPanelComponent } from './notify-panel/notify-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    HomePageComponent,
    DialogUpdateComponent,
    ContentChatComponent,
    ListItemChatComponent,
    ListItemInvitationsComponent,
    ListItemContactComponent,
    DialogAddFriendComponent,
    DialogFindfriendComponent,
    NotifyPanelComponent,
  ],
  imports: [
    MatSnackBarModule,
    ScrollingModule,
    MatBadgeModule,
    MatDatepickerModule,
    HttpClientModule,
    MatDialogModule,
    MatMenuModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatStepperModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatSelectModule,
    MatListModule,
    SharedModule,
    MatNativeDateModule,
  ],
  providers: [AuthGuard, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
