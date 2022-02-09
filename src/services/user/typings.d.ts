// @ts-ignore
/* eslint-disable */

// import { BaseResponseModel } from '@/services/base/base';

declare namespace API {
  // UserActions
  interface DoLoginRequest {
    domain: string;
    password: string;
  }

  interface DoLoginResponse {
    status_code: string;
    reason_code: string;
    reason_message: string;
    jwt: string;
  }

  interface DoLogoutRequest {
    domain: string;
    token: string;
  }

  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  interface UserDetailModel {
    full_name: string;
    email: string;
    first_name: string;
    last_name: string;
    address: string;
    phone_number: string;
    domain: string;
    is_active: boolean;
    name: string;
  }

  interface GetListUserRequest {
    domain?: string;
  }

  interface GetListUserResponse {
    status_code: string;
    reason_code: string;
    reason_message: string;
    user_details: UserDetailModel[];
  }

  interface GetUserDetailRequest {
    domain?: string;
  }

  interface GetUserDetailResponse {
    status_code: string;
    reason_code: string;
    reason_message: string;
    user_details: UserDetailModel;
  }

  interface CreateUserRequest {
    full_name: string;
    email: string;
    first_name: string;
    last_name: string;
    address: string;
    phone_number: string;
    domain: string;
    is_active: boolean;
    password: string;
  }

  interface UpdateUserRequest {
    full_name: string;
    email: string;
    first_name: string;
    last_name: string;
    address: string;
    phone_number: string;
    domain: string;
    is_active: boolean;
  }

  interface DeleteUserRequest {
    user_id: number;
    domain: string;
  }
}
