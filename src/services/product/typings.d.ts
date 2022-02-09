// @ts-ignore
/* eslint-disable */

// import { BaseResponseModel } from '@/services/base/base';

declare namespace API {
  interface ProductDetailModel {
    id: string,
    title: string,
    description: string,
    img: string,
    categories: string[],
    sizes: string[],
    color: string,
    price: string
  }

  interface GetListProductRequest {
    category?: string[];
  }

  interface GetListProductResponse {
    status_code: string;
    reason_code: string;
    reason_message: string;
    products: ProductDetailModel[];
  }

  interface GetProductDetailRequest {
    product_id?: string;
  }

  interface GetProductDetailResponse {
    status_code: string;
    reason_code: string;
    reason_message: string;
    product: ProductDetailModel;
  }

  interface CreateProductRequest {
    title: string,
    description: string,
    categories: string[],
    sizes: string[],
    color: string,
    price: string,
    img: string
  }

  interface UpdateProductRequest {
    id: string,
    title: string,
    description: string,
    categories: string[],
    sizes: string[],
    color: string,
    price: string,
    img: string
  }

  interface DeleteProductRequest {
    product_id: number;
  }
}
