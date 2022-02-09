import React from 'react';
import { useIntl } from 'umi';
import { Form, Input, Button } from 'antd';

interface SearchUserComponentProps {
  seachAction: any;
}
const layoutFrom = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };
const layoutBtn = { wrapperCol: { span: 6 } };
const SearchUserComponent: React.FC<SearchUserComponentProps> = (
  props: SearchUserComponentProps,
) => {
  const [form] = Form.useForm();
  const intl = useIntl();

  const searchActionUser = (input: string) => {
    props.seachAction(input);
  };

  return (
    <Form
      {...layoutFrom}
      form={form}
      hideRequiredMark
      onFinish={(values) => searchActionUser(values.domain)}
    >
      <Form.Item name="domain" label={intl.formatMessage({ id: 'pages.domain' })}>
        <Input />
      </Form.Item>
      <Form.Item
        {...layoutBtn}
        style={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button htmlType="submit" type="primary">
          {intl.formatMessage({ id: 'button.search' })}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchUserComponent;
