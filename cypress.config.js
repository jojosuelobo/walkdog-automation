const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://walkdog.vercel.app/'
  },
  env: {
    cep: '01311200',
    rua: 'Avenida Paulista',
    bairro: 'Bela Vista',
    cidade: 'São Paulo/SP' 
  }
});
