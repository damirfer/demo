import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { delay, first, map, of, Subject, tap } from 'rxjs';
import { ParseLinkHeaders } from '../../shared/utils/parse-link-headers';
import { Pagination } from '../../shared/interfaces/pagination';

const baseUrl: string = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private paginationSubject = new Subject<Pagination>();


  getPagination() {
    return this.paginationSubject.asObservable();

  }

  getAll(pageNumber?: number, searchString?: string) {
    let queryParams = new HttpParams()

    if(pageNumber) {
      queryParams = queryParams.append("_page", pageNumber)
    }

    if(searchString) {
      queryParams = queryParams.append("q", searchString)
    }

    return this.http
      .get<User[]>(`${baseUrl}/users`, { observe: 'response' , params: queryParams })
      .pipe(
        tap(res =>
          this.paginationSubject.next(
            ParseLinkHeaders.parseHeaders(res.headers)
          )),
        map(res => res.body as User[] )
      );
  }

  getById(userId: string) {
    return this.http.get<User>(`${baseUrl}/users/${userId}`).pipe(first());
  }

  create(user: User){
    console.log(user);
    return this.http.post(`${baseUrl}/users`, user);
  }

  update(userId: string, user: Partial<User>) {
    return this.http.patch(`${baseUrl}/users/${userId}`, user)
  }

  delete(userId: number) {
    return this.http.delete(`${baseUrl}/users/${userId}`).pipe(
      delay(1000)
    )
  }
}
