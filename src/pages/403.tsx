import { Button, Result } from 'antd';
import React from 'react';
import { history, useIntl } from 'umi';

const NoAuthoriztionPage: React.FC = () => {
  const intl = useIntl();
  return (
    <Result
      status="403"
      title="403"
      subTitle={intl.formatMessage({ id: 'component.user.message_authorization' })}
      extra={
        <div>
          <Button type="primary" onClick={() => history.push('/')}>
            {intl.formatMessage({ id: 'component.user.back_home' })}
          </Button>
          &nbsp;
          <Button type="primary" onClick={() => window.location.reload()}>
            {intl.formatMessage({ id: 'component.user.reload' })}
          </Button>
        </div>
      }
    />
  );
};

export default NoAuthoriztionPage;
