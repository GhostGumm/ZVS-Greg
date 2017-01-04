import { Component, OnInit, trigger, HostBinding, ViewChild, ElementRef, NgZone } from '@angular/core'
import { MdDialogRef } from '@angular/material'
import { fadeIn, slideUpDown } from '../../../utils/utils.animation'
import { MessageInterface } from './../../../services'

// Typescript is magic they say..
interface CSSStyleDeclarationExtended extends CSSStyleDeclaration {
  objectFit: string
}

@Component({
  selector: 'zp-gallery',
  styleUrls: ['./gallery.component.scss'],
  templateUrl: './gallery.component.html',
  animations: [
    trigger('routeAnimation', slideUpDown),
    trigger('fadeInAnimation', fadeIn)
  ]
})
export class GalleryComponent implements OnInit {
  public files: Array<any>
  public selected: MessageInterface
  private index: number
  private hasPrevious: boolean = false
  private hasNext: boolean = false
  private loading: boolean = false

  @ViewChild('imageRef') imageRef: ElementRef // image dom ref

  constructor(
    public dialogRef: MdDialogRef<GalleryComponent>,
    private zone: NgZone
  ) {
    this.afterPdfLoaded = this.afterPdfLoaded.bind(this)
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
    console.debug('GalleryComponent::checkAvailable', {
      index: this.index,
      length: this.files.length,
      selected: this.selected
    })
    const { extension } = this.selected.metadata
    if (extension !== 'video') {
      this.loading = true
    }
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
    link.href = `${this.selected.value}/?download=true&name=${this.selected.metadata.name}`
    if (typeof link.download === 'string') {
      link.setAttribute('download', this.selected.value)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      window.open(link.href)
    }
  }

  onLoaded() {
    console.debug('GalleryComponent::onLoaded')
    setTimeout(() => {
      this.loading = false
    }, 100)
  }

  afterPdfLoaded(pdf) {
    console.debug('GalleryComponent::afterPdfLoaded', { pdf })
    this.onLoaded()
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



