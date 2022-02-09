// @ts-ignore
/* eslint-disable */

// import { BaseResponseModel } from '@/services/base/base';

declare namespace API {
  interface RoleDetailModel {
    role_id: number,
    role_name: string,
    role_description: string,
    role_manager_domain: string,
    role_alias: string,
    is_active: boolean
  }

  interface GetListRoleRequest {
    role_ids?: string;
  }

  interface GetListRoleResponse {
    status_code: string;
    reason_code: string;
    reason_message: string;
    roles: RoleDetailModel[];
  }

  interface GetRoleDetailRequest {
    role_id?: string;
  }

  interface GetRoleDetailResponse {
    status_code: string;
    reason_code: string;
    reason_message: string;
    role_detail: RoleDetailModel;
  }

  interface CreateRoleRequest {
    role_name: string,
    role_description: string,
    role_manager_domain: string,
    role_alias: string
  }

  interface UpdateRoleRequest {
    id: number,
    is_active: boolean,
    role_description: string,
    role_alias: string,
    role_manager_domain: string,
    role_name: string,
  }

  interface DeleteRoleRequest {
    id: number;
  }
}
