import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocationStyles from './locations.style';

export default class Locations extends Component {
  render() {
    const { locations } = this.props;

    return (
      <LocationStyles>
        <h1>{this.props.title}</h1>
        {locations.length <= 0 ?
          <div className="no-locations">
              No locations
          </div> :
          <div className="locations-list">
            {locations.map(location => (
              <div
                onClick={this.props.selectLocaton}
                onKeyPress={this.props.selectLocaton}
                role="presentation"
                className="location-box"
                key={location.id}
              >
                <h2>
                  {location.name}
                </h2>
                <p>{location.description}</p>
                <p>{location.address}</p>
                <div className="reviews">
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                </div>
              </div>
            ))}
          </div>
      }
      </LocationStyles>
    );
  }
}

Locations.propTypes = {
  title: PropTypes.string,
  locations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectLocaton: PropTypes.func,
};

Locations.defaultProps = {
  title: '',
  selectLocaton: () => {},
};

