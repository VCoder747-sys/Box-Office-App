/*eslint-disable*/
import React, { useState } from 'react';
import ActorGrid from '../Components/actors/ActorGrid';
import CustomRadio from '../Components/CustomRadio';
import MainpageLayout from '../Components/MainpageLayout';
import ShowGrid from '../Components/shows/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOptions, setSearchOption] = useState('shows');

  const isShowsSearch = searchOptions === 'shows';

  const onSearch = () => {
    //  https://api.tvmaze.com/search/shows?q=girls
    apiGet(`/search/${searchOptions}?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onKeyDown = ev => {
    if (ev.keyCode == 13) {
      onSearch();
    }
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };
  console.log(searchOptions);

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div> Oops! No Result </div>;
    }

    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    }
    return null;
  };

  return (
    <MainpageLayout>
      {' '}
      <SearchInput
        type="text"
        onChange={onInputChange}
        placeholder="Search for Something"
        onKeyDown={onKeyDown}
        value={input}
      />{' '}
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            value="shows"
            checked={isShowsSearch}
            onChange={onRadioChange}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="actorss-search"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          SEARCH
        </button>
      </SearchButtonWrapper>
      {renderResults()}
    </MainpageLayout>
  );
};

export default Home;
