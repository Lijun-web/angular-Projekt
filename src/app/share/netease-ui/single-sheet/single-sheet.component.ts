import {ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-single-sheet',
  templateUrl: './single-sheet.component.html',
  styleUrls: ['./single-sheet.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleSheetComponent implements OnInit {

  @Input() sheet: any;
  @Output() onPlay = new EventEmitter<number>(); //emit接收number类型参数
  constructor() { }

  ngOnInit(): void {
  }

  playSheet(id: number) {
    this.onPlay.emit(id);
  }

  get coverImg(): string {
    // console.log('picurl:', this.sheet.picUrl || this.sheet.coverImgUrl);
    return this.sheet.picUrl || this.sheet.coverImgUrl;
  }

}
