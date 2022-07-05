import { LaunchesContext } from 'context/launches';
import { SearchContext } from 'context/search';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import styles from './Content.module.scss';

const Content = () => {
  const { launches } = useContext(LaunchesContext);
  const { options, setOptions } = useContext(SearchContext);

  const [favorites, setFavorites] = useState([]);

  const handleFavorites = (launch) => {
    if (favorites.includes(launch)) {
      setFavorites(favorites.filter((item) => item.flight_number !== launch.flight_number))
    } else {
      setFavorites(favorites.concat([launch]));
    };
  };

  console.log(favorites);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <main className={styles.main}>
      {launches && launches === [] ? (
        <p>Loading...</p>
      ) : (
        <section className={styles.content}>
          <h3 className={styles.contentCount}>Total ({launches.length})</h3>

          {launches.filter(launch => launch.mission_name.includes(options.searchValue)).map((launch, index) => (
            <div key={index} className={styles.launchCard}>
              <button onClick={() => handleFavorites(launch)}>Add to Favorites</button>
              <div className={styles.launchImage}>
                <img src={launch.rocket.flickr_images[0]} loading='lazy' alt='Rocket' />
              </div>
              <div className={styles.launchContent}>
                <Link key={index} href={{
                  pathname: `/launch/[id]`,
                  query: {
                    id: launch.flight_number
                  }
                }}>
                  <a>{launch.mission_name}</a>
                </Link>
                <h3>{launch.mission_name}</h3>
                <p>{launch.details}</p>
                <p>{launch.launch_date_utc}</p>
              </div>
            </div>
          ))}

        </section>
      )}
    </main>
  )
}

export default Content;
