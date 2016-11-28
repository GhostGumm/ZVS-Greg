import { Component, OnInit, trigger, HostBinding } from '@angular/core'
import { MdDialogRef } from '@angular/material'
import { Animations } from '../../../utils/utils.animation'

@Component({
  selector: 'zp-gallery',
  styleUrls: ['./gallery.component.scss'],
  templateUrl: './gallery.component.html',
  animations: [
    trigger('routeAnimation', Animations.slideUpDown)
  ]
})
export class GalleryComponent implements OnInit {
  public images: Array<any>
  public selected: string
  private index: number
  private hasPrevious: boolean = false
  private hasNext: boolean = false
  constructor(
    public dialogRef: MdDialogRef<GalleryComponent>
  ) {

  }

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  ngOnInit() {
    console.debug('GalleryComponent::ngOnInit', {
      images: this.images
    })
    this.index = this.images.indexOf(this.selected)
    this.checkAvailable()
  }

  checkAvailable() {
    console.debug('GalleryComponent::checkAvailable', this.index, this.images.length)
    this.index > 0 ? this.hasPrevious = true : this.hasPrevious = false
    this.index < this.images.length - 1 ? this.hasNext = true : this.hasNext = false
  }

  previous() {
    this.index--
    this.selected = this.images[this.index]
    this.checkAvailable()
  }
  next() {
    this.index++
    this.selected = this.images[this.index]
    this.checkAvailable()
  }

  download() {
    console.debug('GalleryComponent::download')
    window.open(this.selected, '_blank')
  }

  print() {
    console.debug('GalleryComponent::print')

  }

  share() {
    console.debug('GalleryComponent::share')

  }

  close() {
    this.dialogRef.close()
  }
}
