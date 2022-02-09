import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import * as styles from './index.less';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
  });

  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.footer}>
      <a className={styles.icon} href="https://gitlab.com/booking8" target="_blank">
        <GithubOutlined />
      </a>
      &copy; {`${currentYear} ${defaultMessage}`}
    </div>
  );
};

export default Footer;
