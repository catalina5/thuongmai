import { Product, ProductList } from 'src/types/product.type'
import http from 'src/utils/http'

export const getProduct = (params?: unknown) => http.get<ProductList>('/product/get-all', { params })
export const getAllProduct = () => http.get<ProductList>('/product/get-all')
export const getProductDetail = (id: string) => http.get<Product>(`/product/get-details/${id}`)
