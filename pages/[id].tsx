import React, { useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '../styles/Search_results.module.css';
import { useRouter } from 'next/router';
import { FaSearch  } from 'react-icons/fa';

const inter = Inter({ subsets: ['latin'] });

export default function viewPage({ imdbID, jsonData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  console.log(jsonData);
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

  const handleDivClick = (pageNumber) => {
    const divText = pageNumber.toString();
    router.push({
      pathname: '/search-results',
      query: { searchItem: searchItem, page: divText} 
    });
  };

  const viewPage = (item) => {
    console.log(item);
    router.push({
      pathname:'/id',
      query: {imdbID: item['imdbID']}
    })
  }

  return (
    <>
      <Head>
        <title>View Page for {searchItem}</title>
        <meta name="description" content="Search the OMDB database." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}></main>
    </>
)};

export async function getServerSideProps({ query }) {
  const {  } = 

  return {
    props: {
      searchItem, 
      page,
      jsonData
    }
  };


}