import { getTableSize } from '@/components/Constants/generalTable';
import PageHeaderContainer from '@/components/PageContainer/pageContainer';
import LoadingOverlay from '@/components/PageLoading/loadingOverLay';
import { getSetting } from '@/components/Setting';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Table } from 'antd';
import React, { useEffect, useReducer } from 'react';
import { useIntl } from 'umi';
import CreateRoleModal from './component/create_role_modal';
import type { TableListRoleProps } from './component/table_roles';
import { TableListRole } from './component/table_roles';
import CActionHandlerRole from './controller/action';
import { InitialStateRole } from './controller/dto';
import { ReducerRole } from './controller/reducer';

const RoleManagement: React.FC = () => {
  const intl = useIntl();
  const [state, dispatch] = useReducer(ReducerRole, InitialStateRole);
  const actionHandlerRole = new CActionHandlerRole(dispatch, intl);

  useEffect(() => {
    actionHandlerRole.handleSearchRole();
  }, [state.visibleCreateModal]);

  return (
    <PageHeaderContainer>
      <Card>
        <Button
          type="primary"
          style={{ marginRight: '8px', marginBottom: '10px' }}
          onClick={() => actionHandlerRole.hanldeVisible(true)}
        >
          <PlusCircleOutlined />
        </Button>
        <Table
          rowKey={(key) => key.email}
          columns={TableListRole({
            data: state.roles,
          } as TableListRoleProps)}
          dataSource={state.roles}
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
          <CreateRoleModal
            setVisible={actionHandlerRole.hanldeVisible}
            visible={state.visibleCreateModal}
          />
        )}
      </Card>
    </PageHeaderContainer>
  );
};

export default RoleManagement;
