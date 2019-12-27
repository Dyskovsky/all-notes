import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Toast } from './toast.interface';
import { AddToast, RemoveToast } from './toast.actions';
import { patch, append, removeItem } from '@ngxs/store/operators';

export interface ToastsStateModel {
 toasts: Toast[];
}

@State<ToastsStateModel>({
  name: 'toasts',
  defaults: {
    toasts: [],
  },
})
export class ToastsState {
  @Selector() static toasts(state: ToastsStateModel) {
    return state.toasts;
  }

  @Action(AddToast) addToast(ctx: StateContext<ToastsStateModel>, { toast }: AddToast) {
    ctx.setState(
      patch({
        toasts: append([toast]),
      }),
    );
  }

  @Action(RemoveToast) removeToast(ctx: StateContext<ToastsStateModel>, { toast }: RemoveToast) {
    ctx.setState(
      patch({
        toasts: removeItem<Toast>(t => t === toast),
      }),
    );
  }

}
