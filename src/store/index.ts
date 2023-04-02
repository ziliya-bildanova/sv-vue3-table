import { createStore } from 'vuex'
import { RowData, State } from '@/store/types'

export default createStore<State>({
  state: () => ({
    createData: [
      { id: 1, steName: 'Азот газообразный сорт - первый технический баллон 50 л', isActual: true, priceNotNds: 100, priceEndDate: null, price: null, nds: null, fillEndDate: new Date(Date.now()).toLocaleDateString()},
      { id: 2, steName: 'Ozone microne h-67 набор фильтров для пылесосов electrolux cyclone', isActual: false, priceNotNds: null, priceEndDate: null, price: null, nds: null, fillEndDate: new Date(Date.now()).toLocaleDateString()},
      { id: 3, steName: 'Ozone microne h-67 набор фильтров для пылесосов electrolux cyclone', isActual: true, priceNotNds: null, priceEndDate: null, price: null, nds: null, fillEndDate: new Date(Date.now()).toLocaleDateString()}
    ]
  }),
  getters: {
    getCreateDate: s => {
      return s.createData
    }
  },
  mutations: {
    setRow(state: State, row: RowData): void {
      // получаем объект, который можно будет передавать в бэк (row)
      console.log(row)
    },
  },
  actions: {
  },
  modules: {
  }
})
