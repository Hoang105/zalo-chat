import { LazyRoutingModule } from './lazy-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListItemContactComponent } from './../list-item-contact/list-item-contact.component';
import { ListItemChatComponent } from './../list-item-chat/list-item-chat.component';
import { ListItemInvitationsComponent } from './../list-item-invitations/list-item-invitations.component';

@NgModule({
  imports: [CommonModule, LazyRoutingModule],
  declarations: [],
})
export class LazyModule {}
