import styled from 'styled-components';

const LoginStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 100px;

  .login-box {
    padding: 50px;
    background-color: #fff;
    min-width: 500px;
    min-height: 500px;
    border: 1px solid #dbdbdb;
  }

  .login-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
  }

  .login-header a {
    display: flex;
  }

  .login-header a:focus {
    text-decoration: none;
  }

  .login-box h2 {
    text-align: center;
    color: #484848;
    margin-bottom: 0;
    padding-top: 0.5em;
    padding-left: 10px;
    font-size: 1.9em;
    font-weight: 200;
  }

  .login-box a {
    color: #ff5a5f;
  }
`;

export default LoginStyles;
