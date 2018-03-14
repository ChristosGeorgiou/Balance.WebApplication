import * as schema from './invoice.json'

declare interface RxInvoiceDocumentType {
    orders: Array<string>
    dateCreated: string
    dateUpdated: string
    dateIssued?: string
    status: ("pending" | "issued")
    file?: string
    comment?: string
}

export type RxInvoiceDocument = RxInvoiceDocumentType
export const InvoiceSchema = schema
