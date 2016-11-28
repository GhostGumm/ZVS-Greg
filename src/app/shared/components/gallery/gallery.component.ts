import { Component, OnInit, ViewContainerRef, ChangeDetectorRef } from '@angular/core'
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material'

@Component({
  selector: 'zp-gallery',
  styleUrls: ['./gallery.component.scss'],
  templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit {

  dialogRef: MdDialogRef<GalleryDialogComponent>

  constructor(
    public dialog: MdDialog,
    public viewContainerRef: ViewContainerRef) { }

  openDialog() {
    const config = new MdDialogConfig()

    config.viewContainerRef = this.viewContainerRef

    this.dialogRef = this.dialog.open(GalleryDialogComponent, config)

    this.dialogRef.afterClosed().subscribe((result) => {
      console.debug('GalleryComponent::dialogRef:afterClosed', { result })
      this.dialogRef = null
    })
  }

  ngOnInit() {}
}

@Component({
  selector: 'zp-gallery-dialog',
  styleUrls: ['./gallery.dialog.component.scss'],
  templateUrl: './gallery.dialog.component.html'
})
export class GalleryDialogComponent implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<GalleryDialogComponent>
  ) {

  }

  ngOnInit() {
    console.debug('GalleryDialogComponent::ngOnInit')
  }
}
