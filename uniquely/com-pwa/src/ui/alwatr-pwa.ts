import {html, customElement} from '@alwatr/element';
import '@alwatr/font/vazirmatn.css';
import {AlwatrPwaElement} from '@alwatr/pwa-helper/pwa-element.js';
import '@alwatr/ui-kit/style/mobile-only.css';
import '@alwatr/ui-kit/style/theme/color.css';
import '@alwatr/ui-kit/style/theme/palette-270.css';

import './page/home.js'; // for perf
import './stuff/app-footer.js';
import {topAppBarContextProvider} from '../manager/context.js';

import type {RoutesConfig} from '@alwatr/router';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-pwa': AlwatrPwa;
  }
}

/**
 * Alwatr PWA Root Element
 */
@customElement('alwatr-pwa')
class AlwatrPwa extends AlwatrPwaElement {
  protected override _routesConfig: RoutesConfig = {
    routeId: (routeContext) => routeContext.sectionList[0]?.toString(),
    templates: {
      'home': () => {
        // import('./page/home.js');
        return html`<alwatr-page-home unresolved>...</alwatr-page-home>`;
      },
      '_404': () => {
        import('./page/404.js');
        return html`<alwatr-page-404 unresolved>...</alwatr-page-404>`;
      },
      'order-list': () => {
        topAppBarContextProvider.setValue({headlineKey: 'loading'});
        import('./page/order-list.js');
        return html`<alwatr-page-order-list unresolved>...</alwatr-page-order-list>`;
      },
      'order-detail': (routeContext) => {
        topAppBarContextProvider.setValue({headlineKey: 'loading'});
        import('./page/order-detail.js');
        return html`<alwatr-page-order-detail
          .orderId=${+routeContext.sectionList[1]}
          unresolved>...</alwatr-page-order-detail>`;
      },
      'order-tracking': (routeContext) => {
        topAppBarContextProvider.setValue({headlineKey: 'loading'});
        import('./page/order-tracking.js');
        return html`<alwatr-page-order-tracking
          .orderId=${+routeContext.sectionList[1]}
          unresolved>...</alwatr-page-order-tracking>`;
      },
      'new-order': () => {
        topAppBarContextProvider.setValue({headlineKey: 'loading'});
        import('./page/new-order.js');
        return html`<alwatr-page-new-order unresolved>...</alwatr-page-new-order>`;
      },
    },
  };

  protected override _navigationBarTemplate(): unknown {
    return html`<alwatr-app-footer></alwatr-app-footer>`;
  }
}