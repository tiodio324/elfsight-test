import {
  CardStatusContainer,
  StyledCardStatus,
  CardSpecies,
  CardType
} from './styles';

export function CardStatus({ status, species, type, className }) {
  return (
    <CardStatusContainer className={className}>
      <StyledCardStatus status={status}>{status}</StyledCardStatus>
      &nbsp;-&nbsp;
      <CardSpecies>{species}</CardSpecies>
      {type && type.trim() !== '' && <CardType>{type}</CardType>}
    </CardStatusContainer>
  );
}
