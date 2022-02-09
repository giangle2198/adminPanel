import type { Key } from 'react';

interface ISearchUser {
  domain: string;
}

interface IListUserResponse extends API.BaseResponseModel {
  user_details: API.UserDetailModel[];
  total?: 0;
}

interface IState {
  users: API.UserDetailModel[];
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
const ActionUser = {
  search: 'search',
  searchSuccess: 'search_success',
  startShowLoading: 'start_show_loading',
  stopShowLoading: 'top_show_loading',
  setVisibleCreateModal: 'set_visible_create_modal',
};

const InitialStateUser: IState = {
  users: [],
  submiting: false,
  isShowLoading: false,
  visibleCreateModal: false,
};

export {
  IListUserResponse,
  IState,
  IActionProps,
  ISearchUser,
  ActionUser,
  InitialStateUser,
};
