import { TypeHandling } from '@/components/Constants/constants';
import { getTableSize } from '@/components/Constants/generalTable';
import PageHeaderContainer from '@/components/PageContainer/pageContainer';
import LoadingOverlay from '@/components/PageLoading/loadingOverLay';
import { getSetting } from '@/components/Setting';
import { Button, Card, Table } from 'antd';
import { useEffect, useReducer } from 'react';
import { useIntl } from 'umi';
import HandleProductModal from './component/product_modal';
import type { TableListProductProps } from './component/table_product';
import { TableListProduct } from './component/table_product';
import CActionHandlerProduct from './controller/action';
import { InitialStateProduct } from './controller/dto';
import { ReducerProduct } from './controller/reducer';

const ProductMangement: React.FC = () => {
  const intl = useIntl();
  const [state, dispatch] = useReducer(ReducerProduct, InitialStateProduct);
  const actionHandlerProduct = new CActionHandlerProduct(dispatch, intl);

  useEffect(() => {
    if (!state.visibleModal) {
      actionHandlerProduct.handleSearchProduct();
    }
  }, [state.visibleModal]);

  const actionHandlingModal = (
    value: boolean,
    type: string,
    productData: API.ProductDetailModel,
  ) => {
    actionHandlerProduct.hanldeVisible(value);
    actionHandlerProduct.setCurrentType(type);
    actionHandlerProduct.setCurrentProduct(productData);
  };

  return (
    <PageHeaderContainer>
      <Card>
        <Button
          style={{ marginBottom: '20px' }}
          type="primary"
          onClick={() =>
            actionHandlingModal(true, TypeHandling.CREATE, {} as API.ProductDetailModel)
          }
        >
          {intl.formatMessage({ id: 'button.create' })}
        </Button>
        <Table
          rowKey={(key) => key.email}
          columns={TableListProduct({
            data: state.products,
            action: actionHandlingModal,
          } as TableListProductProps)}
          dataSource={state.products}
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
        {state.visibleModal && (
          <HandleProductModal
            setVisible={actionHandlerProduct.hanldeVisible}
            visible={state.visibleModal}
            type={state.currentType}
            productData={state.currentProduct}
          />
        )}
      </Card>
    </PageHeaderContainer>
  );
};

export default ProductMangement;
