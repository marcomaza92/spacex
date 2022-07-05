import styles from './Search.module.scss';
import { useContext } from 'react';
import { SearchContext } from 'context/search';
import { useEffect } from 'react';
import { LaunchesContext } from 'context/launches';

const Content = () => {
  const { options, setOptions } = useContext(SearchContext);
  const { launches } = useContext(LaunchesContext);

  const handleSearch = (event) => {
    setOptions({
      searchValue: event.currentTarget.value,
      results: launches.filter(launch => launch.mission_name.includes(event.currentTarget.value)).length
    });
  };

  return (
    <section className={styles.search}>
      <div className={styles.searchBar}>
        <div className={styles.searchIcon}>
          <img src='/icon-search.svg' alt='Search' />
        </div>
        <input onChange={handleSearch} value={options.searchValue} className={styles.searchInput} placeholder='Search all launches...' />
      </div>
    </section>
  )
}

export default Content;
