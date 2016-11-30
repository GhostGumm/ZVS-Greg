import { Component, OnInit, trigger, HostBinding, ViewChild, ElementRef } from '@angular/core'
import { MdDialogRef } from '@angular/material'
import { Animations } from '../../../utils/utils.animation'
import { MessageInterface } from './../../../services'

interface CSSStyleDeclarationExtended extends CSSStyleDeclaration {
  objectFit: string
}

@Component({
  selector: 'zp-gallery',
  styleUrls: ['./gallery.component.scss'],
  templateUrl: './gallery.component.html',
  animations: [
    trigger('routeAnimation', Animations.slideUpDown),
    trigger('fadeInAnimation', Animations.fadeIn)
  ]
})
export class GalleryComponent implements OnInit {
  public files: Array<any>
  public selected: MessageInterface
  private index: number
  private hasPrevious: boolean = false
  private hasNext: boolean = false
  private loading: boolean = true

  @ViewChild('imageRef') imageRef: ElementRef // image dom ref

  constructor(
    public dialogRef: MdDialogRef<GalleryComponent>
  ) {

  }

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  ngOnInit() {
    console.debug('GalleryComponent::ngOnInit', {
      files: this.files
    })
    this.index = this.files.indexOf(this.selected)
    this.checkAvailable()
  }

  checkAvailable() {
    console.debug('GalleryComponent::checkAvailable', this.index, this.files.length)
    this.loading = true
    this.index > 0 ? this.hasPrevious = true : this.hasPrevious = false
    this.index < this.files.length - 1 ? this.hasNext = true : this.hasNext = false
  }

  previous() {
    this.index--
    this.selected = this.files[this.index]
    this.checkAvailable()
  }
  next() {
    this.index++
    this.selected = this.files[this.index]
    this.checkAvailable()
  }

  download() {
    console.debug('GalleryComponent::download')
    let link = document.createElement('a')
    link.href = `${this.selected.value}/?download=true` // &name=${message.extra.name}
    if (typeof link.download === 'string') {
      link.setAttribute('download', this.selected.value)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      console.warn(link)
    } else {
      window.open(link.href)
    }
  }

  onLoad() {
    console.debug('GalleryComponent::onLoad')
    this.loading = false
  }

  print() {
    console.debug('GalleryComponent::print')
    const width = window.innerWidth
    const height = window.innerHeight
    const options = `
      toolbar=no,location=no,directories=no,menubar=no,scrollbars=yes,
      width=${width * 0.8},height=${height * 0.8},
      top:${width * 0.1}, left:${height * 0.1}
    `
    const popup = window.open('', 'PRINT', options)

    popup.document.write(`<html><head><title>${document.title}</title>`)
    popup.document.write('</head><body >')
    popup.document.write(`<h1>${document.title}</h1>`)
    const image = new Image()
    image.src = this.selected.value
    // Typescript issue with unknown attr...
    const style: CSSStyleDeclarationExtended = image.style as CSSStyleDeclarationExtended
    style.maxWidth = '100%'
    popup.document.write(image.outerHTML)
    popup.document.write('</body></html>')
    popup.document.close() // necessary for IE >= 10
    popup.focus() // necessary for IE >= 10*/
    popup.print()
    popup.close()

    return true
  }

  share() {
    console.debug('GalleryComponent::share')
  }

  close() {
    this.dialogRef.close()
  }
}


