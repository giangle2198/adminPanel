import type { ActionTypesFn } from '@/components/Constants/constants';
import { NotificationStatus, Status } from '@/components/Constants/constants';
import { RenderColLabelInputByType, TypeGenInput } from '@/components/Constants/generalInput';
import { getParamsQuery, SortView } from '@/components/Constants/util';
import { NotificationMessage } from '@/components/Notification/notification';
import LoadingOverlay from '@/components/PageLoading/loadingOverLay';
import { UpdateUser } from '@/services/user/user';
import { Button, Form, Modal, Row } from 'antd';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'umi';
import { ViewUser } from './edit';

interface IEditUserModal {
  visible: boolean;
  setVisible: ActionTypesFn<boolean, void>;
  userData: API.UserDetailModel;
  getUserDetail: ActionTypesFn<string, void>;
}

const EditUserModal: React.FC<IEditUserModal> = (props: IEditUserModal) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [isShowLoading, setIsShowLoading] = useState(false);

  const showLoading = useCallback((isShowing: boolean) => {
    setIsShowLoading(isShowing);
  }, []);

  const onSave = async () => {
    showLoading(true);
    let err;
    const values: API.UserDetailModel = form.getFieldsValue();
    const paramsRequest = {
      full_name: values.full_name || ' ',
      email: values.email || ' ',
      first_name: values.first_name || ' ',
      last_name: values.last_name || ' ',
      phone_number: values.phone_number || ' ',
      domain: values.domain || ' ',
      address: values.address || ' ',
      is_active: values.is_active,
    } as API.UserDetailModel;
    const res = (await UpdateUser({ ...paramsRequest }).catch((errOut) => {
      err = errOut;
    })) as API.BaseResponseModel;

    if (err || (res && res.status_code !== Status.DONE)) {
      NotificationMessage((res && res.reason_code) || NotificationStatus.FAIL, intl);
      showLoading(false);
      props.setVisible(false);
      return;
    }

    if (res && res.status_code === Status.DONE) {
      const { domain } = getParamsQuery();
      props.getUserDetail(String(domain));
      NotificationMessage((res && res.reason_code) || NotificationStatus.SUCCESS, intl);
      showLoading(false);
      props.setVisible(false);
      return;
    }

    NotificationMessage((res && res.reason_code) || NotificationStatus.FAIL, intl);
    showLoading(false);
    props.setVisible(false);
  };
  const onCancel = () => {
    props.setVisible(false);
  };

  const IncludedUserDetail = {
    full_name: TypeGenInput.input,
    email: TypeGenInput.input,
    first_name: TypeGenInput.input,
    last_name: TypeGenInput.input,
    phone_number: TypeGenInput.input,
    domain: TypeGenInput.input,
    address: TypeGenInput.input,
    is_active: TypeGenInput.checkbox,
  };

  const BanedEdit = {
    domain: true,
    first_login_date: true,
    employee_id: true,
  };

  return (
    <Modal
      title={intl.formatMessage({ id: 'modal.edit' })}
      closable
      onOk={onSave}
      onCancel={onCancel}
      visible={props.visible}
      width="80%"
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {intl.formatMessage({ id: 'button.cancel' })}
        </Button>,
        <Button key="save" type="primary" onClick={onSave}>
          {intl.formatMessage({ id: 'button.save' })}
        </Button>,
      ]}
    >
      <Form form={form}>
        <Row>
          {SortView(Object.keys(props.userData), ViewUser).map((value: any) => {
            if (IncludedUserDetail[value] === TypeGenInput.checkbox) {
              return (
                <RenderColLabelInputByType
                  key={value}
                  data={props.userData[value]}
                  type={IncludedUserDetail[value]}
                  name={value}
                  page="user"
                  span={12}
                  disabled={BanedEdit[value] || false}
                />
              );
            }
            return (
              <RenderColLabelInputByType
                key={value}
                data={props.userData[value] || []}
                type={IncludedUserDetail[value]}
                name={value}
                page="user"
                span={12}
                disabled={BanedEdit[value] || false}
              />
            );
          })}
        </Row>
      </Form>
      {isShowLoading && <LoadingOverlay showing={isShowLoading} show={showLoading} />}
    </Modal>
  );
};

export default EditUserModal;
