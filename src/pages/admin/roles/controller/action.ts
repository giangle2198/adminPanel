import { NotificationStatus, Status } from '@/components/Constants/constants';
import { NotificationMessage } from '@/components/Notification/notification';
import * as DTO from '@/pages/admin/roles/controller/dto';
import { GetListRole } from '@/services/role/role';


// define constans action handler user
type ActionTypeFn<T, R> = (values: T, additionalData?: any) => R;
interface IActionTypes {
  handleSearchRole: ActionTypeFn<null, void>;
  hanldeVisible: ActionTypeFn<boolean, void>;
}

class CActionHandlerRole implements IActionTypes {
  dispatcher: React.Dispatch<any>;

  intl: any;

  constructor(dispatcher: React.Dispatch<any>, intl: any) {
    this.dispatcher = dispatcher;
    this.intl = intl;
  }

  handleSearchRole = async () => {
    this.dispatcher({ action: DTO.ActionRole.startShowLoading });
    let err;
    const resUserData = (await GetListRole({}).catch((ExpErr: string) => {
      err = ExpErr;
    })) as DTO.IListRoleResponse;
    if (err || resUserData.status_code !== Status.DONE) {
      NotificationMessage(NotificationStatus.FAIL, this.intl);
      this.dispatcher({ action: DTO.ActionRole.stopShowLoading });
      return;
    }
    if (resUserData.status_code === Status.DONE) {
      this.dispatcher({ action: DTO.ActionRole.searchSuccess, data: resUserData.roles });
      return;
    }
    this.dispatcher({ action: DTO.ActionRole.startShowLoading });
  };

  hanldeVisible = async (value: boolean) => {
    this.dispatcher({ action: DTO.ActionRole.setVisibleCreateModal, data: value })
  }
}

export default CActionHandlerRole;
