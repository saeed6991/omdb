import React, { useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '../styles/Search.module.css';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';

const inter = Inter({ subsets: ['latin'] });

export default function Search({ jsonData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();


  const viewPage = (item) => {
    console.log(item);
    router.push({
      pathname: '/movies/id',
      query: { imdbID: item['imdbID'] }
    });
  };

  var today = new Date().toLocaleDateString('en-US').toString();

  return (
    <>
      <Head>
        <title>OMDB</title>
        <meta name="description" content="Search the OMDB database." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
      </main>
      <section className={styles.recommendations}>
        <h2>Featured for today {today}</h2>
        <section className={styles.listSection}>
          <div className={styles.listDiv}>
            <ul className={styles.movies}>
              {jsonData.map((item) => (
                <li key={item['Title']} className={styles.tiles}>
                  <a className={styles.tilesTitle} onClick={() => viewPage(item)}>
                    {item['Title']} ({item['Year']})
                  </a>
                  <div className={styles.details}>
                    <div className={styles.poster}>
                      <img
                        src={item['Poster']}
                        style={{ height: 'auto', width: '80px' }}
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
              ))}
            </ul>
          </div>
        </section>
      </section>
    </>
  );
}

export async function getStaticProps () {
  return {
    props: {
      jsonData: [{"Title":"Batman: Mystery of the Batwoman","Year":"2003","imdbID":"tt0346578","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BN2IwYTVlZGQtOTRhNy00MDI5LThmMTUtYWI1MGUwMGFkYzI1XkEyXkFqcGdeQXVyNzQzNzQxNzI@._V1_SX300.jpg"},
      {"Title":"Panda Bear It","Year":"2020","imdbID":"tt12623102","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNTdmMTRmNDYtODUwYi00YzZkLWFhOTEtYmQzMGRhM2E5NWIzXkEyXkFqcGdeQXVyNDM5MTg4Mjk@._V1_SX300.jpg"},{"Title":"Adventure of a Panda","Year":"1983","imdbID":"tt0334737","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMDQzYzcxYjMtMzg2Zi00NTNmLWEwMmUtNTE1ZWVjOWI1NzI5XkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg"},{"Title":"Shiro demo Kuro demo Nai Sekai de Panda wa Warau","Year":"2020","imdbID":"tt11976240","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BOGQ1MWNjMzktNTRiMS00MTQxLWJlNTAtYmRhNjY4MjUyYmVkXkEyXkFqcGdeQXVyMjY2OTU0MTg@._V1_SX300.jpg"},{"Title":"My Panda","Year":"2016","imdbID":"tt5971360","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BYjJlMWJkZTctMDhiMS00ODJhLWJjYTctZjgzYzAzZWIxZWJhXkEyXkFqcGdeQXVyMTY0NzkwODQ@._V1_SX300.jpg"},{"Title":"The Panda Rabbit","Year":"2011","imdbID":"tt2084116","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMDUwOTU1MDctNzZjNi00MTFiLWFkMTgtOTFhOWZiZDc5YzBjXkEyXkFqcGdeQXVyMjYwMjgwMDk@._V1_SX300.jpg"},{"Title":"Red Panda","Year":"2019","imdbID":"tt10991370","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BODU1YWNlZmMtNWQ5YS00MzNhLWE4ZDYtMTUzM2UyMjVkMDkzXkEyXkFqcGdeQXVyMTA1MTEzNzc4._V1_SX300.jpg"},
      {"Title":"Spider-Plant Man","Year":"2005","imdbID":"tt0460946","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMjVkOTU5MGEtMmRjYy00ZjQwLTk2YzgtNzlmNTJiZWI5M2NjXkEyXkFqcGdeQXVyMzI2NTcxODU@._V1_SX300.jpg"},{"Title":"Jack Black: Spider-Man","Year":"2002","imdbID":"tt0331527","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BZDhlMmNmMDMtZmQ2Zi00M2FlLTg2MjEtNjZjNGI3M2ZmZTc1XkEyXkFqcGdeQXVyNjMxNzQ2NTQ@._V1_SX300.jpg"},{"Title":"The Amazing Spider-Man","Year":"2012","imdbID":"tt2249079","Type":"game","Poster":"https://m.media-amazon.com/images/M/MV5BMTUxNDM4NzU3MV5BMl5BanBnXkFtZTcwNDg4NTQwOA@@._V1_SX300.jpg"},{"Title":"The Girl and the Spider","Year":"2021","imdbID":"tt11967484","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BZWRkZGQ5ZjUtNWE5Zi00ZjYyLWIxMmMtMjJjZWFjZGIyN2JlXkEyXkFqcGdeQXVyMTg5MDEyNw@@._V1_SX300.jpg"},
      {"Title":"Dumb Like a Fox","Year":"1941","imdbID":"tt0148091","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNzI0ZDFkYjQtZDU3NC00MjExLTliZDUtZDAzYTJkZGRiZjNkXkEyXkFqcGdeQXVyMDU4MTQ0Ng@@._V1_SX300.jpg"},{"Title":"Zombie Dumb","Year":"2019–","imdbID":"tt11163090","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BMWQyYTE2YjItZTQwOS00OGFlLTkxMzUtN2M2NGVlY2NjMGY4XkEyXkFqcGdeQXVyODgyNzU4MA@@._V1_SX300.jpg"},
      {"Title":"Kung Fu: A Legend Reborn","Year":"1992","imdbID":"tt0104651","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BN2NhNTU3NzYtOGM5ZC00NDQwLWJmMGMtYjhjM2UzOWY5ODJmXkEyXkFqcGdeQXVyMzU0NzkwMDg@._V1_SX300.jpg"},
    ]
    }
    
  }
}