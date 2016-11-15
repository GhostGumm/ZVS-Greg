import { Component, OnInit, ViewContainerRef } from '@angular/core'
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material'

import { ZetaPushClient } from './../../../zetapush';
import { UserService, UserInterface, UserClass } from '../../../services/'

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
    private apiConversation: ApiConversation,
    private client: ZetaPushClient) { }

  openDialog() {
    const config = new MdDialogConfig()

    config.viewContainerRef = this.viewContainerRef

    this.dialogRef = this.dialog.open(OrganizationDialogComponent, config)

    this.dialogRef.afterClosed().subscribe((result) => {
      console.debug('OrganizationComponent::dialogRef:afterClosed', { result })
      if (result) {
        // Create conversation for each checked user in result
        for (let user of result) {
          const { id, metadata:{ checked } } = user
          if (checked) {
            this.createConversation(id)
          }
        }
      }
      this.dialogRef = null
    })
  }

  ngOnInit() {}

  createConversation(interlocutor) {
    this.apiConversation
        .createOneToOneConversation({ interlocutor })
        .then(({ conversation }) => {
          console.debug('OrganizationComponent::onCreateOneToOneConversation', { conversation })
        }, (message) => {
          console.error('OrganizationComponent::onCreateOneToOneConversation', message)
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
  allUsers: boolean
  selected: number = 0

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
    this.members = organization.members.map((member) => {
      const { login, email, userKey, firstname = member.login, lastname } = member
      return new UserClass({
        id: userKey,
        login,
        firstname,
        lastname,
        metadata: {
          checked: false
        }
      })
    })
  }

  onMemberClicked(event) {
    console.debug('OrganizationDialogComponent::onMemberClicked', { event })
    let user = event.value
    user.metadata.checked = !user.metadata.checked
    this.userSelected(user)
  }

  selectAll() {
    const { allUsers, members } = this
    console.debug('OrganizationDialogComponent::selectAll', { allUsers })
    members.forEach(({ metadata }) => metadata.checked = allUsers ? true : false)
    this.selected = allUsers ? members.length : 0
  }

  userSelected(member: UserInterface) {
    console.debug('OrganizationDialogComponent::userSelected', { member })
    if (member.metadata.checked === true) {
      this.selected++
      if (this.selected === this.members.length) {
        this.allUsers = true
      }
    }
    else {
      this.selected--
      this.allUsers = false
    }
  }
}
