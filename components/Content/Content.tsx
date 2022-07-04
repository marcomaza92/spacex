import { SearchContext } from 'context/search';
import { useContext } from 'react';
import styles from './Content.module.scss';

const Content = (props) => {
  const { launches } = props;
  const { options, setOptions } = useContext(SearchContext);
  return (
    <main className={styles.main}>
      {launches && launches === [] ? (
        <p>Loading...</p>
      ) : (
        <section className={styles.content}>
          <h3 className={styles.contentCount}>Total ({launches.length})</h3>
          {launches.filter(launch => launch.mission_name.includes(options.searchValue)).map(({ mission_name, launch_date_utc, details, rocket }, index) => (
            <div key={index} className={styles.launchCard}>
              <div className={styles.launchImage}>
                <img src={rocket.flickr_images[0]} loading='lazy' alt='Rocket' />
              </div>
              <div className={styles.launchContent}>
                <h3>{mission_name}</h3>
                <p>{details}</p>
                <p>{launch_date_utc}</p>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  )
}

export default Content;
