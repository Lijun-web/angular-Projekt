import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NeteaseSliderStyle} from "./netease-slider-types";

@Component({
  selector: 'app-netease-slider-handle',
  template: `<div class="wy-slider-handle" [ngStyle]="style"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NeteaseSliderHandleComponent implements OnInit, OnChanges {

  @Input() neteaseVertical = false;
  @Input() neteaseOffset: number = 0;

  style: NeteaseSliderStyle = {};
  constructor() { }

  ngOnInit(): void {
  }

  //监听滑块偏移量的变化
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['neteaseOffset']){
      this.style[this.neteaseVertical ? 'bottom' : 'left'] = this.neteaseOffset + '%';
    }
  }

}
