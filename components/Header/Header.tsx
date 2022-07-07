import { FavoritesContext } from 'context/favorites';
import { LaunchesContext } from 'context/launches';
import { SearchContext } from 'context/search';
import { SectionsContext } from 'context/sections';
import { useContext } from 'react';
import styles from './Header.module.scss';

const Header = () => {
  const { launches, setLaunches } = useContext(LaunchesContext);
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const { setOptions } = useContext(SearchContext);
  const { sections, setSections } = useContext(SectionsContext)
  const toggleList = () => {
    setLaunches(favorites);
    setFavorites(launches);
    setOptions({
      searchValue: '',
      results: favorites.length
    });
    sections.main === 'all' ? setSections({ main: 'favorites'}) : setSections({ main: 'all'});
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <img src='/logo.svg' alt='SpaceX Logo' />
      </div>
      <h1 data-testid="title" className={styles.headerTitle}>Launches</h1>
      <div className={styles.headerTabs}>
        <div className={`${styles.headerTab} ${sections.main === 'all' ? styles.activeTab : ''}`}>
          <button onClick={toggleList} className={styles.headerTabButton} disabled={sections.main === 'all'}>All</button>
        </div>
        <div className={`${styles.headerTab} ${sections.main === 'favorites' ? styles.activeTab : ''}`}>
          <button onClick={toggleList} className={styles.headerTabButton} disabled={sections.main === 'favorites'}>Favorites</button>
        </div>
      </div>
    </header>
  )
}

export default Header;
