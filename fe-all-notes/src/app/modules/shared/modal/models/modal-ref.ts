import { Subject, Observable } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';

export class ModalRef<T, R> {
  private result: R;
  private readonly afterClosedSubject$ = new Subject<R | undefined>();

  constructor(private overlayRef: OverlayRef) {

    overlayRef.detachments().subscribe(() => {
      // this._beforeClosed.next(this._result);
      // this._beforeClosed.complete();
      this.afterClosedSubject$.next(this.result);
      this.afterClosedSubject$.complete();
      this.componentInstance = null;
      this.overlayRef.dispose();
    });
  }
  componentInstance: T;
  testValue: any;

  close(dialogResult?: R): void {
    this.result = dialogResult;
    this.overlayRef.detachBackdrop();
    setTimeout(() => this.overlayRef.dispose(), 100);
  }

  afterClosed(): Observable<R | undefined> {
    return this.afterClosedSubject$.asObservable();
  }

}
