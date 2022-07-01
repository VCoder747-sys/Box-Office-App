/* eslint-disable */
import React from 'react';
import { useParams } from 'react-router-dom';
import ShowMainData from '../Components/shows/ShowMainData';
import Details from '../Components/shows/Details';
import Seasons from '../Components/shows/Seasons';
import Cast from '../Components/shows/Cast';
import { InfoBlock, ShowPageWrapper } from './Show.styled';
import { useShow } from '../misc/custom-hooks';

const Show = () => {
  const { id } = useParams();

  const { show, isLoading, error } = useShow(id);

  if (isLoading) {
    return <div>Data is being loaded</div>;
  }

  if (error) {
    return <div>Error occured: {error}</div>;
  }

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>

      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>

      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
