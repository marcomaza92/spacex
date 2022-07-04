import styles from './Search.module.scss';
import { useContext } from 'react';
import { SearchContext } from 'context/search';

const Content = (props) => {
  const { options, setOptions } = useContext(SearchContext);

  const handleSearch = (event) => {
    setOptions({
      searchValue: event.currentTarget.value
    });
  }
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
