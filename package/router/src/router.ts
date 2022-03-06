import {hasSignalDispatchedBefore, requestSignal, setSignalProvider} from '@vatr/signal';
import {joinParameterList, log, routeSignalProvider} from './core';
import {clickTrigger} from './trigger-click';
import {popstateTrigger} from './trigger-popstate';
import type {InitOptions, Route} from './type';

/**
 * Initial and config the Router.
 */
export function initialRouter(options?: InitOptions): void {
  log('initialRouter: %o', options);
  clickTrigger.enable = options?.clickTrigger ?? true;
  popstateTrigger.enable = options?.popstateTrigger ?? true;

  setSignalProvider('router-change', routeSignalProvider, {debounce: true, receivePrevious: true});

  // first route request.
  if (!hasSignalDispatchedBefore('router-change')) {
    const {pathname, search, hash} = window.location;
    requestSignal('router-change', {pathname, search, hash, pushState: false});
  }
}

/**
 * Make anchor valid href from route.
 *
 * @example <a href=${ makeUrl({sectionList: ['product', 100]}) }>
 */
export function makeUrl(route: Partial<Route>): string {
  let href = '';

  if (route.sectionList != null) {
    // @TODO: handle <base> url.
    href += '/' + route.sectionList.join('/');
  }

  if (route.queryParamList != null) {
    href += '?' + joinParameterList(route.queryParamList);
  }

  if (route.hash) { // != null && !== ''
    if (route.hash.indexOf('#') !== 0) {
      route.hash += '#';
    }
    href += route.hash;
  }

  return href;
}