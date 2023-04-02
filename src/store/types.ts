export type RowData = {
    id: number
    steName: string,
    isActual: boolean,
    priceNotNds: number | null,
    priceEndDate: number | null,
    price: number | null,
    nds: number | null,
    fillEndDate: string | null
}
export interface State {
    createData: RowData[]
}
