//防止数据还没加载出来组件就加载出来的情况，提高用户体验
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { SingerService } from 'src/app/services/singer.service';
import {Banner, Singer, HotTag, PersonalizedSong} from '../../services/data-types/common.types';
import { Observable, forkJoin } from 'rxjs';
import { first } from 'rxjs/internal/operators';

type HomeDataType = [Banner[], HotTag[], PersonalizedSong[], Singer[]];

@Injectable()
export class HomeResolverService implements Resolve<HomeDataType> {
  constructor(
    private homeServe: HomeService,
    private singerServe: SingerService,
  ) {}
  resolve(): Observable<HomeDataType> {
    return forkJoin([ //获取流数据并将他们发射出去
      this.homeServe.getBanners(),
      this.homeServe.getHotTags(),
      this.homeServe.getPersonalizedSongs(),
      this.singerServe.getSettledSingers()
    ]).pipe(first()); //只取第一个流
  }
}
