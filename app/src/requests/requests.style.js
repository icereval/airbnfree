import styled from 'styled-components';

const LocationStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .h1 {
    color: #03d4bf;
  }

  .approved h2 {
    color: #03d4bf
  }

  .denied h2 {
    color: #ff5a5f;
  }

  .pending h2 {
    color: #ffc05a;
  }

  .locations-list {
    display: flex;
  }

  .location-box {
    flex-direction: column;
    padding: 20px;
    margin: 10px 10px 10px 10px;
    box-shadow: 0px 4px 6px 0px rgba(151,160,191,0.3);
    border-radius: 7px;
    max-width: 300px;
    background-color: #fff;
  }

  .reviews {
    color: #03d4bf;
  }

  .reviews span {
    padding: 2px;
  }

  .buttons {
    padding: 10px;
    padding-left: 2px;
  }

  .buttons .ant-btn {
    margin-right: 12px;
  }
`;

export default LocationStyles;
