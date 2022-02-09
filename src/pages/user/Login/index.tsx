import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { useIntl, history, FormattedMessage, SelectLang, useModel } from 'umi';
import Footer from '@/components/Footer';
import styles from './index.less';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Login } from '@/services/user/user';

const LoginPage: React.FC = () => {
  // const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: API.DoLoginRequest) => {
    try {
      console.log(values);
      const msg = await Login({
        ...values,
      });
      if (msg) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        console.log(query, redirect);
        history.push(redirect || '/');
        return;
      }
      //   console.log(msg);
      //   setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
      });
      message.error(defaultLoginFailureMessage);
    }
  };
  // const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <img src="/logo1.svg" />
          <h2>Management System</h2>
        </div>
        <div className={styles.form}>
          <Form
            title="Management System"
            initialValues={{
              remember: true,
            }}
            onFinish={async (values) => {
              await handleSubmit(values as API.DoLoginRequest);
            }}
          >
            <>
              <Form.Item
                name="domain"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.login.username.required" />,
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.login.password.required" />,
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
            </>
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a
                  className="login-form-forgot"
                  href=""
                  style={{
                    float: 'right',
                  }}
                >
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{
                    width: '100%',
                  }}
                >
                  Log in
                </Button>
                Or <a href="">register now!</a>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
