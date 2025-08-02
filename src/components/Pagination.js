import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useData } from './providers';

export function Pagination() {
  const [pages, setPages] = useState([]);
  const {
    apiURL,
    info,
    activePage,
    setActivePage,
    setApiURL,
    currentFilters
  } = useData();

  const pageClickHandler = (index) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(index);

    const newUrl = new URL(apiURL);
    newUrl.searchParams.set('page', index);
    setApiURL(newUrl.toString(), currentFilters);
  };

  useEffect(() => {
    if (!info.pages) return;

    const createdPages = Array.from({ length: info.pages }, (_, i) => i + 1);
    setPages(createdPages);
  }, [info.pages]);

  if (pages.length <= 1) return null;

  const maxVisiblePages = 5;
  const startPage = Math.max(1, activePage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(pages.length, startPage + maxVisiblePages - 1);

  return (
    <StyledPagination>
      {activePage > 1 && (
        <>
          <Page onClick={() => pageClickHandler(1)}>« First</Page>
          <Page onClick={() => pageClickHandler(activePage - 1)}>‹ Prev</Page>
        </>
      )}

      {startPage > 1 && <Ellipsis>...</Ellipsis>}

      {pages.slice(startPage - 1, endPage).map((pageNum) => (
        <Page
          key={pageNum}
          active={pageNum === activePage}
          onClick={() => pageClickHandler(pageNum)}
        >
          {pageNum}
        </Page>
      ))}

      {endPage < pages.length && <Ellipsis>...</Ellipsis>}

      {activePage < pages.length && (
        <>
          <Page onClick={() => pageClickHandler(activePage + 1)}>Next ›</Page>
          <Page onClick={() => pageClickHandler(pages.length)}>Last »</Page>
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const Page = styled.span`
  color: #fff;
  font-size: 16px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 6px;
  min-width: 40px;
  text-align: center;

  ${({ active }) =>
    active &&
    `
    color: #83bf46;
    background: rgba(131, 191, 70, 0.1);
    border: 1px solid #83bf46;
  `};

  &:hover {
    color: #83bf46;
    background: rgba(131, 191, 70, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 10px;
    min-width: 35px;
  }
`;

const Ellipsis = styled.span`
  color: #fff;
  font-size: 16px;
  padding: 8px 12px;
  cursor: default;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 10px;
  }
`;
