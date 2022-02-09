import type { ActionTypesFn } from '@/components/Constants/constants';
import { NotificationStatus, Status } from '@/components/Constants/constants';
import { RenderColLabelInputByType, TypeGenInput } from '@/components/Constants/generalInput';
import { SortView } from '@/components/Constants/util';
import { NotificationMessage } from '@/components/Notification/notification';
import LoadingOverlay from '@/components/PageLoading/loadingOverLay';
import { CreateRole } from '@/services/role/role';
import { Button, Form, Modal, Row } from 'antd';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'umi';
import { ViewRole } from './edit';

interface ICreateRoleModal {
  visible: boolean;
  setVisible: ActionTypesFn<boolean, void>;
}

const CreateRoleModal: React.FC<ICreateRoleModal> = (props: ICreateRoleModal) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [isShowLoading, setIsShowLoading] = useState(false);

  const showLoading = useCallback((isShowing: boolean) => {
    setIsShowLoading(isShowing);
  }, []);

  const onCreate = async () => {
    showLoading(true);
    let err;
    const values: API.CreateRoleRequest = form.getFieldsValue();
    const paramsRequest = {
      role_alias: values.role_alias || ' ',
      role_description: values.role_description || ' ',
      role_manager_domain: values.role_manager_domain || ' ',
      role_name: values.role_name || ' ',
    } as API.CreateRoleRequest;
    const res = (await CreateRole({ ...paramsRequest }).catch((errOut) => {
      err = errOut;
    })) as API.BaseResponseModel;

    if (err || (res && res.status_code !== Status.DONE)) {
      NotificationMessage((res && res.reason_code) || NotificationStatus.FAIL, intl);
      showLoading(false);
      props.setVisible(false);
      return;
    }

    if (res && res.status_code === Status.DONE) {
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

  const IncludedRole = {
    role_name: TypeGenInput.input,
    role_description: TypeGenInput.input,
    role_manager_domain: TypeGenInput.input,
    role_alias: TypeGenInput.input,
  };

  const IncludedRoleRules = {
    role_name: [{ required: true }],
    role_description: [{ required: true }],
    role_manager_domain: [{ required: true }],
    role_alias: [{ required: true }],
  };

  return (
    <Modal
      title={intl.formatMessage({ id: 'modal.create' })}
      closable
      onOk={onCreate}
      onCancel={onCancel}
      visible={props.visible}
      width="80%"
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {intl.formatMessage({ id: 'button.cancel' })}
        </Button>,
        <Button key="save" type="primary" onClick={onCreate}>
          {intl.formatMessage({ id: 'button.create' })}
        </Button>,
      ]}
    >
      <Form form={form}>
        <Row>
          {SortView(Object.keys(IncludedRole), ViewRole).map((value: any) => {
            if (IncludedRole[value] === TypeGenInput.checkbox) {
              return (
                <RenderColLabelInputByType
                  key={value}
                  type={IncludedRole[value]}
                  data={[]}
                  name={value}
                  page="role"
                  span={12}
                />
              );
            }
            return (
              <RenderColLabelInputByType
                key={value}
                type={IncludedRole[value]}
                data={[]}
                name={value}
                page="role"
                span={12}
                rules={IncludedRoleRules[value] || []}
              />
            );
          })}
        </Row>
      </Form>
      {isShowLoading && <LoadingOverlay showing={isShowLoading} show={showLoading} />}
    </Modal>
  );
};

export default CreateRoleModal;
