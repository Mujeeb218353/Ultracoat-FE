const productsQueryKeys = {
  productsList: () => ["products", "list"],
  productsOptions: () => ["products", "options"],
} as const;

export default productsQueryKeys;