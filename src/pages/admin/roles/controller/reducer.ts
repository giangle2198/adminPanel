import * as DTO from '@/pages/admin/roles/controller/dto';

const ReducerRole = (state: any, actionHandler: DTO.IActionProps) => {
  switch (actionHandler.action) {
    case DTO.ActionRole.search:
      return { ...state };
    case DTO.ActionRole.startShowLoading:
      return { ...state, submiting: true, isShowLoading: true };
    case DTO.ActionRole.stopShowLoading:
      return { ...state, submiting: false, isShowLoading: false };
    case DTO.ActionRole.searchSuccess:
      return {
        ...state,
        submiting: false,
        isShowLoading: false,
        roles: actionHandler.data,
      } as DTO.IState;
    case DTO.ActionRole.setVisibleCreateModal:
      return { ...state, visibleCreateModal: actionHandler.data } as DTO.IState;
    default:
      return { ...state };
  }
};

export { ReducerRole };
