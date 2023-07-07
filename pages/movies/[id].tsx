import React, { useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '../../styles/id.module.css';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function ViewPage({ imdbID, jsonData }) {
  const router = useRouter();
  console.log(jsonData);

  return (
    <>
      <Head>
        <title>{jsonData['Title']}</title>
        <meta name="description" content="Search the OMDB database." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1 className={styles.title}>{jsonData['Title']} - ({jsonData['Year']})</h1>
        <img src={jsonData['Poster']} className={styles.poster} />
        <p className={styles.paragraph}>Runtime: {jsonData['Runtime']}</p>
        <h2 className={styles.subtitle}>Type</h2>
        <p>{jsonData['Type']}</p>
        <h2 className={styles.subtitle}>Rated</h2>
        <p>{jsonData['Rated']}</p>
        <h2 className={styles.subtitle}>Awards</h2>
        <p>{jsonData['Awards']}</p>
        <h2 className={styles.subtitle}>Country</h2>
        <p>{jsonData['Country']}</p>
        <h2 className={styles.subtitle}>Language</h2>
        <p>{jsonData['Language']}</p>
        <h2 className={styles.subtitle}>Actors</h2>
        <p>{jsonData['Actors']}</p>
        <h2 className={styles.subtitle}>Plot</h2>
        <p>{jsonData['Plot']}</p>
      </main>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { imdbID } = query;
  var apicall = 'https://www.omdbapi.com/?';
  const apiKey = '&apikey=41b8dffa';
  apicall = apicall + 'i=' + imdbID + '&plot=full' + apiKey;
  const response = await fetch(apicall);
  const jsonData = await response.json();

  return {
    props: {
      imdbID,
      jsonData
    }
  };
}
