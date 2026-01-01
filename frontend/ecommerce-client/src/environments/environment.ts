export const environment = {
  production: false,
  baseUrl: 'http://localhost:5245/api',
  // Endpointleri buraya ekleyerek hardcoded stringlerden kurtuluyoruz
  endpoints: {
    category: 'category',
    product: 'product',
    appUser: 'appUser',
    appUserProfile: 'appUserProfile',
    order: 'order',
  }
};