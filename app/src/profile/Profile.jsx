import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import ProfileStyles from './profile.style';
import user from '../../public/images/user_stub.jpg';

const Profile = props => (
  <ProfileStyles>
    <div className="profile-image">
      <img
        src={user}
        alt="User profile"
        className="user-profile-pic"
      />
    </div>
    <div className="profile-content">
      <div className="profile-email">
        <p>{props.user.loaded.email}</p>
        <Button>edit profile</Button>
      </div>
      <div className="user-name">
        <span>{props.user.loaded.firstName}</span>
        <span>{props.user.loaded.lastName}</span>
      </div>
      <div className="reviews">
        <span>&#9733;</span>
        <span>&#9733;</span>
        <span>&#9733;</span>
        <span>&#9733;</span>
        <span>&#9733;</span>
      </div>
    </div>
  </ProfileStyles>
);

Profile.propTypes = {
  user: PropTypes.shape({
    loaded: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
    }),
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Profile);
