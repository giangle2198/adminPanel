import type { Key } from 'react';

interface IListProductResponse extends API.BaseResponseModel {
  products: API.ProductDetailModel[];
}

interface IState {
  products: API.ProductDetailModel[];
  submiting: boolean;
  isShowLoading: boolean;
  visibleModal: boolean;
  currentProduct: API.ProductDetailModel;
  currentType: string;
}

interface IVisibleModalInfo {
  active: boolean;
  id: number;
}

interface IActionProps {
  action: string;
  data?: IState | number | string | boolean | Key[] | IVisibleModalInfo;
}
const ActionProduct = {
  search: 'search',
  searchSuccess: 'search_success',
  startShowLoading: 'start_show_loading',
  stopShowLoading: 'top_show_loading',
  setVisibleModal: 'set_visible_modal',
  setCurrentProduct: 'set_current_product',
  setCurrentType: 'set_current_type',
};

const InitialStateProduct: IState = {
  products: [],
  submiting: false,
  isShowLoading: false,
  visibleModal: false,
  currentProduct: {} as API.ProductDetailModel,
  currentType: 'CREATE',
};

export {
  IListProductResponse,
  IState,
  IActionProps,
  ActionProduct,
  InitialStateProduct,
};
