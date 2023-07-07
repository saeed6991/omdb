require('dotenv').config();
import React, { useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '../styles/Search_results.module.css';
import { useRouter } from 'next/router';
import { FaSearch  } from 'react-icons/fa';

const inter = Inter({ subsets: ['latin'] });

export default function SearchResults({ searchItem, page , jsonData}) {
  const [searchTerm, setSearchTerm] = useState('');
  const numberOfPages = Math.ceil(jsonData['totalResults']/10);
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
        <title>Search Results for {searchItem}</title>
        <meta name="description" content="Search the OMDB database." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {
          jsonData.Response ==="True" ? (
            <>
            <section className={styles.searchTitleSection}>
              <h1>Search "{searchItem}" Page {page}</h1>
            </section>
            <section className={styles.listSection}>
              <div className={styles.listDiv}>
                <ul className={styles.movies}> 
                  {jsonData['Search'].map(item => {
                    return(
                      <li key={item['Title']} className={styles.tiles}>
                        <a onClick={() => viewPage(item)}>{item['Title']} ({item['Year']})</a>
                        <div className={styles.details}>
                          <div className={styles.poster}>
                            <img src={item['Poster']} style={{height: 'auto', width:'80px' }} onClick={() => viewPage(item)}/>
                          </div>
                          <div className='infos'>
                            <ul className={styles.info}>
                              <li>type: {item['Type']}</li>
                              <li>imdb ID: {item['imdbID']}</li>
                            </ul>
                          </div>
                        </div>
                      </li>
                  );
                  })}
                </ul>
              </div>
            </section>
            <section className={styles.pagesBar}>
            <div className={styles.previousPage}></div>
            <div className={styles.pageNumbers}>
              {numberOfPages < 10 ? (
                Array.from({ length: numberOfPages }, (_, i) => (
                  <div
                    key={i + 1}
                    onClick={() => handleDivClick(i + 1)}
                    className={styles.numbers}
                  >
                    {i + 1}
                  </div>
                ))
              ) : ( numberOfPages >= 10 ) && ( page <= 3 ) ? (
                <>
                  <div onClick={() => handleDivClick(1)} className={styles.numbers}>
                    1
                  </div>
                  <div onClick={() => handleDivClick(2)} className={styles.numbers}>
                    2
                  </div>
                  <div onClick={() => handleDivClick(3)} className={styles.numbers}>
                    3
                  </div>
                  <div onClick={() => handleDivClick(4)} className={styles.numbers}>
                    4
                  </div>
                  <div className={styles.dot}>...</div>
                  <div onClick={() => handleDivClick(numberOfPages)} className={styles.numbers}>
                    {numberOfPages}
                  </div>
                </>
              ) : ( numberOfPages >= 10 ) && ( page > 3 ) && ( Number(page) < numberOfPages - 3 ) ? (
                <>
                  <div onClick={() => handleDivClick(1)} className={styles.numbers}>
                    1
                  </div>
                  <div className={styles.dot}>
                    ...
                  </div>
                  <div onClick={() => handleDivClick(Number(page)-1)} className={styles.numbers}>
                    {Number(page) -1}
                  </div>
                  <div onClick={() => handleDivClick(Number(page))} className={styles.numbers}>
                    {page}
                  </div>
                  <div onClick={() => handleDivClick(Number(page)+1)} className={styles.numbers}>
                    {Number(page)+1}
                  </div>
                  <div className={styles.dot}>...</div>
                  <div onClick={() => handleDivClick(numberOfPages)} className={styles.numbers}>
                    {numberOfPages}
                  </div>
                </>
              ) :  ( numberOfPages >= 10 ) && ( Number(page) >= numberOfPages - 3 ) && ( Number(page) < numberOfPages-2 ) ? (
                <>
                  <div onClick={() => handleDivClick(1)} className={styles.numbers}>
                    1
                  </div>
                  <div className={styles.dot}>
                    ...
                  </div>
                  <div onClick={() => handleDivClick(Number(page)-3)} className={styles.numbers}>
                    {Number(page) -3}
                  </div>
                  <div onClick={() => handleDivClick(Number(page)-2)} className={styles.numbers}>
                    {Number(page) -2}
                  </div>
                  <div onClick={() => handleDivClick(Number(page)-1)} className={styles.numbers}>
                    {Number(page) -1}
                  </div>
                  <div onClick={() => handleDivClick(Number(page))} className={styles.numbers}>
                    {Number(page)}
                  </div>
                  <div onClick={() => handleDivClick(Number(page)+1)} className={styles.numbers}>
                    {Number(page)+1}
                  </div>
                  <div className={styles.dot}>
                  ...
                  </div>
                  <div onClick={() => handleDivClick(numberOfPages)} className={styles.numbers}>
                    {numberOfPages}
                  </div>
                </>
                ) : ( numberOfPages >= 10 ) && (Number(page) == numberOfPages) ?(<>
                <div onClick={() => handleDivClick(1)} className={styles.numbers}>
                  1
                </div>
                <div className={styles.dot}>
                  ...
                </div>
                <div onClick={() => handleDivClick(Number(page)-3)} className={styles.numbers}>
                  {Number(page) -3}
                </div>
                <div onClick={() => handleDivClick(Number(page)-2)} className={styles.numbers}>
                  {Number(page) -2}
                </div>
                <div onClick={() => handleDivClick(Number(page)-1)} className={styles.numbers}>
                  {Number(page) -1}
                </div>
                <div onClick={() => handleDivClick(numberOfPages)} className={styles.numbers}>
                  {numberOfPages}
                </div>
              </>): ( numberOfPages >= 10 ) && (Number(page) == numberOfPages-2) ?(<>
                  <div onClick={() => handleDivClick(1)} className={styles.numbers}>
                    1
                  </div>
                  <div className={styles.dot}>
                    ...
                  </div>
                  <div onClick={() => handleDivClick(Number(page)-2)} className={styles.numbers}>
                    {Number(page) -2}
                  </div>
                  <div onClick={() => handleDivClick(Number(page)-1)} className={styles.numbers}>
                    {Number(page) -1}
                  </div>
                  <div onClick={() => handleDivClick(Number(page))} className={styles.numbers}>
                    {Number(page)}
                  </div>
                  <div onClick={() => handleDivClick(Number(page)+1)} className={styles.numbers}>
                    {Number(page)+1}
                  </div>
                  <div onClick={() => handleDivClick(numberOfPages)} className={styles.numbers}>
                    {numberOfPages}
                  </div>
                </>): ( numberOfPages >= 10 ) && (Number(page) == numberOfPages-1) ?(
                <>
                  <div onClick={() => handleDivClick(1)} className={styles.numbers}>
                    1
                  </div>
                  <div className={styles.dot}>
                    ...
                  </div>
                  <div onClick={() => handleDivClick(Number(page)-2)} className={styles.numbers}>
                    {Number(page) -2}
                  </div>
                  <div onClick={() => handleDivClick(Number(page)-1)} className={styles.numbers}>
                    {Number(page) -1}
                  </div>
                  <div onClick={() => handleDivClick(Number(page))} className={styles.numbers}>
                    {Number(page)}
                  </div>
                  <div onClick={() => handleDivClick(numberOfPages)} className={styles.numbers}>
                    {numberOfPages}
                  </div>
                  </>):(<></>)}
            </div>
            <div className={styles.nextPage}></div>
          </section>
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
  const searchTerm = searchItem; 
  var apicall = "https://www.omdbapi.com/?";
  const apiKey = "&apikey=41b8dffa";
  apicall = apicall + "s=" + searchTerm + "&page=" + page + apiKey; 
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


