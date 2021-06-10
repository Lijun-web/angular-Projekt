import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Lyric, PersonalizedSong, Song} from "../../services/data-types/common.types";
import {forkJoin, Observable} from "rxjs";
import {SheetService} from "../../services/sheet.service";
import {SongService} from "../../services/song.service";
import {first} from "rxjs/operators";

type SongDataModel = [Song, Lyric];

@Injectable()
export class SongInfoResolverService implements Resolve<SongDataModel> {
  constructor(private songServe: SongService) {
  }
  resolve(route: ActivatedRouteSnapshot): Observable<SongDataModel> {
    let id = route.paramMap.get('id');
    if (!id) {
      id = '';
    }
    return forkJoin([
      this.songServe.getSongDetail(id),
      this.songServe.getLyric(Number(id))
    ]).pipe(first()); //only get data stream for one time
  }

}
