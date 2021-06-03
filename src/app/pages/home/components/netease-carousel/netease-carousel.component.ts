import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-netease-carousel',
  templateUrl: './netease-carousel.component.html',
  styleUrls: ['./netease-carousel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NeteaseCarouselComponent implements OnInit {
  @Input() activeIndex = 0;
  @Output() changeSlide = new EventEmitter<'pre' | 'next'>();
  @ViewChild('dot', {static: true}) dotRef: any;

  constructor() {

  }

  ngOnInit(): void {
  }

  onChangeSlide(type: 'pre' | 'next'){
    this.changeSlide.emit(type); //数据将发送给home组件
  }


}
