import { PRODUCTS } from './common/utils.js'

export default {
  testCase1: {
    productName: PRODUCTS.coconut,
    postalCode: '94536',
    data1: {
      address: {
        country: {
          acronym: 'IND',
          name: 'INDIA',
        },
        location: {
          latitude: -22.974477767944336,
          longitude: -43.18672561645508,
        },
        postalCode: '600077',
        city: 'france',
        state: 'TAMILNADU',
        neighborhood: 'BOTAFOGO',
        street: '92 Rue de Strasbourg',
        number: '10025698',
        complement: '3 RD FLOOR',
        reference: 'GREY BUILDING',
      },
      businessHours: [
        {
          dayOfWeek: 1,
          openingTime: '08:00:00',
          closingTime: '20:00:00',
        },
      ],
      id: '45678',
      name: 'pickup example puma',
      description: 'do it',
      instructions: 'do it properly',
      formatted_address: 'undefined',
      isActive: true,
    },
    data2: {
      address: {
        country: {
          acronym: 'CAN',
          name: 'CANADA',
        },
        location: {
          latitude: -22.974477767944336,
          longitude: -43.18672561645508,
        },
        postalCode: '600079',
        city: 'TORONTO',
        state: 'ONTARIO',
        neighborhood: 'BOTAFOGO',
        street: '92 Rue de Strasbourg',
        number: '10025698',
        complement: '3 RD FLOOR',
        reference: 'GREY BUILDING',
      },
      businessHours: [
        {
          dayOfWeek: 1,
          openingTime: '08:00:00',
          closingTime: '20:00:00',
        },
      ],
      id: '45678',
      name: 'pickup example walmart',
      description: 'do it',
      instructions: 'do it properly',
      formatted_address: 'undefined',
      isActive: true,
    },
    data3: {
      address: {
        country: {
          acronym: 'CAN',
          name: 'CANADA',
        },
        location: {
          latitude: -22.974477767944336,
          longitude: -43.18672561645508,
        },
        postalCode: '600079',
        city: 'TORONTO',
        state: 'ONTARIO',
        neighborhood: 'BOTAFOGO',
        street: '92 Rue de Strasbourg',
        number: '10025698',
        complement: '3 RD FLOOR',
        reference: 'GREY BUILDING',
      },
      businessHours: [
        {
          dayOfWeek: 1,
          openingTime: '08:00:00',
          closingTime: '20:00:00',
        },
      ],
      id: '45678',
      name: 'pickup example 10',
      description: 'do it',
      instructions: 'do it properly',
      formatted_address: 'undefined',
      isActive: true,
    },
  },
}
