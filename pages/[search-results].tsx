import React, { useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '../styles/Search_results.module.css';
require('dotenv').config();
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function SearchResults({ searchItem, page , jsonData}) {
  const [searchTerm, setSearchTerm] = useState('');

  const router = useRouter();
  console.log(jsonData); //here we can see the object responses

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    router.push({
      pathname: '/search-results',
      query: { searchItem: searchTerm, page: 1 }
    });
  };

  return (
    <>
      <Head>
        <title>Search Results for {searchItem}</title>
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
        {
          jsonData.Response ==="True" ? (
            <>
            <section className={styles.searchTitleSection}>
              <h1>Search "{searchItem}"</h1>
            </section>
            <section className={styles.foundTitlesSection}></section>
            <section className={styles.listSection}></section>
            </>
          ) : (         
            <section className={styles.searchTitleSection}>
              <h1>Search "{searchItem}"</h1>
              <h3>Too many Responses. Please be more specific :D</h3>
            </section>  
          )
        }
      </main>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { searchItem, page } = query; 
  const searchTerm = searchItem; // Access the name query parameter
  var apicall = "https://www.omdbapi.com/?";
  const apiKey = "&apikey=41b8dffa";
  apicall = apicall + "s=" + searchTerm + "&p=" + page + apiKey; // Use the page query parameter
  const response = await fetch(apicall);
  const jsonData = await response.json();

  return {
    props: {
      searchItem, 
      page,
      jsonData
    }
  };
}


