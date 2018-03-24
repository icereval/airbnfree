import styled from 'styled-components';

const ProfileStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 150px 100px;

  .user-profile-pic {
    width: 150px;
    height: 150px;
    border-radius: 100%;
  }

  .ant-btn {
    background-color: #f9fbfd;
  }

  .profile-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 29px;
  }

  .profile-email {
    display: flex;
    align-items: center; 
  }

  .profile-email p {
    margin-bottom: 0;
    font-size: 1.6em;
    padding-right: 20px;
  }

  .user-name {
    padding: 12px 0;
  }

  .user-name span {
    padding-right: 5px;
    font-weight: 600;
    font-size: 1.2em;
  }

  .reviews {
    color: #03d4bf;
    font-size: 1.2em;
  }

  .reviews span {
    padding-top: 12px;
    padding-bottom: 2px;
  }
`;

export default ProfileStyles;
