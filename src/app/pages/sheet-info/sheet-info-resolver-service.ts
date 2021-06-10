import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {PersonalizedSong} from "../../services/data-types/common.types";
import {Observable} from "rxjs";
import {SheetService} from "../../services/sheet.service";

@Injectable()
export class SheetInfoResolverService implements Resolve<PersonalizedSong> {
  constructor(private sheetServe: SheetService) {
  }
  resolve(route: ActivatedRouteSnapshot): Observable<PersonalizedSong> {
    return this.sheetServe.getSongSheetDetail(Number(route.paramMap.get('id')));
  }

}
