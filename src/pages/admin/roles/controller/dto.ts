import type { Key } from 'react';

interface IListRoleResponse extends API.BaseResponseModel {
  roles: API.RoleDetailModel[];
  total?: 0;
}

interface IState {
  roles: API.RoleDetailModel[];
  submiting: boolean;
  isShowLoading: boolean;
  visibleCreateModal: boolean;
}
interface IVisibleModalInfor {
  active: boolean;
  id: number;
}
interface IActionProps {
  action: string;
  data?: IState | number | string | boolean | Key[] | IVisibleModalInfor;
}
const ActionRole = {
  search: 'search',
  searchSuccess: 'search_success',
  startShowLoading: 'start_show_loading',
  stopShowLoading: 'top_show_loading',
  setVisibleCreateModal: 'set_visible_create_modal',
};

const InitialStateRole: IState = {
  roles: [],
  submiting: false,
  isShowLoading: false,
  visibleCreateModal: false,
};

export {
  IListRoleResponse,
  IState,
  IActionProps,
  ActionRole,
  InitialStateRole,
};
