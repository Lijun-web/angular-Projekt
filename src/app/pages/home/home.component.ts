import {Component, OnInit, ViewChild} from '@angular/core';
import {HomeService} from "../../services/home.service";
import {Banner, HotTag, PersonalizedSong} from "../../services/data-types/common.types"
import {NzCarouselComponent} from "ng-zorro-antd/carousel";


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
  carouselActiveIndex = 0;

  @ViewChild(NzCarouselComponent, {static: true}) private nzCarousel: any;

  constructor(private homeServe: HomeService) {
    //构造器中初始化
    this.banners = [];
    this.hotTags = [];
    this.personalizedSongs = [];

  }

  ngOnInit(): void {
    this.getBanners();
    this.getHotTags();
    this.getPersonalizedSongs();

  }

  private getBanners(){
    this.homeServe.getBanners().subscribe(banners => {
      this.banners = banners;
    })
  }

  private getHotTags(){
    this.homeServe.getHotTags().subscribe(tags => {
      this.hotTags = tags;
    })
  }

  private getPersonalizedSongs(){
    this.homeServe.getPersonalizedSongs().subscribe(personalizedSongs => {
      this.personalizedSongs = personalizedSongs;
    })
  }

  onBeforeChange({to}: any) {
    this.carouselActiveIndex = to;
  }

  onChangeSlide(type: 'pre' | 'next'){
    this.nzCarousel[type](); //调用轮播图组件的pre或者next方法
  }



}
