import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ToastOptions } from './toast-options.interface';
import { AddToast, RemoveToast } from './toast.actions';
import { patch, append, removeItem } from '@ngxs/store/operators';

export interface ToastsStateModel {
 toasts: ToastOptions[];
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

  @Action(AddToast) addToast(ctx: StateContext<ToastsStateModel>, { toastOptions }: AddToast) {
    ctx.setState(
      patch({
        toasts: append([toastOptions]),
      }),
    );
  }

  @Action(RemoveToast) removeToast(ctx: StateContext<ToastsStateModel>, { toastOptions }: RemoveToast) {
    ctx.setState(
      patch({
        toasts: removeItem<ToastOptions>(toast => toast === toastOptions),
      }),
    );
  }

}
