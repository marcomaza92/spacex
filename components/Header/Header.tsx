import { FavoritesContext } from 'context/favorites';
import { LaunchesContext } from 'context/launches';
import { SearchContext } from 'context/search';
import { useState } from 'react';
import { useContext } from 'react';
import styles from './Header.module.scss';

const Header = () => {
  const { launches, setLaunches } = useContext(LaunchesContext);
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const { options, setOptions } = useContext(SearchContext);
  const [activeList, setActiveList] = useState('all');
  const toggleList = () => {
    setLaunches(favorites);
    setFavorites(launches);
    setOptions({
      searchValue: '',
      results: favorites.length
    });
    activeList === 'all' ? setActiveList('favorites') : setActiveList('all');
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <img src='/logo.svg' alt='SpaceX Logo' />
      </div>
      <h1 className={styles.headerTitle}>Launches</h1>
      <div className={styles.headerTabs}>
        <div className={`${styles.headerTab} ${activeList === 'all' ? styles.activeTab : ''}`}>
          <button onClick={toggleList} className={styles.headerTabButton} disabled={activeList === 'all'}>All</button>
        </div>
        <div className={`${styles.headerTab} ${activeList === 'favorites' ? styles.activeTab : ''}`}>
          <button onClick={toggleList} className={styles.headerTabButton} disabled={activeList === 'favorites'}>Favorites</button>
        </div>
      </div>
    </header>
  )
}

export default Header;
