import { NotificationStatus, Status } from '@/components/Constants/constants';
import { NotificationMessage } from '@/components/Notification/notification';
import * as DTO from '@/pages/admin/users/controller/dto';
import { GetListUser } from '@/services/user/user';


// define constans action handler user
type ActionTypeFn<T, R> = (values: T, additionalData?: any) => R;
interface IActionTypes {
  handleSearchUser: ActionTypeFn<DTO.ISearchUser, void>;
  hanldeVisible: ActionTypeFn<boolean, void>;
}

class CActionHandlerUser implements IActionTypes {
  dispatcher: React.Dispatch<any>;

  intl: any;

  constructor(dispatcher: React.Dispatch<any>, intl: any) {
    this.dispatcher = dispatcher;
    this.intl = intl;
  }

  handleSearchUser = async (paramSearch: DTO.ISearchUser) => {
    this.dispatcher({ action: DTO.ActionUser.startShowLoading });
    let err;
    const resUserData = (await GetListUser({ ...paramSearch }).catch((ExpErr: string) => {
      err = ExpErr;
    })) as DTO.IListUserResponse;
    if (err || resUserData.status_code !== Status.DONE) {
      NotificationMessage(NotificationStatus.FAIL, this.intl);
      this.dispatcher({ action: DTO.ActionUser.stopShowLoading });
      return;
    }
    if (resUserData.status_code === Status.DONE) {
      this.dispatcher({ action: DTO.ActionUser.searchSuccess, data: resUserData.user_details });
      return;
    }
    this.dispatcher({ action: DTO.ActionUser.startShowLoading });
  };

  hanldeVisible = async (value: boolean) => {
    this.dispatcher({ action: DTO.ActionUser.setVisibleCreateModal, data: value })
  }
}

export default CActionHandlerUser;
