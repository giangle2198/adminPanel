import { getJWT, msRequest, parseJWT, removeJWT, setJWT } from '@/request';
// import { API } from '@/services/user/typings';
import { BIMAPIs } from '@/services/api';
import { Status } from '@/components/Constants/constants';

async function Login(request: API.DoLoginRequest) {
  const response = await msRequest<API.DoLoginResponse>(BIMAPIs.DoLoginAPI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: request,
  });

  if (response.status_code === Status.DONE) {
    setJWT(response.jwt);
    return true;
  }
  return false;
}

async function Logout() {
  const jwtData = parseJWT();
  const response = await msRequest<API.BaseResponseModel>(BIMAPIs.DoLogoutAPI, {
    method: 'POST',
    data: {
      domain: jwtData.Domain,
      token: getJWT(),
    } as API.DoLogoutRequest,
  });
  if (response.status_code === Status.DONE) {
    removeJWT();
    return true;
  }
  return false;
}

async function RegisterUser(request: API.CreateUserRequest) {
  return await msRequest<API.BaseResponseModel>(BIMAPIs.DoRegisterAPI, {
    method: 'POST',
    data: request,
  });
}

async function GetUserDetail(request: API.GetUserDetailRequest) {
  return await msRequest<API.GetUserDetailResponse>(BIMAPIs.GetUserDetailAPI, {
    method: 'GET',
    params: request,
  });
}

async function GetListUser(request: API.GetListUserRequest) {
  return await msRequest<API.GetListUserResponse>(BIMAPIs.GetListUserAPI, {
    method: 'POST',
    data: request,
  });
}

async function UpdateUser(request: API.UpdateUserRequest) {
  return await msRequest<API.BaseResponseModel>(BIMAPIs.UpdateUserDetailAPI, {
    method: 'POST',
    data: request,
  });
}

async function DeleteUser(request: API.DeleteUserRequest) {
  return await msRequest<API.BaseResponseModel>(BIMAPIs.DeleteUserDetailAPI, {
    method: 'DELETE',
    params: request,
  });
}

export { Login, Logout, RegisterUser, GetUserDetail, GetListUser, UpdateUser, DeleteUser };
