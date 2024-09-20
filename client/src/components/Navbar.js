import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.navItem} to="/">Home</Link>
      <Link className={styles.navItem} to="/meetings">Meetings</Link>
      <Link className={styles.navItem} to="/stats">Statistics</Link>
      <Link className={styles.navItem} to="/about">About</Link>
    </nav>
  );
};

export default Navbar;