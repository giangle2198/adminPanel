import { msRequest } from '@/request';
import { BIMAPIs } from '@/services/api';

async function CreateRole(request: API.CreateRoleRequest) {
  return await msRequest<API.BaseResponseModel>(BIMAPIs.CreateRoleAPI, {
    method: 'POST',
    data: request,
  });
}

async function GetRoleDetail(request: API.GetRoleDetailRequest) {
  return await msRequest<API.GetRoleDetailResponse>(BIMAPIs.GetRoleDetailAPI, {
    method: 'GET',
    params: request,
  });
}

async function GetListRole(request: API.GetListRoleRequest) {
  return await msRequest<API.GetListRoleResponse>(BIMAPIs.GetListRoleAPI, {
    method: 'GET',
    params: request,
  });
}

async function UpdateRole(request: API.UpdateRoleRequest) {
  return await msRequest<API.BaseResponseModel>(BIMAPIs.UpdateRoleAPI, {
    method: 'PATCH',
    data: request,
  });
}

async function DeleteRole(request: API.DeleteRoleRequest) {
  return await msRequest<API.BaseResponseModel>(BIMAPIs.DeleteRoleAPI, {
    method: 'DELETE',
    params: request,
  });
}

export {
  CreateRole,
  GetRoleDetail,
  UpdateRole,
  GetListRole,
  DeleteRole,
};
