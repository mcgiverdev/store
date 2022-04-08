import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`
  constructor(private http: HttpClient, private tokenService: TokenService) { }
  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, { email: email, password: password })
      .pipe(
        tap(response => this.tokenService.saveToken(response.access_token))
      )
  }
  loginAndReturnProfile(email: string, password: string) {
    return this.login(email, password)
      .pipe(
        switchMap(response => this.profile())
      )
  }
  profile() {
    /* const headers = new HttpHeaders();
    headers.set('Authorization', `Bearer ${token}`) */
    return this.http.get<User>(`${this.apiUrl}/profile`)
  }
}
