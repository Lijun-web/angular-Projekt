import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {SingerDetail} from "../../../services/data-types/common.types";
import {Observable} from "rxjs";
import {SingerService} from "../../../services/singer.service";


@Injectable()
export class SingerResolverService implements Resolve<SingerDetail> {
  constructor(private singerServe: SingerService) {
  }
  resolve(route: ActivatedRouteSnapshot): Observable<SingerDetail> {
    let id = route.paramMap.get('id');
    if (!id) {
      id = '';
    }
    return this.singerServe.getSingerDetail(id);
  }

}
