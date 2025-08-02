import styled from 'styled-components';
import { Pagination, ItemsGrid, useData, Header, AppState } from './components';

export function App() {
  const { isFetching, isError } = useData();

  return (
    <Main>
      <Header />

      <AppState />

      {!isFetching && !isError && (
        <>
          <ItemsGrid />

          <Pagination />
        </>
      )}
    </Main>
  );
}

const Main = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px 0;
  max-width: 100%;
  margin: 0 auto;
  background: #001832;

  @media (min-width: 768px) {
    max-width: 950px;
    padding: 20px 40px;
  }

  @media (min-width: 1200px) {
    max-width: 1520px;
    padding: 20px 40px;
  }
`;
