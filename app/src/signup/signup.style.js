import styled from 'styled-components';

const SignupStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 100px;

  .signup-box {
    padding: 50px;
    background-color: #fff;
    min-width: 500px;
    min-height: 500px;
    border: 1px solid #dbdbdb;
  }

  .signup-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
  }

  .signup-header a {
    display: flex;
    padding-right: 30px;
  }

  .signup-header a:focus {
    text-decoration: none;
  }

  .signup-box h2 {
    text-align: center;
    color: #484848;
    margin-bottom: 0;
    padding-top: 0.5em;
    padding-left: 10px;
    font-size: 1.9em;
  }

  .signup-type {
    display: flex;
    flex-direction: column;
    padding: 75px 30px;
  }

  .signup-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 30px;
  }

  .button-box {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 10px;
    margin: 10px 10px 10px 10px;
    text-align: center;
    box-shadow: 0px 4px 6px 0px rgba(151,160,191,0.3);
    border-radius: 7px;
    max-width: 300px;
    background-color: #f9fbfd;
    cursor: pointer;
  }

  .button-box:hover {
    color: #ff5a5f;
    transition: 0.2s;
  }

  .signup-type a {
    color: #ff5a5f;
  }

  .simple-button {
    border: none;
    color: #ff5a5f;
    padding: 0;
    padding-left: 10px;
  }

  .simple-button:hover {
    border: none;
  }
`;

export default SignupStyles;
