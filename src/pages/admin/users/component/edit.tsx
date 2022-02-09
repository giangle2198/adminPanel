import { useIntl } from 'umi';
import { Form, Button, Card, Row, Typography } from 'antd';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Page404 from '@/pages/404';
import EditUserModal from './edit_user_modal';
import { getParamsQuery, SortView } from '@/components/Constants/util';
import { DeleteUser, GetUserDetail } from '@/services/user/user';
import { NotificationStatus, Status, titleLevel } from '@/components/Constants/constants';
import { NotificationMessage } from '@/components/Notification/notification';
import { PageLoading } from '@ant-design/pro-layout';
import LoadingOverlay from '@/components/PageLoading/loadingOverLay';
import { RenderColLabelByType, Type } from '@/components/Constants/generalForm';
import PageHeaderContainer from '@/components/PageContainer/pageContainer';
import useRouter from '@/components/RouterHook/routerHook';

const { Title } = Typography;

const ViewUser = {
  domain: 1,
  display_name: 6,
  last_name: 3,
  first_name: 4,
  full_name: 5,
  phone_number: 7,
  email: 8,
};

const Edit: React.FC = () => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [user, setUser] = useState([] as any);
  const [modalVisibleEditUser, setModalVisibleEditUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const DOMAIN = getParamsQuery().domain;
  const [isShowLoading, setIsShowLoading] = useState(false);
  const showLoading = useCallback((isShowing: boolean) => {
    setIsShowLoading(isShowing);
  }, []);
  const router = useRouter();

  // Get data from API
  const getDisplayUser = async (domain: any) => {
    setIsLoading(true);
    let err;
    let resUserAll: any[] = [];
    await Promise.all([GetUserDetail({ domain })])
      .then((values) => {
        resUserAll = values;
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

    const [userDetail] = resUserAll;

    if (userDetail.status_code !== Status.DONE) {
      NotificationMessage(NotificationStatus.FAIL, intl);
      setIsLoading(false);
      return;
    }

    setUser(userDetail.user_details);
    setIsLoading(false);
  };

  const getUserDetail = async (domain: string) => {
    showLoading(true);
    let err;
    const res = (await GetUserDetail({ domain }).catch((errOut) => {
      err = errOut;
    })) as API.GetUserDetailResponse;

    if (err || res.status_code !== Status.DONE) {
      showLoading(false);
      // setIsServiceFailed(true);
      return;
    }

    if (res.status_code === Status.DONE) {
      showLoading(false);
      setUser(res.user_details);
      return;
    }

    showLoading(false);
    // setIsServiceFailed(true);
  };

  // Initial
  useEffect(() => {
    getDisplayUser(DOMAIN);
  }, []);

  // Sort View
  const getSortedView = (tmpClient: any) => {
    return SortView(Object.keys(tmpClient), ViewUser);
  };

  // Show Pop-up Roles
  // const showModelRoles = () => setModelVisible(true);

  const showEditUserModal = () => setModalVisibleEditUser(true);

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

  // const copyRoleModal = useMemo(
  //   () => (
  //     <CopyRoleModal
  //       visible={modalVisibleCopyRole}
  //       setVisible={setModalVisibleCopyRole}
  //       setModalUserRoles={() => getDisplayUser(DOMAIN)}
  //       showLoading={showLoading}
  //     />
  //   ),
  //   [modalVisibleCopyRole],
  // );

  const editUserModal = useMemo(
    () => (
      <EditUserModal
        setVisible={setModalVisibleEditUser}
        visible={modalVisibleEditUser}
        userData={user}
        getUserDetail={getUserDetail}
      />
    ),
    [modalVisibleEditUser],
  );

  const deleteUser = async (userID: number) => {
    showLoading(true);
    let err;
    const res = (await DeleteUser({ user_id: userID || 0, domain: String(DOMAIN) }).catch(
      (errOut) => {
        err = errOut;
      },
    )) as API.BaseResponseModel;

    if (err || res.status_code !== Status.DONE) {
      NotificationMessage(NotificationStatus.FAIL, intl);
      showLoading(false);
      return;
    }

    NotificationMessage(NotificationStatus.SUCCESS, intl);
    showLoading(false);
    router.push('/admin/users/inquiry');
  };

  return (
    (!DOMAIN && <Page404 />) ||
    (isLoading && <PageLoading />) || (
      <PageHeaderContainer>
        <Card className="">
          <Title level={titleLevel}>
            {intl.formatMessage({ id: 'pages.detail' })}
            <Button onClick={showEditUserModal} style={{ marginLeft: '10px' }}>
              <EditOutlined />
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => deleteUser(user.id)}
              style={{ marginLeft: '10px' }}
            >
              <DeleteOutlined />
            </Button>
          </Title>
          <Form form={form} className="">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {getSortedView(user).map((value: any) => {
                if (value === 'is_active') {
                  return (
                    <RenderColLabelByType
                      key={value}
                      value={String(user[value])}
                      name={value}
                      type={Type.checkbox}
                    />
                  );
                }
                return <RenderColLabelByType name={value} key={value} value={user[value]} />;
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
                  title={intl.formatMessage({ id: 'pages.copy_role_other_user' })}
                >
                  <Button key="2" onClick={showModalCopyRole} style={{ marginLeft: 5 }}>
                    <CopyrightOutlined />
                  </Button>
                </Tooltip>
              </Col>
            </Row>
            <Table
              columns={columnsTableUser}
              dataSource={userRoles}
              scroll={getTableSize()}
              pagination={
                (getSetting('pagination') &&
                  getSetting('pagination') !== '0' && { pageSize: getSetting('pagination') }) ||
                false
              }
            /> */}
        </Card>
        {/* {modalVisible && editRolesModal} */}

        {modalVisibleEditUser && editUserModal}

        {isShowLoading && <LoadingOverlay showing={isShowLoading} show={showLoading} />}
      </PageHeaderContainer>
    )
  );
};

export default Edit;
export { ViewUser };
