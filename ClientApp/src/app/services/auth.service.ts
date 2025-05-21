import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { CartService } from './cart.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor(private httpService: HttpService, private cartService: CartService, private router: Router) { }

  login(credentials: { username: string; password: string }) {
    return this.httpService.userAuth(credentials).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  register(credentials: { username: string; password: string; email: string }): Observable<string> {
    return this.httpService.userRegister(credentials);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.cartService.clearCart();
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      const payload: any = jwtDecode(token);
      return payload.admin === 'True';
    }
    return false;
  }

  getName(): string {
    const token = localStorage.getItem('authToken');
    if (token) {
      const payload: any = jwtDecode(token);
      return payload.name;
    }
    return '';
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
