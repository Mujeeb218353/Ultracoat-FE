const baseUrl = "/products";

const productsEndpoints = {
  getProductsList: () => `${baseUrl}/list`,
} as const;

export default productsEndpoints;