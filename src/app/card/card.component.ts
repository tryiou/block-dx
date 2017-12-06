import { Component, OnInit, Input, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'bn-card',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./card.component.scss'],
  template: `
    <div #card class="bn-card {{cardClass}}">
      <div class="bn-card__title {{cardTitleClass}}">
        <ng-content select="bn-card-title"></ng-content>
        <a class="fullscreen" *ngIf="allowFullscreen"
          (click)="goFullscreen()">
          <i *ngIf="!isFullscreen" class="material-icons">zoom_out_map</i>
          <i *ngIf="isFullscreen" class="material-icons">close</i>
        </a>
      </div>
      <div class="bn-card__body">
        <ng-content select="bn-card-body"></ng-content>
      </div>
    </div>
  `
})
export class CardComponent implements OnInit {
  @Input() cardClass: string;
  @Input() cardTitleClass: string;
  @Input() allowFullscreen: boolean = true;

  @ViewChild('card') public card: ElementRef;

  public isFullscreen: boolean;

  constructor() { }

  ngOnInit() {
    if (this.allowFullscreen && document.addEventListener) {
      document.addEventListener('webkitfullscreenchange', this.fullscreenHandler.bind(this), false);
      document.addEventListener('mozfullscreenchange', this.fullscreenHandler.bind(this), false);
      document.addEventListener('fullscreenchange', this.fullscreenHandler.bind(this), false);
      document.addEventListener('MSFullscreenChange', this.fullscreenHandler.bind(this), false);
    }
  }

  ngOnDestroy() {
    if (this.allowFullscreen && document.removeEventListener) {
      document.removeEventListener('webkitfullscreenchange', this.fullscreenHandler.bind(this), false);
      document.removeEventListener('mozfullscreenchange', this.fullscreenHandler.bind(this), false);
      document.removeEventListener('fullscreenchange', this.fullscreenHandler.bind(this), false);
      document.removeEventListener('MSFullscreenChange', this.fullscreenHandler.bind(this), false);
    }
  }

  fullscreenHandler(e) {
    if ((document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document['mozFullScreenElement'] && document['mozFullScreenElement'] !== null) ||
        (document['msFullscreenElement'] && document['msFullscreenElement'] !== null)) {
      this.isFullscreen = true;
    } else {
      this.isFullscreen = false;
    }
  }

  goFullscreen() {
    if (!this.allowFullscreen) return;

    if (!this.isFullscreen) {
      if (this.card.nativeElement.requestFullscreen) {
        this.card.nativeElement.requestFullscreen();
      } else if (this.card.nativeElement.msRequestFullscreen) {
        this.card.nativeElement.msRequestFullscreen();
      } else if (this.card.nativeElement.mozRequestFullScreen) {
        this.card.nativeElement.mozRequestFullScreen();
      } else if (this.card.nativeElement.webkitRequestFullscreen) {
        this.card.nativeElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document['webkitExitFullscreen']) {
        document['webkitExitFullscreen']();
      } else if (document['mozCancelFullScreen']) {
        document['mozCancelFullScreen']();
      } else if (document['msExitFullscreen']) {
        document['msExitFullscreen']();
      }
    }

    // this.isFullscreen = !this.isFullscreen;
  }

}
