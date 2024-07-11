import React, { createContext, useState } from 'react'

import { DataContextType, DataType } from '../interfaces'

export const DataContext = createContext<DataContextType | null>(null)

const initialContextData: DataType = {
  originalFile: undefined,
  splittedFileUrls: [],
  rowCount: 2,
  columnCount: 2,
  displayColumn: 2,
  isProcessing: false,
}

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<DataType>(initialContextData)

  const updateData = (_data: DataType) => {
    setData(_data)
  }

  return (
    <DataContext.Provider value={{ data, setData: updateData }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
