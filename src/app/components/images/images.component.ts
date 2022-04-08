import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.sass']
})
export class ImagesComponent /* implements OnInit */ {

  @Input() images: string[] = [];
  constructor() { }
/*
  ngOnInit(): void {
  } */

}
