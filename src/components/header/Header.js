import styled from 'styled-components';
import { Logo } from './Logo';
import { Filter } from './Filter';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Filter />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  padding: 20px 0;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 72px;
  }

  @media (min-width: 1200px) {
    padding: 20px 152px;
  }
`;
