import welcome from '@/utils/welcome';
import { appBuilder } from '@spryker-oryx/application';
import { ExperienceStaticData, colorPalette } from '@spryker-oryx/experience';
import { labsFeatures } from '@spryker-oryx/labs';
import { storefrontFeatures } from '@spryker-oryx/presets';
import { BASE_ROUTE } from '@spryker-oryx/router';
import { storefrontTheme } from '@spryker-oryx/themes';
import { productAvailabilityComponent } from './components/availability/availability.def';

appBuilder()
  .withFeature(storefrontFeatures)
  .withFeature(labsFeatures)
  .withFeature({ providers: [{ provide: BASE_ROUTE, useValue: '/page-3' }] })
  .withFeature({
    providers: [
      {
        provide: ExperienceStaticData,
        useValue: [
          { id: 'header', type: 'Page' },
          { id: 'footer', type: 'Page' },
        ],
      },
    ],
  })
  .withFeature({ components: [productAvailabilityComponent] })
  .withTheme(storefrontTheme)
  .withTheme({
    designTokens: [
      {
        color: {
          primary: colorPalette.colors.sky,
          secondary: colorPalette.colors.crimson,
        },
      },
    ],
  })
  .withAppOptions({ components: { root: 'body' } })
  .withEnvironment(import.meta.env)
  .create();

// Root contains the main dependencies and providers of the base app
//  - React, ReactDom, RecoilRoot, HelmetProvider, ThemeProvider, MUI-core)
// App contains the main structure of the base app

// These are the two main chunks that are used to render the core structure of the app
// Importing them with Promise.all (by using HTTP/2 multiplexing) we can load them in parallel
// and achieve the best possible performance

Promise.all([import('@/Root'), import('@/App')]).then(([{ default: render }, { default: App }]) => {
  render(App);
});

// welcome message for users in the console
welcome();

// ts(1208)
export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [name: string]: unknown;
    }
  }
}
