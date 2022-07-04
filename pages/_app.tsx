import LaunchesProvider from 'context/launches';
import RocketsProvider from 'context/rockets';
import type { AppProps } from 'next/app';
import '../global.scss';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LaunchesProvider>
      <RocketsProvider>
        <Component {...pageProps} />
      </RocketsProvider>
    </LaunchesProvider>
  )
};
