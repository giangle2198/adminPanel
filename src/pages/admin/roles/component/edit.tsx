import { useIntl } from 'umi';
import { Form, Button, Card, Row, Typography } from 'antd';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Page404 from '@/pages/404';
import EditRoleModal from './edit_role_modal';
import { getParamsQuery, SortView } from '@/components/Constants/util';
import { NotificationStatus, Status, titleLevel } from '@/components/Constants/constants';
import { NotificationMessage } from '@/components/Notification/notification';
import { PageLoading } from '@ant-design/pro-layout';
import LoadingOverlay from '@/components/PageLoading/loadingOverLay';
import { RenderColLabelByType, Type } from '@/components/Constants/generalForm';
import PageHeaderContainer from '@/components/PageContainer/pageContainer';
import { DeleteRole, GetRoleDetail } from '@/services/role/role';
import useRouter from '@/components/RouterHook/routerHook';

const { Title } = Typography;

const ViewRole = {
  role_id: 0,
  role_name: 1,
  role_description: 2,
  role_manager_domain: 3,
  role_alias: 4,
  is_active: 5,
};

const EditRole: React.FC = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const router = useRouter();
  const [role, setRole] = useState([] as any);
  const [modalVisibleEditRole, setModalVisibleEditRole] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const RoleID = getParamsQuery().role_id;
  const [isShowLoading, setIsShowLoading] = useState(false);
  const showLoading = useCallback((isShowing: boolean) => {
    setIsShowLoading(isShowing);
  }, []);

  // Get data from API
  const getDisplayRole = async () => {
    setIsLoading(true);
    let err;
    let resRoleAll: any[] = [];
    await Promise.all([GetRoleDetail({ role_id: String(RoleID) })])
      .then((values) => {
        resRoleAll = values;
      })
      .catch((outErr) => {
        err = outErr;
      });
    if (err) {
      NotificationMessage(NotificationStatus.FAIL, intl);
      // Logger.Error(err);
      setIsLoading(false);
      return;
    }

    const [RoleDetail] = resRoleAll;

    if (RoleDetail.status_code !== Status.DONE) {
      NotificationMessage(NotificationStatus.FAIL, intl);
      setIsLoading(false);
      return;
    }

    setRole(RoleDetail.role_detail);
    setIsLoading(false);
  };

  const getRoleDetail = async (roleID: string) => {
    showLoading(true);
    let err;
    const res = (await GetRoleDetail({ role_id: String(roleID) }).catch((errOut) => {
      err = errOut;
    })) as API.GetRoleDetailResponse;

    if (err || res.status_code !== Status.DONE) {
      showLoading(false);
      return;
    }

    setRole(res.role_detail);
    showLoading(false);
    // setIsServiceFailed(true);
  };

  // Initial
  useEffect(() => {
    getDisplayRole();
  }, []);

  // Sort View
  const getSortedView = (tmpClient: any) => {
    if (tmpClient) {
      return SortView(Object.keys(tmpClient), ViewRole);
    }
    return [];
  };

  // Show Pop-up Roles
  // const showModelRoles = () => setModelVisible(true);

  const showEditRoleModal = () => setModalVisibleEditRole(true);

  // const showModalCopyRole = () => setModalVisibleCopyRole(true);

  // const columnsTableUser = [
  //   {
  //     title: intl.formatMessage({ id: 'pages.role_name' }),
  //     dataIndex: 'role_name',
  //     key: 'role_name',
  //   },
  //   {
  //     title: intl.formatMessage({ id: 'pages.role_description' }),
  //     dataIndex: 'role_description',
  //     key: 'role_description',
  //   },
  //   {
  //     title: intl.formatMessage({ id: 'pages.role_manager_domain' }),
  //     dataIndex: 'role_manager_domain',
  //     key: 'role_manager_domain',
  //   },
  //   {
  //     title: intl.formatMessage({ id: 'pages.role_alias' }),
  //     dataIndex: 'role_alias',
  //     key: 'role_alias',
  //   },
  // ];

  // const editRolesModal = useMemo(
  //   () => (
  //     <EditRolesModel
  //       visible={modalVisible}
  //       setVisible={setModelVisible}
  //       setModalUserRoles={() => getDisplayUser(DOMAIN)}
  //       showLoading={showLoading}
  //     />
  //   ),
  //   [modalVisible],
  // );

  const editRoleModal = useMemo(
    () => (
      <EditRoleModal
        setVisible={setModalVisibleEditRole}
        visible={modalVisibleEditRole}
        roleData={role}
        getRoleDetail={getRoleDetail}
      />
    ),
    [modalVisibleEditRole],
  );

  const deleteRole = async (roleID: number) => {
    showLoading(true);
    let err;
    const res = (await DeleteRole({ id: roleID }).catch((errOut) => {
      err = errOut;
    })) as API.BaseResponseModel;

    if (err || res.status_code !== Status.DONE) {
      NotificationMessage(NotificationStatus.FAIL, intl);
      showLoading(false);
      return;
    }

    NotificationMessage(NotificationStatus.SUCCESS, intl);
    showLoading(false);
    router.push('/admin/roles/inquiry');
  };

  return (
    (!RoleID && <Page404 />) ||
    (isLoading && <PageLoading />) || (
      <PageHeaderContainer>
        <Card className="">
          <Title level={titleLevel}>
            {intl.formatMessage({ id: 'pages.detail' })}
            <Button onClick={showEditRoleModal} style={{ marginLeft: '10px' }}>
              <EditOutlined />
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => deleteRole(Number(RoleID))}
              style={{ marginLeft: '10px' }}
            >
              <DeleteOutlined />
            </Button>
          </Title>
          <Form form={form} className="">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {getSortedView(role).map((value: any) => {
                if (value === 'is_active') {
                  return (
                    <RenderColLabelByType
                      key={value}
                      value={String(role[value])}
                      name={value}
                      type={Type.checkbox}
                    />
                  );
                }
                return (
                  <RenderColLabelByType name={value} key={value} value={role[value]} page="role" />
                );
              })}
            </Row>
          </Form>
          {/* <Row gutter={[8, 8]}>
              <Col>
                <Title level={titleLevel}>{intl.formatMessage({ id: 'pages.roles' })}</Title>
              </Col>
              <Col>
                <Button onClick={showModelRoles} key="1">
                  <EditOutlined />
                </Button>
                <Tooltip
                  placement="topLeft"
                  title={intl.formatMessage({ id: 'pages.copy_role_other_Role' })}
                >
                  <Button key="2" onClick={showModalCopyRole} style={{ marginLeft: 5 }}>
                    <CopyrightOutlined />
                  </Button>
                </Tooltip>
              </Col>
            </Row>
            <Table
              columns={columnsTableRole}
              dataSource={RoleRoles}
              scroll={getTableSize()}
              pagination={
                (getSetting('pagination') &&
                  getSetting('pagination') !== '0' && { pageSize: getSetting('pagination') }) ||
                false
              }
            /> */}
        </Card>
        {/* {modalVisible && editRolesModal} */}

        {modalVisibleEditRole && editRoleModal}

        {isShowLoading && <LoadingOverlay showing={isShowLoading} show={showLoading} />}
      </PageHeaderContainer>
    )
  );
};

export default EditRole;
export { ViewRole };
