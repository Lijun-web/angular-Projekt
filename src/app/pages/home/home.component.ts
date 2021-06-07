import {Component, OnInit, ViewChild} from '@angular/core';
import {HomeService} from "../../services/home.service";
import {Banner, HotTag, PersonalizedSong, Singer} from "../../services/data-types/common.types"
import {NzCarouselComponent} from "ng-zorro-antd/carousel";
import {SingerService} from "../../services/singer.service";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {SheetService} from "../../services/sheet.service";
import {AppStoreModule} from "../../store";
import {select, Store} from "@ngrx/store";
import {SetCurrentIndex, SetPlayList, SetSongList} from "../../store/actions/player.action";
import {PlayState} from "../../store/reducers/player.reducer";
import {shuffle} from "../../utils/array";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  // bannersJson: any;
  banners: Banner[];
  hotTags: HotTag[];
  personalizedSongs: PersonalizedSong[];
  settledSingers: Singer[];
  carouselActiveIndex = 0;
  private playState: PlayState | undefined;

  @ViewChild(NzCarouselComponent, {static: true}) private nzCarousel: any;

  constructor(
    // private homeServe: HomeService,
    // private singerServe: SingerService,
    private route: ActivatedRoute,
    private sheetServe: SheetService,
    private store$: Store<AppStoreModule>
  ) {
    //构造器中初始化
    this.banners = [];
    this.hotTags = [];
    this.personalizedSongs = [];
    this.settledSingers = [];
    //data返回route中配置的所有数据
    this.route.data.pipe(map(data => data.homeDatas)).subscribe(
      ([banners, hotTags, personalizedSongs, settledSingers]) => {
      this.banners = banners;
      this.hotTags = hotTags;
      this.personalizedSongs = personalizedSongs;
      this.settledSingers = settledSingers;
    });
    //get the playstate of player
    // @ts-ignore
    this.store$.pipe(select('player')).subscribe(res => this.playState = res);

  }

  ngOnInit(): void {
    // this.getBanners();
    // this.getHotTags();
    // this.getPersonalizedSongs();
    // this.getSingers();

  }

  // private getBanners(){
  //   this.homeServe.getBanners().subscribe(banners => {
  //     this.banners = banners;
  //   })
  // }
  //
  // private getHotTags(){
  //   this.homeServe.getHotTags().subscribe(tags => {
  //     this.hotTags = tags;
  //   })
  // }
  //
  // private getPersonalizedSongs(){
  //   this.homeServe.getPersonalizedSongs().subscribe(personalizedSongs => {
  //     this.personalizedSongs = personalizedSongs;
  //   })
  // }
  //
  // private getSingers() {
  //   this.singerServe.getSettledSingers().subscribe(settledSingers => {
  //     this.settledSingers = settledSingers;
  //   })
  // }

  onBeforeChange({to}: any) {
    this.carouselActiveIndex = to;
  }

  onChangeSlide(type: 'pre' | 'next'){
    this.nzCarousel[type](); //调用轮播图组件的pre或者next方法
  }

  onPlaySheet(id: number) {
    console.log('id', id);
    this.sheetServe.playSheet(id).subscribe(list => {
      //after these three function the value of PlayState in reducer will be changed and a new State will be returned
      this.store$.dispatch(SetSongList({ songList: list }));

      let trueIndex = 0;
      let trueList = list.slice();

      if (this.playState?.playMode.type === 'random') {
        trueList = shuffle(list || []);
        trueIndex = trueList.findIndex(item => item.id === list[trueIndex].id);
      }
      this.store$.dispatch(SetPlayList({ playList: trueList }));
      this.store$.dispatch(SetCurrentIndex({ currentIndex: 0 }));
    })
  }


}
