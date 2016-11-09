import { Component, OnInit, ViewContainerRef } from '@angular/core'
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material'
import { ApiUserService, UserInterface, UserClass } from '../../../services/'

import { client } from '../../../zetapush/'
import { ApiZetalk, ApiConversation } from '../../../zetapush/api'

@Component({
  selector: 'zp-add-contact',
  styleUrls: ['./organization.component.scss'],
  templateUrl: './organization.component.html'
})
export class OrganizationComponent implements OnInit {

  dialogRef: MdDialogRef<OrganizationDialogComponent>

  constructor(
    public dialog: MdDialog,
    public viewContainerRef: ViewContainerRef,
    private apiConversation: ApiConversation) { }

  openDialog() {
    const config = new MdDialogConfig()

    config.viewContainerRef = this.viewContainerRef

    this.dialogRef = this.dialog.open(OrganizationDialogComponent, config)

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createConversation(result)
      }

      this.dialogRef = null
    })
  }

  ngOnInit() {
  }

  createConversation(result) {
    const interlocutors = [result.id, client.getUserId()]

    console.log('OrganizationComponent::createDirectConversation',{
      result,
      interlocutors
    })
    
    this.apiConversation.createDirectConversation({
      name:'direct',
      interlocutors
    }).then(result => {
      console.debug('OrganizationComponent::onCreateDirectConversation', { result })
    }).catch(error => {
      console.error('OrganizationComponent::onCreateDirectConversation', { error })
    })
  }
}

@Component({
  selector: 'zp-organization-dialog',
  styleUrls: ['./organization.dialog.component.scss'],
  templateUrl: './organization.dialog.component.html'
})
export class OrganizationDialogComponent implements OnInit {

  members: UserInterface[] = []

  constructor(
    public dialogRef: MdDialogRef<OrganizationDialogComponent>,
    private api: ApiZetalk,
    private conversation : ApiConversation) {

  }

  ngOnInit() {
    this.api
        .getOrganization()
        .then((result) => this.onGetOrganisation(result))
  }

  onGetOrganisation({ organization }) {
    console.debug('OrganizationDialogComponent::onGetOrganisation', organization)
    for (let member of organization.members) {
      const { login, email, userKey, firstname, lastName, online } = member
      this.members.push(new UserClass({
        id:userKey,
        login,
        firstname:firstname? firstname : userKey
      }))
    }
  }
}
