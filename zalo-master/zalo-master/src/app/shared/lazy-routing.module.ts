import { AuthGuard } from './../auth/auth.guard';
import { HomePageComponent } from './../home-page/home-page.component';
import { ListItemContactComponent } from './../list-item-contact/list-item-contact.component';
import { ListItemChatComponent } from './../list-item-chat/list-item-chat.component';
import { ListItemInvitationsComponent } from './../list-item-invitations/list-item-invitations.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivateChild: [AuthGuard],

    children: [
      { path: '', redirectTo: 'chat', pathMatch: 'full' },
      { path: 'chat', component: ListItemChatComponent },
      { path: 'contact', component: ListItemContactComponent },
      { path: 'invitations', component: ListItemInvitationsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LazyRoutingModule {}
