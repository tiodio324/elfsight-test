import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback
} from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);
  const [currentFilters, setCurrentFilters] = useState({});

  const fetchData = useCallback(async (url) => {
    setIsFetching(true);
    setIsError(false);

    try {
      const { data } = await axios.get(url);
      setIsFetching(false);
      setCharacters(data.results || []);
      setInfo(data.info || {});
    } catch (error) {
      setIsFetching(false);
      setIsError(true);
      console.error('Error fetching characters:', error);
      setCharacters([]);
      setInfo({});
    }
  }, []);

  useEffect(() => {
    fetchData(apiURL);
  }, [apiURL, fetchData]);

  const updateApiURL = useCallback((newUrl, filters = {}) => {
    setApiURL(newUrl);
    setCurrentFilters(filters);
    setActivePage(1);
  }, []);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL: updateApiURL,
      characters,
      fetchData,
      isFetching,
      isError,
      info,
      currentFilters
    }),
    [
      activePage,
      apiURL,
      characters,
      isFetching,
      isError,
      info,
      fetchData,
      updateApiURL,
      currentFilters
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
