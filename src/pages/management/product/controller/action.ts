import { NotificationStatus, Status } from '@/components/Constants/constants';
import { NotificationMessage } from '@/components/Notification/notification';
import * as DTO from '@/pages/management/product/controller/dto';
import { GetListProduct } from '@/services/product/product';


// define constans action handler Product
type ActionTypeFn<T, R> = (values: T, additionalData?: any) => R;
interface IActionTypes {
  handleSearchProduct: ActionTypeFn<null, void>;
  hanldeVisible: ActionTypeFn<boolean, void>;
  setCurrentProduct: ActionTypeFn<API.ProductDetailModel, void>;
  setCurrentType: ActionTypeFn<string, void>;
}

class CActionHandlerProduct implements IActionTypes {
  dispatcher: React.Dispatch<any>;

  intl: any;

  constructor(dispatcher: React.Dispatch<any>, intl: any) {
    this.dispatcher = dispatcher;
    this.intl = intl;
  }

  handleSearchProduct = async () => {
    this.dispatcher({ action: DTO.ActionProduct.startShowLoading });
    let err;
    const resProductData = (await GetListProduct({}).catch((ExpErr: string) => {
      err = ExpErr;
    })) as DTO.IListProductResponse;
    if (err || resProductData.status_code !== Status.ACCEPT) {
      NotificationMessage(NotificationStatus.FAIL, this.intl);
      this.dispatcher({ action: DTO.ActionProduct.stopShowLoading });
      return;
    }
    if (resProductData.status_code === Status.ACCEPT) {
      this.dispatcher({ action: DTO.ActionProduct.searchSuccess, data: resProductData.products });
      return;
    }
    this.dispatcher({ action: DTO.ActionProduct.startShowLoading });
  };

  hanldeVisible = async (value: boolean) => {
    this.dispatcher({ action: DTO.ActionProduct.setVisibleModal, data: value })
  }

  setCurrentProduct = (value: API.ProductDetailModel) => {
    this.dispatcher({ action: DTO.ActionProduct.setCurrentProduct, data: value })
  }

  setCurrentType = (value: string) => {
    this.dispatcher({ action: DTO.ActionProduct.setCurrentType, data: value })
  }
}

export default CActionHandlerProduct;
