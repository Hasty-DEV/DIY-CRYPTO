export const ROUTES = {
  lang: {
    call: () => '/:lang',
  },
  home: {
    call: () => '/',
  },
  blog: {
    path: 'blog/:id',
    call: (id: string) => `/blog/${id}`,
    callLang: (currentLang: string, id: string) => `/${currentLang}/blog/${id}`,
  },
  tutorials: {
    path: 'tutoriais',
    call: (currentLang: string) => `/${currentLang}/tutoriais`,
  },
  about: {
    path: 'sobre-nos',
    call: (currentLang: string) => `/${currentLang}/sobre-nos`,
  },
  product: {
    call: (currentLang: string, id: string) => `/${currentLang}/produto/${id}`,
  },
  cart: {
    path: 'carrinho',
    call: (currentLang: string) => `/${currentLang}/carrinho`,
    checkout: {
      path: 'checkout',
      call: (currentLang: string) => `/${currentLang}/checkout`,
    },
    product: {
      path: 'produto/:id',
      call: (currentLang: string, id: string = '1') =>
        `/${currentLang}/produto/${id}`,
    },
    products: {
      path: 'produtos',
      BITKIT: {
        call: (currentLang: string, id: string = '1') =>
          `/${currentLang}/produto/${id}`,
      },
      SEEDKIT: {
        call: (currentLang: string, id: string = '2') =>
          `/${currentLang}/produto/${id}`,
      },
    },
  },
  products: {
    call: (currentLang: string) => `/${currentLang}/produtos`,
  },
  policyPrivacy: {
    path: 'politica-de-privacidade',
    call: (currentLang: string) => `/${currentLang}/politica-de-privacidade`,
  },
  paymentStatus: {
    failure: {
      path: 'failure',
      call: (currentLang: string) => `/${currentLang}/failure`,
    },
    success: {
      path: 'success',
      call: (currentLang: string) => `/${currentLang}/success`,
    },
  },
};
