export const environment = {
  production: false,
  baseUrl: 'http://localhost:5245/api',
  // Endpointleri buraya ekleyerek hardcoded stringlerden kurtuluyoruz
  endpoints: {
    category: 'categories',
    product: 'products',
    appUser: 'appUsers',
    appUserProfile: 'appUserProfiles',
    order: 'orders',
    orderDetail: 'orderDetail'
  }
};