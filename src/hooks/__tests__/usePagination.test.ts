import { renderHook } from '@testing-library/react-hooks';

import usePagination from '../usePagination';

describe.each`
  totalPageCount | siblingCount | currentPage | expected
  ${1}           | ${1}         | ${1}        | ${[1]}
  ${10}          | ${1}         | ${5}        | ${[1, '...', 4, 5, 6, '...', 10]}
  ${10}          | ${2}         | ${5}        | ${[1, '...', 3, 4, 5, 6, 7, '...', 10]}
  ${7}           | ${2}         | ${5}        | ${[1, 2, 3, 4, 5, 6, 7]}
  ${7}           | ${1}         | ${4}        | ${[1, '...', 3, 4, 5, 6, 7]}
  ${7}           | ${1}         | ${3}        | ${[1, 2, 3, 4, 5, '...', 7]}
  ${100}         | ${1}         | ${50}       | ${[1, '...', 49, 50, 51, '...', 100]}
`('usePagination', ({ totalPageCount, siblingCount, currentPage, expected }) => {
  test(`returns ${expected}`, () => {
    const { result } = renderHook(() => usePagination({ totalPageCount, siblingCount, currentPage }));

    expect(result.current).toEqual(expected);
  });
});
