import useProductsList from "../hooks/use-products-list";
import { Product } from "../types/products.types";

export const selectProducts = (res: Product[]) => res ?? [];

export const useProductsListData = () => useProductsList().data ?? [];