import { ArrowRight } from 'components/Icons';
import usePagination from 'hooks/usePagination';
import { combineClassNames } from 'utils/theme/styleUtils';

import styles from './Pagination.module.css';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageClick: (page: number) => void;
  onNextClick: () => void;
  onPrevClick: () => void;
};

const Pagination = ({ currentPage, totalPages, onNextClick, onPageClick, onPrevClick }: PaginationProps): JSX.Element => {
  const pagination = usePagination({ totalPageCount: totalPages, currentPage });
  const renderNumberedButtons = () =>
    pagination?.map((paginationItem, index) => {
      const isDots = typeof paginationItem === 'string';

      const style = isDots
        ? styles.paginationPadding
        : paginationItem === currentPage
        ? combineClassNames([styles.paginationItem, styles.activeItem])
        : styles.paginationItem;

      const handlePageClick = () => {
        if (typeof paginationItem === 'number') {
          onPageClick(paginationItem);
        }
      };

      return (
        <li className={style} key={index}>
          {isDots ? (
            paginationItem
          ) : (
            <button className={styles.button} onClick={handlePageClick}>
              {paginationItem}
            </button>
          )}
        </li>
      );
    });

  return (
    <ul className={styles.paginationList}>
      <li className={styles.paginationItem}>
        <button className={styles.button} onClick={onPrevClick}>
          <ArrowRight className={styles.arrowLeft} />
        </button>
      </li>
      {renderNumberedButtons()}
      <li className={styles.paginationItem}>
        <button className={styles.button} onClick={onNextClick}>
          <ArrowRight className={styles.arrowRight} />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
