import React, { useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '../styles/Search.module.css';
import { useRouter } from 'next/router';
require('dotenv').config();

const inter = Inter({ subsets: ['latin'] });

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleInputChange = (event) => {
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

  

  return (
    <>
      <Head>
        <title>OMDB Browser - Search</title>
        <meta name="description" content="Search the OMDB database." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button type="submit" className={styles.searchButton}>Search</button>
        </form>
      </main>
    </>
  );
}


