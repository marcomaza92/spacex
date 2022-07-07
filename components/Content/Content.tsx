import { FavoritesContext } from 'context/favorites';
import { LaunchesContext } from 'context/launches';
import { SearchContext } from 'context/search';
import { SectionsContext } from 'context/sections';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import styles from './Content.module.scss';

const Content = () => {
  const { launches, setLaunches } = useContext(LaunchesContext);
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const { options } = useContext(SearchContext);
  const { sections } = useContext(SectionsContext);
  
  const handleFavorites = (launch) => {
    let currentList = [];
    if (sections.main === 'all') {
      currentList = favorites;
    } else {
      currentList = launches;
    }
    const newLaunch = Object.assign(launch, {
      ...launch,
      isFavorite: !launch.isFavorite,
    });
    if (currentList.includes(launch)) {
      if (sections.main === 'all') {
        setFavorites(currentList.filter((item) => item.flight_number !== newLaunch.flight_number));
      } else {
        setLaunches(currentList.filter((item) => item.flight_number !== newLaunch.flight_number));
      }
    } else {
      setFavorites(currentList.concat([newLaunch]));
    };
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  console.log(launches);

  return (
    <main className={styles.main}>
      {launches && launches === [] ? (
        <div className='loader'></div>
      ) : (
          options.results === 0 ? (
            <div className={styles.contentEmpty}>
              <h3 className={styles.contentEmptyTitle}>You have no favorites yet!</h3>
              <h4 className={styles.contentEmptySubtitle}>Flight back and add some!</h4>
            </div>
          ) : (
            <>
              <h3 data-testid="total-launches" className={styles.contentCount}>Total ({options.results === null ? launches.length : options.results})</h3>
              <section className={styles.content}>
                {launches.filter(launch => launch.mission_name.includes(options.searchValue)).map((launch, index) => (
                  <div key={index} className={styles.launchCard}>
                    <Link key={index} href={{
                      pathname: `/launch/[id]`,
                      query: {
                        id: launch.flight_number
                      }
                    }}>
                      <div className={styles.launchImage}>
                        <img src={launch.rocket.flickr_images[0]} loading='lazy' alt='Rocket' />
                      </div>
                    </Link>
                    <div className={styles.launchContent}>
                      <h3 className={styles.launchName}>{launch.mission_name}</h3>
                      <p className={styles.launchDetails}>{launch.details === null ? 'No summary available' : launch.details}</p>
                      <div className={styles.launchDateAndFavs}>
                        <p className={styles.launchDate}>{launch.launch_date_utc}</p>
                        <button className={styles.launchFavoritesButton} onClick={() => handleFavorites(launch)}>
                          <svg className={`${styles.launchStar} ${launch.isFavorite ? styles.isFavorite : ''}`} width="13" height="11" viewBox="0 0 13 11" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.26325 8.9678C6.41108 8.88833 6.58892 8.88833 6.73675 8.9678L9.50564 10.4563C9.89039 10.6631 10.3368 10.3118 10.2261 9.88923L9.53489 7.25028C9.48403 7.05612 9.55422 6.85036 9.71313 6.72774L11.9681 4.9878C12.3309 4.70784 12.1573 4.1279 11.7003 4.09337L8.6157 3.86027C8.43685 3.84676 8.27895 3.73849 8.20188 3.57654L6.95149 0.948815C6.77057 0.568602 6.22943 0.568602 6.04851 0.948815L4.79812 3.57654C4.72105 3.73849 4.56315 3.84676 4.3843 3.86027L1.29968 4.09337C0.842688 4.1279 0.669071 4.70784 1.03191 4.9878L3.28687 6.72774C3.44578 6.85036 3.51597 7.05612 3.46511 7.25028L2.77393 9.88922C2.66325 10.3118 3.10961 10.6631 3.49436 10.4563L6.26325 8.9678Z"/>
                          </svg>
                        </button>
                      </div>
                      
                    </div>
                  </div>
                ))}
              </section>
            </>
          )
      )}
    </main>
  )
}

export default Content;
