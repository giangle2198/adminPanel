import { msRequest } from '@/request';
import { BCSAPIs } from '@/services/api';

async function CreateProduct(request: API.CreateProductRequest) {
  return await msRequest<API.BaseResponseModel>(BCSAPIs.CreateProductAPI, {
    method: 'POST',
    data: request,
  });
}

async function GetProductDetail(request: API.GetProductDetailRequest) {
  return await msRequest<API.GetProductDetailResponse>(BCSAPIs.GetProductDetailAPI, {
    method: 'GET',
    params: request,
  });
}

async function GetListProduct(request: API.GetListProductRequest) {
  return await msRequest<API.GetListProductResponse>(BCSAPIs.GetListProductAPI, {
    method: 'GET',
    params: request,
  });
}

async function UpdateProduct(request: API.UpdateProductRequest) {
  return await msRequest<API.BaseResponseModel>(BCSAPIs.UpdateProductAPI, {
    method: 'POST',
    data: request,
  });
}

async function DeleteProduct(request: API.DeleteProductRequest) {
  return await msRequest<API.BaseResponseModel>(BCSAPIs.DeleteProductAPI, {
    method: 'POST',
    params: request,
  });
}

export {
  CreateProduct,
  GetProductDetail,
  UpdateProduct,
  GetListProduct,
  DeleteProduct,
};
