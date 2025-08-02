import { useState } from 'react';
import styled from 'styled-components';
import { useData } from '../providers';

export function Filter() {
  const { setApiURL } = useData();
  const [filters, setFilters] = useState({
    status: '',
    species: '',
    gender: '',
    name: '',
    type: ''
  });

  const statusOptions = [
    { value: '', label: 'Status' },
    { value: 'alive', label: 'Alive' },
    { value: 'dead', label: 'Dead' },
    { value: 'unknown', label: 'Unknown' }
  ];

  const speciesOptions = [
    { value: '', label: 'Species' },
    { value: 'human', label: 'Human' },
    { value: 'alien', label: 'Alien' },
    { value: 'humanoid', label: 'Humanoid' },
    { value: 'animal', label: 'Animal' },
    { value: 'robot', label: 'Robot' },
    { value: 'cronenberg', label: 'Cronenberg' },
    { value: 'disease', label: 'Disease' },
    { value: 'mythological', label: 'Mythological' },
    { value: 'poopybutthole', label: 'Poopybutthole' },
    { value: 'unknown', label: 'Unknown' }
  ];

  const genderOptions = [
    { value: '', label: 'Gender' },
    { value: 'female', label: 'Female' },
    { value: 'male', label: 'Male' },
    { value: 'genderless', label: 'Genderless' },
    { value: 'unknown', label: 'Unknown' }
  ];

  const buildApiUrl = (filterParams) => {
    const baseUrl = 'https://rickandmortyapi.com/api/character/';
    const params = new URLSearchParams();

    Object.entries(filterParams).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

    const queryString = params.toString();

    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
  };

  const applyFilters = () => {
    const newApiUrl = buildApiUrl(filters);
    setApiURL(newApiUrl, filters, true); // resetPage = true
  };

  const resetFilters = () => {
    setFilters({ status: '', species: '', gender: '', name: '', type: '' });
    setApiURL('https://rickandmortyapi.com/api/character/', {}, true); // resetPage = true
  };

  return (
    <FilterContainer>
      <FirstRow>
        <SelectContainer>
          <Select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <ChevronIcon>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6L8 10L12 6"
                stroke="#b2b2b2"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ChevronIcon>
        </SelectContainer>

        <SelectContainer>
          <Select
            value={filters.gender}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
          >
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <ChevronIcon>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6L8 10L12 6"
                stroke="#b2b2b2"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ChevronIcon>
        </SelectContainer>

        <SelectContainer>
          <Select
            value={filters.species}
            onChange={(e) => handleFilterChange('species', e.target.value)}
          >
            {speciesOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <ChevronIcon>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6L8 10L12 6"
                stroke="#b2b2b2"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ChevronIcon>
        </SelectContainer>
      </FirstRow>

      <SecondRow>
        <InputContainer>
          <Input
            type="text"
            placeholder="Name"
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <Input
            type="text"
            placeholder="Type"
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          />
        </InputContainer>

        <ButtonContainer>
          <ApplyButton onClick={applyFilters}>Apply</ApplyButton>
          <ResetButton onClick={resetFilters}>Reset</ResetButton>
        </ButtonContainer>
      </SecondRow>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 10px;
  }

  @media (min-width: 1200px) {
    gap: 15px;
  }
`;

const FirstRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 10px;
    width: auto;
  }

  @media (min-width: 1200px) {
    gap: 15px;
  }
`;

const SecondRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 10px;
    width: auto;
    align-items: center;
  }

  @media (min-width: 1200px) {
    gap: 15px;
  }
`;

const SelectContainer = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: 768px) {
    width: 150px;
  }

  @media (min-width: 1200px) {
    width: 180px;
  }
`;

const Select = styled.select`
  width: 100%;
  height: 40px;
  padding: 12px 12px 12px 16px;
  background: #263750;
  border: 1px solid #83bf46;
  border-radius: 8px;
  color: #b3b3b3;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  appearance: none;

  &:focus {
    outline: none;
    background: #334466;
  }

  option {
    background: #263750;
    color: #b3b3b3;
  }
`;

const ChevronIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const InputContainer = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 150px;
  }

  @media (min-width: 1200px) {
    width: 180px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 12px 16px;
  background: #263750;
  border: 1px solid #83bf46;
  border-radius: 8px;
  color: #b3b3b3;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 400;

  &::placeholder {
    color: #b3b3b3;
  }

  &:focus {
    outline: none;
    background: #334466;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
  }
`;

const ApplyButton = styled.button`
  padding: 12px;
  background: transparent;
  border: 1px solid #83bf46;
  border-radius: 8px;
  color: #83bf46;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 70px;

  @media (min-width: 1200px) {
    min-width: 85px;
  }

  &:hover {
    background: #83bf46;
    color: #f5f5f5;
  }
`;

const ResetButton = styled.button`
  padding: 12px;
  background: transparent;
  border: 1px solid #ff5152;
  border-radius: 8px;
  color: #ff5152;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 70px;

  @media (min-width: 1200px) {
    min-width: 85px;
  }

  &:hover {
    background: #ff5152;
    color: #f5f5f5;
  }
`;
