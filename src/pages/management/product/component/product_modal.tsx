import type { ActionTypesFn } from '@/components/Constants/constants';
import { TypeHandling } from '@/components/Constants/constants';
import { NotificationStatus, Status } from '@/components/Constants/constants';
import { RenderColLabelInputByType, TypeGenInput } from '@/components/Constants/generalInput';
import { SortView } from '@/components/Constants/util';
import { NotificationMessage } from '@/components/Notification/notification';
import LoadingOverlay from '@/components/PageLoading/loadingOverLay';
import { CreateProduct, UpdateProduct } from '@/services/product/product';
import { Button, Form, Modal, Row } from 'antd';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'umi';

interface IHandleProductModal {
  visible: boolean;
  setVisible: ActionTypesFn<boolean, void>;
  productData?: API.ProductDetailModel;
  type: string;
}

const HandleProductModal: React.FC<IHandleProductModal> = (props: IHandleProductModal) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [isShowLoading, setIsShowLoading] = useState(false);

  const showLoading = useCallback((isShowing: boolean) => {
    setIsShowLoading(isShowing);
  }, []);

  const onCreate = async () => {
    showLoading(true);
    let err;
    const values: API.ProductDetailModel = form.getFieldsValue();
    const paramsRequest = {
      title: values.title,
      description: values.description,
      img: values.img,
      categories: String(values.categories).split(','),
      sizes: String(values.sizes).split(','),
      color: values.color,
      price: values.price,
    } as API.ProductDetailModel;
    const res = (await CreateProduct({ ...paramsRequest }).catch((errOut) => {
      err = errOut;
    })) as API.BaseResponseModel;

    if (err || (res && res.status_code !== Status.ACCEPT)) {
      NotificationMessage((res && res.reason_code) || NotificationStatus.FAIL, intl);
      showLoading(false);
      props.setVisible(false);
      return;
    }

    NotificationMessage((res && res.reason_code) || NotificationStatus.SUCCESS, intl);
    showLoading(false);
    props.setVisible(false);
  };

  const onUpdate = async () => {
    showLoading(true);
    let err;
    const values: API.ProductDetailModel = form.getFieldsValue();
    const paramsRequest = {
      id: values.id,
      title: values.title,
      description: values.description,
      img: values.img,
      categories: String(values.categories).split(','),
      sizes: String(values.sizes).split(','),
      color: values.color,
      price: values.price,
    } as API.ProductDetailModel;

    const res = (await UpdateProduct({ ...paramsRequest }).catch((errOut) => {
      err = errOut;
    })) as API.BaseResponseModel;

    if (err || (res && res.status_code !== Status.ACCEPT)) {
      NotificationMessage((res && res.reason_code) || NotificationStatus.FAIL, intl);
      showLoading(false);
      props.setVisible(false);
      return;
    }

    NotificationMessage((res && res.reason_code) || NotificationStatus.SUCCESS, intl);
    showLoading(false);
    props.setVisible(false);
  };

  const onCancel = () => {
    props.setVisible(false);
  };

  const IncludedUserDetail = {
    id: TypeGenInput.input,
    title: TypeGenInput.input,
    img: TypeGenInput.inputNotRegex,
    categories: TypeGenInput.input,
    sizes: TypeGenInput.input,
    color: TypeGenInput.input,
    price: TypeGenInput.input,
    description: TypeGenInput.area,
  };

  const BanedEdit = {
    id: true,
  };

  const IncludedListProductSort = {
    id: 0,
    img: 1,
    title: 2,
    categories: 3,
    sizes: 4,
    color: 5,
    price: 6,
    description: 7,
  };

  return (
    <Modal
      title={intl.formatMessage({
        id: `modal.${props.type === TypeHandling.CREATE ? 'create' : 'update'}`,
      })}
      closable
      onOk={props.type === TypeHandling.CREATE ? onCreate : onUpdate}
      onCancel={onCancel}
      visible={props.visible}
      width="80%"
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {intl.formatMessage({ id: 'button.cancel' })}
        </Button>,
        <Button
          key={props.type}
          type="primary"
          onClick={props.type === TypeHandling.CREATE ? onCreate : onUpdate}
        >
          {intl.formatMessage({
            id: `pages.${props.type === TypeHandling.CREATE ? 'create' : 'update'}`,
          })}
        </Button>,
      ]}
    >
      <Form form={form}>
        <Row>
          {SortView(Object.keys(IncludedListProductSort || []), IncludedListProductSort)
            .filter((key: string) => props.type !== TypeHandling.CREATE || key !== 'id')
            .map((value: any) => {
              if (IncludedUserDetail[value] === TypeGenInput.area) {
                return (
                  <RenderColLabelInputByType
                    key={value}
                    data={(props.productData && props.productData[value]) || []}
                    type={IncludedUserDetail[value]}
                    name={value}
                    page="product"
                    span={24}
                    disabled={BanedEdit[value] || false}
                  />
                );
              }
              if (['categories', 'sizes'].includes(value)) {
                return (
                  <RenderColLabelInputByType
                    key={value}
                    data={
                      (props.productData &&
                        props.productData[value] &&
                        props.productData[value].join(',')) ||
                      []
                    }
                    type={IncludedUserDetail[value]}
                    name={value}
                    page="product"
                    span={12}
                    disabled={BanedEdit[value] || false}
                  />
                );
              }
              return (
                <RenderColLabelInputByType
                  key={value}
                  data={(props.productData && props.productData[value]) || []}
                  type={IncludedUserDetail[value]}
                  name={value}
                  page="product"
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

export default HandleProductModal;
