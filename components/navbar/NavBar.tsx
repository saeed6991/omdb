import React from 'react';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import styles from './NavBar.module.css'
import Link from 'next/link';
import { FaSearch  } from 'react-icons/fa';

const inter = Inter({ subsets: ['latin'] });
type NavBarProps = {}

const NavBar: React.FC<NavBarProps> = () => <nav className={[styles.navbar, inter.className].join(' ')}>
  <Link href="/"><div className={styles.logo}>OMDB</div></Link>
  <ul className={styles.navLinks}>
    <div className={styles.menu}>
      <li><Link href="/"> <FaSearch  className={styles.searchIcon} /></Link></li>
      <li><Link href="/recommend">Recommendations</Link></li>
    </div>
  </ul>
</nav>

export default NavBar;
