import React, { useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '../styles/Search.module.css';
require('dotenv').config();

const inter = Inter({ subsets: ['latin'] });

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Perform the desired action with the search term, e.g., make an API call
    console.log('Search term:', searchTerm);
    var apicall = "https://www.omdbapi.com/?";
    const apiKey = "&apikey=41b8dffa";
    apicall = apicall + "t=" + searchTerm + apiKey;  
    const response = await fetch(apicall);
    const jsonData = await response.json();
    console.log(jsonData["Title"]);
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
