import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocationStyles from './locations.style';

export default class Locations extends Component {
  render() {
    const { locations } = this.props;

    return (
      <LocationStyles>
        <h2>Locations</h2>
        {locations.length <= 0 ?
          <div className="no-locations">
              No locations
          </div> :
            locations.map(location => (
              <div key={location.id}>
                <h2>
                  {location.name}
                </h2>
              </div>
            ))
        }
      </LocationStyles>
    );
  }
}

Locations.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

