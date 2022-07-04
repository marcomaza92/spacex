import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import { getRockets } from '@/api/rockets';
import { getLaunches } from '@/api/launches';

const Header = () => {
  const [launches, setLaunches] = useState([]);
  const [rockets, setRockets] = useState([]);
  useEffect(() => {
    getLaunches().then((responseLaunches) => {
      getRockets().then((responseRockets) => {
        setRockets(responseRockets);
        responseLaunches.forEach(launch => {
          responseRockets.forEach(rocket => {
            if (launch.rocket.rocket_id === rocket.rocket_id)
            launch.rocket = Object.assign(launch.rocket, rocket);
          });
        });
      });
      setLaunches(responseLaunches);
    });
    
  }, []);
  console.log(launches);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerLogo}>
          <img src='/logo.svg' alt='SpaceX Logo' />
        </div>
        <h1 className={styles.headerTitle}>Launches</h1>
        <div className={styles.headerTabs}>
          <div className={`${styles.headerTab} ${styles.activeTab}`}>
            <button className={styles.headerTabButton}>All</button>
          </div>
          <div className={styles.headerTab}>
            <button className={styles.headerTabButton}>Favorites</button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.search}>
          <div className={styles.searchBar}>
            <div className={styles.searchIcon}>
              <img src='/icon-search.svg' alt='Search' />
            </div>
            <input className={styles.searchInput} placeholder='Search all launches...' />
          </div>
        </section>
        {launches && launches === [] ? (
          <p>Loading...</p>
        ) : (
          <section className={styles.content}>
            <h3 className={styles.contentCount}>Total ({launches.length})</h3>
            {launches.map(({ mission_name, launch_date_utc, details, links }, index) => (
              <div key={index} className={styles.launchCard}>
                <div className={styles.launchImage}>
                  <img src={links.mission_patch} alt='Rocket' />
                </div>
                <div className={styles.launchContent}>
                  <p>{launch_date_utc}</p>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </>
  )
}

export default Header;
