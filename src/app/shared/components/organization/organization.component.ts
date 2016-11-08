import { Component, OnInit, ViewContainerRef } from '@angular/core'
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material'

import { ApiZetalk } from '../../../zetapush/api'

@Component({
  selector: 'zp-add-contact',
  template: `
    <button (click)="openDialog()" type="button" md-icon-button color="primary">
      <md-icon>add</md-icon>
    </button>
  `
})
export class OrganizationComponent implements OnInit {

  dialogRef: MdDialogRef<OrganizationDialogComponent>

  constructor(
    public dialog: MdDialog,
    public viewContainerRef: ViewContainerRef) { }

  openDialog() {
    const config = new MdDialogConfig()

    config.viewContainerRef = this.viewContainerRef

    this.dialogRef = this.dialog.open(OrganizationDialogComponent, config)

    this.dialogRef.afterClosed().subscribe((result) => {
      console.log('result: ' + result)
      this.dialogRef = null
    })
  }

  ngOnInit() {

  }
}

@Component({
  selector: 'zp-organization-dialog',
  template: `
    <ul>
      <li *ngFor="let member of members;">
        <span>{{member.login}}</span>
        <button type="button" (click)="dialogRef.close(member.userKey)">Start</button>
      </li>
    </ul>
  `
})
export class OrganizationDialogComponent implements OnInit {

  members: Array<any> = []

  constructor(public dialogRef: MdDialogRef<OrganizationDialogComponent>, private api: ApiZetalk) {}

  ngOnInit() {
    this.api
        .getOrganization()
        .then((result) => this.onGetOrganisation(result))
  }

  onGetOrganisation({ organization }) {
    console.debug('OrganizationDialogComponent::onGetOrganisation', organization)
    this.members = organization.members
  }
}
