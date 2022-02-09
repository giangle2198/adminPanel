
const BIMAPIs = {
  // USERs
  DoLoginAPI: `${REACT_IM_SERVICE_ENV}/user/login`,
  DoLogoutAPI: `${REACT_IM_SERVICE_ENV}/user/logout`,
  DoRegisterAPI: `${REACT_IM_SERVICE_ENV}/user/register`,
  GetUserDetailAPI: `${REACT_IM_SERVICE_ENV}/user/detail`,
  UpdateUserDetailAPI: `${REACT_IM_SERVICE_ENV}/iam/user`,
  DeleteUserDetailAPI: `${REACT_IM_SERVICE_ENV}/iam/user`,
  GetListUserAPI: `${REACT_IM_SERVICE_ENV}/user`,
  // Roles
  GetListRoleAPI: `${REACT_IM_SERVICE_ENV}/iam/roles`,
  GetRoleDetailAPI: `${REACT_IM_SERVICE_ENV}/iam/role/detail`,
  UpdateRoleAPI: `${REACT_IM_SERVICE_ENV}/iam/roles`,
  DeleteRoleAPI: `${REACT_IM_SERVICE_ENV}/iam/roles`,
  CreateRoleAPI: `${REACT_IM_SERVICE_ENV}/iam/roles`,
};

const BCSAPIs = {
  // Product
  GetListProductAPI: `${REACT_CS_SERVICE_ENV}/products`,
  GetProductDetailAPI: `${REACT_CS_SERVICE_ENV}/product/detail`,
  CreateProductAPI: `${REACT_CS_SERVICE_ENV}/product/create`,
  UpdateProductAPI: `${REACT_CS_SERVICE_ENV}/product/update`,
  DeleteProductAPI: `${REACT_CS_SERVICE_ENV}/product/delete`,
};

export { BIMAPIs, BCSAPIs };
