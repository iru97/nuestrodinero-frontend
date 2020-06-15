import { Injectable } from '@angular/core';
import { AppState, defaultState } from './app.state';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStoreService {
  // private appState: AppState = defaultState();
  private appState: BehaviorSubject<AppState> = new BehaviorSubject<AppState>(
    defaultState()
  );

  appState$: Observable<AppState> = this.appState.asObservable();
  private isBlocked: boolean = false;

  constructor() {}

  setState(state: AppState) {
    this.appState.next({ ...state });
  }

  getState(): AppState {
    return { ...this.appState.value };
  }

  blockTransferState(): void {
    this.isBlocked = true;
  }

  isTransferStateBlocked(): boolean {
    return this.isBlocked;
  }
}
