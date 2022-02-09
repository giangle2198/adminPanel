import type { ActionTypesFn } from '@/components/Constants/constants';
import { NotificationStatus, Status } from '@/components/Constants/constants';
import { RenderColLabelInputByType, TypeGenInput } from '@/components/Constants/generalInput';
import { getParamsQuery, SortView } from '@/components/Constants/util';
import { NotificationMessage } from '@/components/Notification/notification';
import LoadingOverlay from '@/components/PageLoading/loadingOverLay';
import { UpdateRole } from '@/services/role/role';
import { Button, Form, Modal, Row } from 'antd';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'umi';
import { ViewRole } from './edit';

interface IEditRoleModal {
  visible: boolean;
  setVisible: ActionTypesFn<boolean, void>;
  roleData: API.RoleDetailModel;
  getRoleDetail: ActionTypesFn<string, void>;
}

const EditRoleModal: React.FC<IEditRoleModal> = (props: IEditRoleModal) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [isShowLoading, setIsShowLoading] = useState(false);

  const showLoading = useCallback((isShowing: boolean) => {
    setIsShowLoading(isShowing);
  }, []);

  const onSave = async () => {
    showLoading(true);
    let err;
    const values: API.RoleDetailModel = form.getFieldsValue();
    const paramsRequest = {
      id: values.role_id || ' ',
      is_active: values.is_active || false,
      role_alias: values.role_alias || ' ',
      role_description: values.role_description || ' ',
      role_manager_domain: values.role_manager_domain || ' ',
      role_name: values.role_name || ' ',
    } as API.UpdateRoleRequest;
    const res = (await UpdateRole({ ...paramsRequest }).catch((errOut) => {
      err = errOut;
    })) as API.BaseResponseModel;

    if (err || (res && res.status_code !== Status.DONE)) {
      NotificationMessage((res && res.reason_code) || NotificationStatus.FAIL, intl);
      showLoading(false);
      props.setVisible(false);
      return;
    }

    if (res && res.status_code === Status.DONE) {
      const { role_id } = getParamsQuery();
      props.getRoleDetail(String(role_id));
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
    role_id: TypeGenInput.input,
    role_name: TypeGenInput.input,
    is_active: TypeGenInput.checkbox,
    role_alias: TypeGenInput.input,
    role_description: TypeGenInput.input,
    role_manager_domain: TypeGenInput.input,
  };

  const BanedEdit = {
    role_id: true,
    role_name: true,
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
          {SortView(Object.keys(props.roleData), ViewRole).map((value: any) => {
            if (IncludedUserDetail[value] === TypeGenInput.checkbox) {
              return (
                <RenderColLabelInputByType
                  key={value}
                  data={props.roleData[value]}
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
                data={props.roleData[value] || []}
                type={IncludedUserDetail[value]}
                name={value}
                page="role"
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

export default EditRoleModal;
