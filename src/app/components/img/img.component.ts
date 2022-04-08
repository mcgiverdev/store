import {
  Component, Input, Output, EventEmitter,
  /* OnChanges, AfterViewInit, OnDestroy, SimpleChanges, OnInit, */
} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.sass']
})
export class ImgComponent /* implements OnInit, OnChanges, AfterViewInit, OnDestroy */ {

  img: string = '';

  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    /* console.log('change just img =>', this.img) */
  }
  @Output() loaded = new EventEmitter<string>();
  imgDefault: string = "./assets/images/default.png"
  counter: number = 0;
  counterFn: number | undefined;
  constructor() {
    // before rendering
    // NO async -- once time
    /* console.log('constructor', 'imgValue =>', this.img) */
  }/*
  ngOnChanges(changes: SimpleChanges) {
    // before - during render
    // changes inputs -- times
    console.log('ngOnChanges', 'imgValue =>', this.img)
    console.log('changes', changes)
  }
  ngOnInit(): void {
    // before render
    // async - fetch -- once time
    console.log('ngOnInit', 'imgValue =>', this.img)
    this.counterFn = window.setInterval(() => {
      this.counter += 1
      console.log('run counter')
    }, 1000)
  }
  ngAfterViewInit(): void {
    // after render
    // handler children
     console.log('ngAfterViewInit')
  }
  ngOnDestroy(): void {
    // delete render
    console.log('ngOnDestroy')
    window.clearInterval(this.counterFn)
  } */
  imgError() {
    this.img = this.imgDefault;
  }
  imgLoaded() {
    console.log('loaded')
    this.loaded.emit(this.img)
  }

}
