<template>
  <n-config-provider :theme-overrides="themeOverrides">
  <n-data-table :columns="columns" :data="data" />
  </n-config-provider>
</template>

<script lang="ts">
import { h, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { RowData } from '@/store/types'
import { NSwitch, NDatePicker, NInputNumber, NDataTable, NConfigProvider  } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

export default defineComponent({
  components: {
    NDataTable,
    NConfigProvider
  },
  setup () {
    const store = useStore()
    const createData = (): RowData[] => store.getters.getCreateDate
    const data = createData()
    const createColumns = ({
      calcPrice
    }: {
      calcPrice: (row: RowData) => void
    }): DataTableColumns<RowData> => {
      return [
        {
          title: 'Наименование СТЕ',
          key: 'steName',
          sorter: true,
        },
        {
          title: 'В наличии',
          key: 'isActual',
          render (row) {
            return h(
                NSwitch,
                {
                  'default-value': row.isActual,
                  'onUpdate:value': (value: boolean) => {
                    row.isActual = value
                    store.commit('setRow', row)
                  }
                }
            )
          }
        },
        {
          title: 'Срок действия предоставленных сведений',
          key: 'priceEndDate',
          render (row) {
            return h(
                NDatePicker,
                {
                  placeholder: 'Выберите дату',
                  format: 'dd.MM.yyyy',
                  bordered: false,
                  'default-value': row.priceEndDate,
                  'on-update:value': (val: number | null) => {
                    row.priceEndDate = val
                    store.commit('setRow', row)
                  }
                }
            )
          }
        },
        {
          title: 'Цена, руб. без НДС',
          key: 'priceNotNds',
          render (row) {
            return h(
                NInputNumber,
                {
                  value: row.priceNotNds,
                  placeholder: 'Введите значение',
                  'show-button': false,
                  bordered: false,
                  'on-update:value': (val: number | null) => {
                    row.priceNotNds = val;
                    calcPrice(row)
                    store.commit('setRow', row)
                  }
                }
            )
          }
        },
        {
          title: 'НДС, %',
          key: 'nds',
          render (row) {
            return h(
                NInputNumber,
                {
                  'default-value': row.nds,
                  placeholder: 'Введите значение',
                  'show-button': false,
                  bordered: false,
                  'on-update:value': (val: number | null) => {
                    row.nds = val
                    store.commit('setRow', row)
                  }
                }
            )
          }
        },
        {
          title: 'Цена, руб. с НДС',
          key: 'price',
          render (row) {
            calcPrice(row)
            return h(
                'span', String(row.price)
            )
          }
        },
        {
          title: 'Срок заполнения',
          key: 'fillEndDate',
        }
      ]
    }

    const themeOverrides = {
      common: {
        primaryColor: '#0048ff'
      },
      DataTable: {
        thColor: '#8aa3e7',
        thTextColor: '#fff',
      },
    }

    return {
      data,
      columns: createColumns({
        calcPrice(row: RowData){
          const priceNotNds = row.priceNotNds
          const nds = row.nds
          let price
          if (priceNotNds !== null && nds !== null) {
            price = priceNotNds + (priceNotNds * nds / 100)
          } else {
            price = null
          }
          row.price = price
        }
      }),
      themeOverrides,
    }
  }
})
</script>
