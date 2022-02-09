import * as DTO from '@/pages/admin/users/controller/dto';

const ReducerUser = (state: any, actionHandler: DTO.IActionProps) => {
  switch (actionHandler.action) {
    case DTO.ActionUser.search:
      return { ...state };
    case DTO.ActionUser.startShowLoading:
      return { ...state, submiting: true, isShowLoading: true };
    case DTO.ActionUser.stopShowLoading:
      return { ...state, submiting: false, isShowLoading: false };
    case DTO.ActionUser.searchSuccess:
      return {
        ...state,
        submiting: false,
        isShowLoading: false,
        users: actionHandler.data,
      } as DTO.IState;
    case DTO.ActionUser.setVisibleCreateModal:
      return {
        ...state,
        visibleCreateModal: actionHandler.data
      } as DTO.IState
    default:
      return { ...state };
  }
};

export { ReducerUser };
