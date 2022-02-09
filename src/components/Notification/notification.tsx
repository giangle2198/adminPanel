import { notification } from 'antd';
import { NotificationStatus } from '../Constants/constants';

const NotificationMessage = (message: any, intl: any, value = '') => {
  switch (message) {
    case NotificationStatus.SUCCESS:
      return notification.success({
        message: `${intl.formatMessage({ id: 'notification.success' })} ${value}!`,
        description: '',
      });
    case NotificationStatus.FAIL:
      return notification.error({
        message: `${intl.formatMessage({ id: 'notification.fail' })} ${value}!`,
        description: '',
      });
    default:
      return notification.info({
        message: `${message}`,
        description: '',
      });
  }
};

export { NotificationMessage };
