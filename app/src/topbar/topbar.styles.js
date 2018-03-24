import styled from 'styled-components';

const TopbarStyles = styled.div`
  .topbar {
    display: flex;
    position: fixed;
    align-items: center;
    width: 100%;
    background-color: #fff;
    padding: 0 75px;
    z-index: 5;
    border-bottom: 1px solid #eaeaea;
    height: 75px;
  }

  .topbar-logo {
    display: flex;
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
  }

  .topbar-logo h2 {
    color: #484848;
    margin-bottom: 0;
    padding-left: 10px;
  }

  .topbar-links {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    height: 100%;
  }

  .topbar-links a {
    padding: 27px 10px 0 10px;
    color: #909aaf;
  }

  .topbar-links a:focus {
    text-decoration: none;
    border-bottom: 2px solid #ff5a5f;
  }

  .topbar-links a:hover {
    border-bottom: 2px solid #ff5a5f;
    cursor: pointer;
  }
`;

export default TopbarStyles;
