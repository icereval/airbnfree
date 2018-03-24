import React from 'react';
import { Spin, Icon } from 'antd';
import LoadingStyles from './loading.style';

const icon = <Icon type="loading" style={{ fontSize: 30 }} spin />;

const DashboardLoader = () => (
  <LoadingStyles>
    <Spin className="dashboard-loader" indicator={icon} />
  </LoadingStyles>
);

export default DashboardLoader;
