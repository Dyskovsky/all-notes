import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import {
  from,
  of,
  Observable,
  BehaviorSubject,
  combineLatest,
  throwError,
} from 'rxjs';
import { tap, catchError, concatMap, shareReplay, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ClientConfigApiService } from '../api/client-config/client-config-api.service';
import { toAuth0ClientOptions } from './utils';
import { ToastService } from '../shared/toaster/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth0Client$ = this.clientConfigApiService.getConfig().pipe(
    map(toAuth0ClientOptions),
    switchMap(auth0ClientOptions => from(createAuth0Client(auth0ClientOptions)) as Observable<Auth0Client>),
    shareReplay(1), // Every subscription receives the same shared value
    catchError(err => {
      if (err instanceof HttpErrorResponse) {
        this.toastService.error({ title: 'Authroziation error', body: err.message });
      } else {
        this.toastService.error({ title: 'Authorization error', body: JSON.stringify(err || {})});
      }
      return throwError(err);
    }),
  );
  // For each Auth0 SDK method, first ensure the client instance is ready
  isAuthenticated$: Observable<boolean> = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => (this.loggedIn = res)),
  );
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback())),
  );
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  // Create a local property for login status
  loggedIn: boolean = null;

  constructor(
    private router: Router,
    private clientConfigApiService: ClientConfigApiService,
    private toastService: ToastService,
  ) { }

  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => this.userProfileSubject$.next(user)),
    );
  }

  localAuthSetup() {
    // This should only be called on app initialization
    // Set up local authentication streams
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn) => loggedIn ? this.getUser$() : of(loggedIn)),
    );
    checkAuth$.subscribe();
  }

  login(redirectPath: string = '/') {
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log in
      client.loginWithRedirect({
        redirect_uri: `${window.location.origin}`,
        appState: { target: redirectPath },
      });
    });
  }

  handleAuthCallback() {
    // Call when app reloads after user logs in with Auth0
    const params = window.location.search;
    if (params.includes('code=') && params.includes('state=')) {
      let targetRoute: string; // Path to redirect to after login processsed
      const authComplete$ = this.handleRedirectCallback$.pipe(
        // Have client, now call method to handle auth callback redirect
        tap(cbRes => {
          // Get and set target redirect route from callback results
          targetRoute =
            cbRes.appState && cbRes.appState.target
              ? cbRes.appState.target
              : '/';
        }),
        concatMap(() => combineLatest([this.getUser$(), this.isAuthenticated$])),
      );
      authComplete$.subscribe(([user, loggedIn]) => {
        // Redirect to target route after callback processing
        this.router.navigate([targetRoute]);
      });
    }
  }

  logout() {
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log out
      client.logout({
        client_id: 'Q3bjtMILZBYNZh2IB54BKMT4eXzaba3X', // to configure
        returnTo: `${window.location.origin}`,
      });
    });
  }

  getTokenSilently$(options?): Observable<string> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getTokenSilently(options))),
    );
  }
}
