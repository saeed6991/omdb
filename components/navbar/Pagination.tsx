import React from 'react';
import styles from '../../styles/Search_results.module.css';

function Pagination({ numberOfPages, currentPage, handlePageClick }) {
  const handleDivClick = (pageNumber) => {
    handlePageClick(pageNumber);
  };

  return (
    <section className={styles.pagesBar}>
      <div className={styles.previousPage}></div>
      <div className={styles.pageNumbers}>
        {numberOfPages < 10 ? (
          Array.from({ length: numberOfPages }, (_, i) => (
            <div
              key={i + 1}
              onClick={() => handleDivClick(i + 1)}
              className={currentPage === i + 1 ? styles.active : styles.numbers}
            >
              {i + 1}
            </div>
          ))
        ) : currentPage <= 3 ? (
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
        ) : currentPage > 3 && currentPage < numberOfPages - 3 ? (
          <>
            <div onClick={() => handleDivClick(1)} className={styles.numbers}>
              1
            </div>
            <div className={styles.dot}>...</div>
            <div onClick={() => handleDivClick(currentPage - 1)} className={styles.numbers}>
              {currentPage - 1}
            </div>
            <div onClick={() => handleDivClick(currentPage)} className={styles.numbers}>
              {currentPage}
            </div>
            <div onClick={() => handleDivClick(currentPage + 1)} className={styles.numbers}>
              {currentPage + 1}
            </div>
            <div className={styles.dot}>...</div>
            <div onClick={() => handleDivClick(numberOfPages)} className={styles.numbers}>
              {numberOfPages}
            </div>
          </>
        ) : currentPage >= numberOfPages - 3 && currentPage < numberOfPages - 2 ? (
          <>
            <div onClick={() => handleDivClick(1)} className={styles.numbers}>
              1
            </div>
            <div className={styles.dot}>...</div>
            <div onClick={() => handleDivClick(currentPage - 3)} className={styles.numbers}>
              {currentPage - 3}
            </div>
            <div onClick={() => handleDivClick(currentPage - 2)} className={styles.numbers}>
              {currentPage - 2}
            </div>
            <div onClick={() => handleDivClick(currentPage - 1)} className={styles.numbers}>
              {currentPage - 1}
            </div>
            <div onClick={() => handleDivClick(currentPage)} className={styles.numbers}>
              {currentPage}
            </div>
            <div onClick={() => handleDivClick(currentPage + 1)} className={styles.numbers}>
              {currentPage + 1}
            </div>
            <div className={styles.dot}>...</div>
            <div onClick={() => handleDivClick(numberOfPages)} className={styles.numbers}>
              {numberOfPages}
            </div>
          </>
        ) : currentPage === numberOfPages ? (
          <>
            <div onClick={() => handleDivClick(1)} className={styles.numbers}>
              1
            </div>
            <div className={styles.dot}>...</div>
            <div onClick={() => handleDivClick(currentPage - 3)} className={styles.numbers}>
              {currentPage - 3}
            </div>
            <div onClick={() => handleDivClick(currentPage - 2)} className={styles.numbers}>
              {currentPage - 2}
            </div>
            <div onClick={() => handleDivClick(currentPage - 1)} className={styles.numbers}>
              {currentPage - 1}
            </div>
            <div onClick={() => handleDivClick(numberOfPages)} className={styles.numbers}>
              {numberOfPages}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={styles.nextPage}></div>
    </section>
  );
}

export default Pagination;
