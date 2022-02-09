import * as DTO from '@/pages/management/product/controller/dto';

const ReducerProduct = (state: any, actionHandler: DTO.IActionProps) => {
  switch (actionHandler.action) {
    case DTO.ActionProduct.search:
      return { ...state };
    case DTO.ActionProduct.startShowLoading:
      return { ...state, submiting: true, isShowLoading: true };
    case DTO.ActionProduct.stopShowLoading:
      return { ...state, submiting: false, isShowLoading: false };
    case DTO.ActionProduct.searchSuccess:
      return {
        ...state,
        submiting: false,
        isShowLoading: false,
        products: actionHandler.data,
      } as DTO.IState;
    case DTO.ActionProduct.setVisibleModal:
      return {
        ...state,
        visibleModal: actionHandler.data
      } as DTO.IState
    case DTO.ActionProduct.setCurrentProduct:
      return {
        ...state,
        currentProduct: actionHandler.data
      } as DTO.IState
    case DTO.ActionProduct.setCurrentType:
      return {
        ...state,
        currentType: actionHandler.data
      } as DTO.IState
    default:
      return { ...state };
  }
};

export { ReducerProduct };
