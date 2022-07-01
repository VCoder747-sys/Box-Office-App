/* eslint-disable*/
import React, { useEffect, useState } from 'react';
import MainpageLayout from '../Components/MainpageLayout';
import ShowGrid from '../Components/shows/ShowGrid';
import { apiGet } from '../misc/config';
import { useShows } from '../misc/custom-hooks';

const Starred = () => {
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoding, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiGet(`/shows/${showId}`));

      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))
        .then(results => {
          setShows(results);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    <MainpageLayout>
      {isLoding && <div>Shows are still Loading</div>}
      {error && <div>Error Occured: {error}</div>}
      {!isLoding && !shows && <div>No Shows were Added </div>}
      {!isLoding && !error && shows && <ShowGrid data={shows} />}
    </MainpageLayout>
  );
};

export default Starred;
