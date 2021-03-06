import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Spinner from '../components/common/Spinner';
import Petition from '../components/ui/petition/Petition';
import { Wrapper } from '../components/ui/petition/styles';
import config from '../utils/config';
import utils from '../utils';

const { convertIdentifierToName } = utils;
const { apiBaseUrl } = config;

const Donations = ({ match }) => {
  const { identifier } = match.params;
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetitions = async () => {
      let API_URL = `${apiBaseUrl}/donations`;
      if (identifier) {
        API_URL = `${apiBaseUrl}/donations?name=${identifier}`;
      }
      try {
        const res = await axios.get(API_URL);
        setDonations(res.data.data);
        window.scrollTo(0, 0);
      } catch (error) {
        // set error and show error page
      } finally {
        setLoading(false);
      }
    };
    fetchPetitions();
  }, [identifier]);

  return (
    <>
      {loading ? (
        <Spinner height="95vh" />
      ) : (
        <>
          <Wrapper>
            <h2>
              {donations.length === 0 && !loading ? (
                <h2 className="not-found">NO DONATION FOUND</h2>
              ) : (
                <>
                  {identifier
                    ? `DONATIONS FOR ${convertIdentifierToName(identifier)}`
                    : 'DONATIONS'}
                </>
              )}
            </h2>
            {donations.map((donation) => (
              <Petition
                key={donation.id}
                id={donation.id}
                title={donation.title}
                description={donation.description}
                link={donation.link}
                img={donation.banner_img_url}
                type={donation.type.type}
                path="donate"
              />
            ))}
          </Wrapper>
        </>
      )}
    </>
  );
};

export default Donations;

Donations.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      identifier: PropTypes.string
    }).isRequired
  }).isRequired
};
