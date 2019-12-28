import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Toast } from './models/toast.interface';
import { AddToast, RemoveToast } from './models/toast.actions';
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
  private static toastIdCounter = 0;

  @Selector() static toasts(state: ToastsStateModel) {
    return state.toasts;
  }

  @Action(AddToast) addToast(ctx: StateContext<ToastsStateModel>, { dataOptions, viewOptions }: AddToast) {
    const toast: Toast = {
      id: ++ToastsState.toastIdCounter,
      dataOptions,
      viewOptions,
    };
    ctx.setState(
      patch({
        toasts: append([toast]),
      }),
    );
  }

  @Action(RemoveToast) removeToast(ctx: StateContext<ToastsStateModel>, { id }: RemoveToast) {
    ctx.setState(
      patch({
        toasts: removeItem<Toast>(toast => toast.id === id),
      }),
    );
  }
}
