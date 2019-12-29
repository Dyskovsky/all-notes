import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dk-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {

  @Input() contentTrigger: any;

  get isLoading(): boolean {
    return !this.contentTrigger;
  }
}
