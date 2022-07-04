import styles from './Header.module.scss';

const Header = () => {
  return (
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
  )
}

export default Header;
