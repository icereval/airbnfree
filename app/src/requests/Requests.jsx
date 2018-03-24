import React from 'react';
import PropTypes from 'prop-types';

const Requests = props => (
  <div>
    {props.locations.length === 0 ? null :
    <div>
      <h2>Requests</h2>
      <h3>{props.explanation}</h3>
    </div>
    }
  </div>
);

Requests.propTypes = {
  explanation: PropTypes.string,
  locations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

Requests.defaultProps = {
  explanation: '',
};

export default Requests;
