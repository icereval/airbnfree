import styled from 'styled-components';

const LocationStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .h1 {
    color: #03d4bf;
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

  .location-box:hover {
    cursor: pointer;
  }
`;

export default LocationStyles;
