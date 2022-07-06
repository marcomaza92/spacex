import FavoritesProvider from 'context/favorites';
import LaunchesProvider from 'context/launches';
import RocketsProvider from 'context/rockets';
import SearchProvider from 'context/search';
import SectionsProvider from 'context/sections';
import type { AppProps } from 'next/app';
import '../global.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LaunchesProvider>
      <RocketsProvider>
        <FavoritesProvider>
          <SearchProvider>
            <SectionsProvider>
              <Component {...pageProps} />
            </SectionsProvider>
          </SearchProvider>
        </FavoritesProvider>
      </RocketsProvider>
    </LaunchesProvider>
  )
};
