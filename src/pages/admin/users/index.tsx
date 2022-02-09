import { getTableSize } from '@/components/Constants/generalTable';
import PageHeaderContainer from '@/components/PageContainer/pageContainer';
import LoadingOverlay from '@/components/PageLoading/loadingOverLay';
import { getSetting } from '@/components/Setting';
import { Button, Card, Form, Input, Table } from 'antd';
import React, { useReducer } from 'react';
import { useIntl } from 'umi';
import CreateUserModal from './component/create_user_modal';
import type { TableListUserProps } from './component/table_users';
import { TableListUser } from './component/table_users';
import CActionHandlerUser from './controller/action';
import type { ISearchUser } from './controller/dto';
import { InitialStateUser } from './controller/dto';
import { ReducerUser } from './controller/reducer';

const UserManagement: React.FC = () => {
  const [form] = Form.useForm();
  const intl = useIntl();
  const [state, dispatch] = useReducer(ReducerUser, InitialStateUser);
  const actionHandlerUser = new CActionHandlerUser(dispatch, intl);

  const handleSubmit = async (values: ISearchUser) => {
    actionHandlerUser.handleSearchUser(values);
  };

  return (
    <PageHeaderContainer>
      <Card>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          form={form}
          onFinish={(value) => {
            handleSubmit(value);
          }}
        >
          <Form.Item name="domain" label={intl.formatMessage({ id: 'pages.domain' })}>
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 8 }} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              loading={state.submiting}
              type="primary"
              htmlType="submit"
              style={{ marginRight: '8px' }}
            >
              {intl.formatMessage({ id: 'button.search' })}
            </Button>
            <Button
              type="primary"
              style={{ marginRight: '8px' }}
              onClick={() => actionHandlerUser.hanldeVisible(true)}
            >
              {intl.formatMessage({ id: 'button.create' })}
            </Button>
          </Form.Item>
        </Form>
        <Table
          rowKey={(key) => key.email}
          columns={TableListUser({
            data: state.users,
          } as TableListUserProps)}
          dataSource={state.users}
          scroll={getTableSize()}
          pagination={
            (getSetting('pagination') &&
              getSetting('pagination') !== '0' && { pageSize: getSetting('pagination') }) ||
            false
          }
        />
        {state.isShowLoading && (
          <LoadingOverlay showing={state.isShowLoading} show={state.showLoading} />
        )}
        {state.visibleCreateModal && (
          <CreateUserModal
            setVisible={actionHandlerUser.hanldeVisible}
            visible={state.visibleCreateModal}
          />
        )}
      </Card>
    </PageHeaderContainer>
  );
};

export default UserManagement;
