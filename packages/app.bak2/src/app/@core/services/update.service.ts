import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { interval, Observable } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import { environment } from '../../../environments/environment'
import { Build } from '../models/enviroment'

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  url = '/build.json'
  interval = 20000

  status$: Observable<boolean>

  constructor (
    private http: HttpClient
  ) {
    this.status$ = interval(this.interval).pipe(
      switchMap(() => {
        return this.http.get<Build>(this.url).pipe(
          catchError(() => null)
        )
      }),
      map((build: Build) => {
        if (!build) return false
        return environment.build.date < build.date
      })
    )
  }

}
