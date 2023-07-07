import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import styles from './NavBar.module.css';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

const inter = Inter({ subsets: ['latin'] });

type NavBarProps = {};

const NavBar: React.FC<NavBarProps> = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Search term:', searchTerm);
    router.push({
      pathname: '/search-results',
      query: { searchItem: searchTerm, page: 1} // Include the searchItem in the query object
    });
  };

  const handleIconHover = () => {
    setIsHovered(true);
    const interval = setInterval(()=>{}, 100);
    clearInterval(interval);
  };

  const handleIconLeave = () => {
    const interval = setInterval(()=>{}, 500);
    clearInterval(interval);
    setIsHovered(false);
  };

  return (
    <nav className={[styles.navbar, inter.className].join(' ')}>
      <Link href="/">
        <div className={styles.logo}>OMDB</div>
      </Link>
      <ul className={styles.navLinks}>
        <div className={styles.menu}>
          { 
            isHovered==false ? (
              <>
              <li onMouseEnter={handleIconHover}>
                <FaSearch className={styles.searchIcon}/>
              </li> </> )
              : (
                <>
                <li  onMouseLeave={handleIconLeave}>
                  <form className={styles.searchForm} onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Search..."
                      className={styles.searchInput}
                      value={searchTerm}
                      onChange={handleInputChange}
                      autoFocus
                    />
                    <button type="submit" className={styles.searchButton}>
                    <FaSearch className={styles.searchIcon} onMouseLeave={handleIconLeave}/>
                    </button>
                  </form>
                </li>
                </>
              )
          }
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
