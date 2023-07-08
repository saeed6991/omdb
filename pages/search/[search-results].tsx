import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '../../styles/Search_results.module.css';
import { useRouter } from 'next/router';
import Pagination from '../../components/navbar/Pagination';

const inter = Inter({ subsets: ['latin'] });

export default function SearchResults({ searchItem, page, jsonData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const numberOfPages = Math.ceil(jsonData['totalResults'] / 10);
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
      pathname: '/search/search-results',
      query: { searchItem: searchItem, page: divText }
    });
  };

  const viewPage = (item) => {
    console.log(item);
    router.push({
      pathname: '/movies/id',
      query: { imdbID: item['imdbID'] }
    });
  };

  useEffect(() => {
    if (router.query.imdbID) {
      // Redirect to the /id page if imdbID is present in the query parameters
      router.push(`/id?imdbID=${router.query.imdbID}`);
    }
  }, [router.query.imdbID]);

  return (
    <>
      <Head>
        <title>Search Results for {searchItem}</title>
        <meta name="description" content="Search the OMDB database." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <section className={styles.searchTitleSection}>
          <h1>Search "{searchItem}" Page {page}</h1>
        </section>
        <section className={styles.listSection}>
          <div className={styles.listDiv}>
            <ul className={styles.movies}>
              {jsonData.Response === 'True' ? (
                jsonData['Search'].map((item) => (
                  <li key={item['Title']} className={styles.tiles}>
                    <a onClick={() => viewPage(item)}>
                      {item['Title']} ({item['Year']})
                    </a>
                    <div className={styles.details}>
                      <div className={styles.poster}>
                        <img
                          src={item['Poster']}
                          style={{ height: 'auto', width: '80px', cursor:'pointer' }}
                          onClick={() => viewPage(item)}
                        />
                      </div>
                      <div className="infos">
                        <ul className={styles.info}>
                          <li>type: {item['Type']}</li>
                          <li>imdb ID: {item['imdbID']}</li>
                        </ul>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <h3>Too many Responses. Please be more specific :D</h3>
              )}
            </ul>
          </div>
        </section>
        {jsonData.Response === 'True' && (
          <Pagination
            numberOfPages={numberOfPages}
            currentPage={page}
            handlePageClick={handleDivClick}
          />
        )}
      </main>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { searchItem, page } = query;

  const searchTerm = searchItem;
  var apicall = 'https://www.omdbapi.com/?';
  const apiKey = '&apikey=41b8dffa';
  apicall = apicall + 's=' + searchTerm + '&page=' + page + apiKey;
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
