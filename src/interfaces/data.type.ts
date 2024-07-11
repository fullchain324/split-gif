export interface DataType {
  originalFile: File | undefined
  splittedFileUrls: string[]
  rowCount: number
  columnCount: number
  displayColumn: number
  isProcessing: boolean
}

export interface DataContextType {
  data: DataType
  setData: (_data: DataType) => void
}
