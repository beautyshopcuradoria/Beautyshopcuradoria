/*
  BEAUTY SHOP — CATÁLOGO
  Você pode começar editando os produtos abaixo.
  Depois, na versão conectada ao Google Sheets, esta lista será substituída
  por uma planilha para você editar pelo celular sem mexer no código.
*/
const PRODUCTS = [
  {
    id: "demo-01",
    name: "Produto de exemplo — substitua",
    platform: "Mercado Livre",
    category: "Skincare",
    oldPrice: 99.90,
    price: 69.90,
    discount: 30,
    image: "",
    description: "Exemplo de cadastro. Troque nome, imagem, preços, descrição e link pelo seu produto real.",
    note: "Preço consultado em 28/09/2026. Verifique a oferta antes da compra.",
    affiliateUrl: "https://www.mercadolivre.com.br/",
    whatsapp: true
  },
  {
    id: "demo-02",
    name: "Produto de exemplo — oferta",
    platform: "Shopee",
    category: "Cabelos",
    oldPrice: 79.90,
    price: 49.90,
    discount: 38,
    image: "",
    description: "Segundo exemplo para você visualizar a estrutura do catálogo.",
    note: "Preço e disponibilidade podem mudar na plataforma.",
    affiliateUrl: "https://shopee.com.br/",
    whatsapp: false
  },
  {
    id: "demo-03",
    name: "Produto de exemplo — cupom",
    platform: "Amazon",
    category: "Corpo",
    oldPrice: 59.90,
    price: 39.90,
    discount: 33,
    image: "",
    description: "Use este card como modelo para os seus próximos produtos.",
    note: "Confirme preço, estoque e condições antes da compra.",
    affiliateUrl: "https://www.amazon.com.br/",
    whatsapp: false
  },
  {
    id: "demo-04",
    name: "Produto de exemplo — novidade",
    platform: "Natura",
    category: "Perfumaria",
    oldPrice: 129.90,
    price: 99.90,
    discount: 23,
    image: "",
    description: "Produto demonstrativo para a categoria Natura.",
    note: "Condições podem mudar conforme a campanha.",
    affiliateUrl: "https://www.natura.com.br/",
    whatsapp: true
  }
];
