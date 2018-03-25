import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RequestStyles from './requests.style';

export default class Requests extends Component {
  render() {
    const { stays } = this.props;

    return (
      <RequestStyles>
        <h1>{this.props.title}</h1>
        {stays.length <= 0 ?
          <div className="no-locations">
              No requests
          </div> :
          <div className="locations-list">
            {stays.map(stay => (
              <div
                onClick={this.props.stayAction}
                onKeyPress={this.props.stayAction}
                role="presentation"
                className="location-box"
                key={stay.id}
              >
                <h2>
                  {stay.client.user.firstName}
                  &nbsp; {stay.client.user.lastName}
                </h2>
                <p>{stay.description}</p>
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
      </RequestStyles>
    );
  }
}

Requests.propTypes = {
  title: PropTypes.string,
  stays: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  stayAction: PropTypes.func,
};

Requests.defaultProps = {
  title: '',
  stayAction: () => {},
};

