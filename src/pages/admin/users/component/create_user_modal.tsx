import type { ActionTypesFn } from '@/components/Constants/constants';
import { NotificationStatus, Status } from '@/components/Constants/constants';
import { RenderColLabelInputByType, TypeGenInput } from '@/components/Constants/generalInput';
import { SortView } from '@/components/Constants/util';
import { NotificationMessage } from '@/components/Notification/notification';
import LoadingOverlay from '@/components/PageLoading/loadingOverLay';
import { RegisterUser } from '@/services/user/user';
import { Button, Form, Modal, Row } from 'antd';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'umi';
import { ViewUser } from './edit';

interface ICreateUserModal {
  visible: boolean;
  setVisible: ActionTypesFn<boolean, void>;
}

const CreateUserModal: React.FC<ICreateUserModal> = (props: ICreateUserModal) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [isShowLoading, setIsShowLoading] = useState(false);

  const showLoading = useCallback((isShowing: boolean) => {
    setIsShowLoading(isShowing);
  }, []);

  const onCreate = async () => {
    showLoading(true);
    let err;
    const values: API.CreateUserRequest = form.getFieldsValue();
    const paramsRequest = {
      full_name: values.full_name || ' ',
      password: values.password || 'Abc@123',
      email: values.email || ' ',
      first_name: values.first_name || ' ',
      last_name: values.last_name || ' ',
      phone_number: values.phone_number || ' ',
      domain: values.domain || ' ',
      address: values.address || ' ',
      is_active: values.is_active,
    } as API.CreateUserRequest;
    const res = (await RegisterUser({ ...paramsRequest }).catch((errOut) => {
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

  const IncludedUserDetail = {
    domain: TypeGenInput.input,
    password: TypeGenInput.password,
    confirm_password: TypeGenInput.password,
    full_name: TypeGenInput.input,
    email: TypeGenInput.email,
    first_name: TypeGenInput.input,
    last_name: TypeGenInput.input,
    phone_number: TypeGenInput.input,
    address: TypeGenInput.input,
    is_active: TypeGenInput.switch,
  };

  const IncludedUserDetailRules = {
    domain: [{ required: true }],
    password: [
      { required: true },
      {
        pattern: new RegExp('(^[0-9]{6,15}$)'),
        message: 'Just only number and range from 6 to 15 number',
      },
    ],
    confirm_password: [
      { required: true },
      ({ getFieldValue }: any) => ({
        validator(_: any, value: any) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('The two password that you entered do not match!'));
        },
      }),
    ],
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
          {SortView(Object.keys(IncludedUserDetail), ViewUser).map((value: any) => {
            if (IncludedUserDetail[value] === TypeGenInput.checkbox) {
              return (
                <RenderColLabelInputByType
                  key={value}
                  type={IncludedUserDetail[value]}
                  data={[]}
                  name={value}
                  page="user"
                  span={12}
                />
              );
            }
            return (
              <RenderColLabelInputByType
                key={value}
                type={IncludedUserDetail[value]}
                data={[]}
                name={value}
                page="user"
                span={12}
                rules={IncludedUserDetailRules[value] || []}
              />
            );
          })}
        </Row>
      </Form>
      {isShowLoading && <LoadingOverlay showing={isShowLoading} show={showLoading} />}
    </Modal>
  );
};

export default CreateUserModal;
