import React from 'react';
import { NavLink } from 'react-router';
import logo from '../assets/react.svg';
import styles from './Header.module.css';

const Header = ({ title }) => (
  <header className={styles.header}>
    <img src={logo} alt="Logo" className={styles.logo} />
    <h1 className={styles.title}>{title}</h1>
    <nav className={styles.nav}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? styles.active : styles.inactive
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? styles.active : styles.inactive
        }
      >
        About
      </NavLink>
    </nav>
  </header>
);

export default Header;
