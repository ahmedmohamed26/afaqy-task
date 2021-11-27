import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss'],
})
export class ImageLoaderComponent implements OnInit {
  @Input() image: string | undefined = '';
  @Input() width: string | undefined = '';
  @Input() height: string | undefined = '';
  @Input() objectFit: string | undefined = '';
  @Input() alt: string | undefined = '';
  @Input() class: string | undefined = '';
  @Output() loadError: EventEmitter<string> = new EventEmitter();
  @Output() loaded: EventEmitter<string> = new EventEmitter();
  placeHolderImage = 'assets/images/placeholder70.png';

  constructor() {}

  ngOnInit(): void {}

  onError(event: any): void {
    event.target.src = this.placeHolderImage;
    this.loadError.emit(this.placeHolderImage);
  }

  onLoad(): void {
    this.loaded.emit(this.image);
  }
}
