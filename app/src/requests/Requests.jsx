import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import RequestStyles from './requests.style';

export default class Requests extends Component {
  getApproval(approval) {
    switch (approval) {
      case 'casemanager-approved':
        return 'approved';
      case 'casemanager-denied':
      case 'host-denied':
        return 'denied';
      default:
        return 'pending';
    }
  }

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
                className={`location-box ${this.getApproval(stay.state)}`}
                key={stay.id}
              >
                <h2>
                  {stay.client.user.firstName}
                  &nbsp; {stay.client.user.lastName}
                </h2>
                <h3>
                  {stay.location.name}
                </h3>
                <p>{stay.description}</p>
                <div className="reviews">
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                  <span>&#9733;</span>
                </div>
                <div className="buttons">
                  {this.props.isUser ? null :
                  <div>
                    <Button onClick={() => { this.props.requestAction(stay.id); }}>
                      Approve
                    </Button>
                    <Button onClick={() => { this.props.denyAction(stay.id); }}>
                    Deny
                    </Button>
                  </div>
                }
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
  isUser: PropTypes.bool,
  requestAction: PropTypes.func,
  denyAction: PropTypes.func,
};

Requests.defaultProps = {
  title: '',
  isUser: false,
  requestAction: () => {},
  denyAction: () => {},
};

