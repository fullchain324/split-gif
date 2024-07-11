import React from 'react'

import InputPanel from './components/InputPanel'
import OriginalView from './components/OriginalView'
import SplitView from './components/SplitView'
import DataProvider from './context/DataProvider'

const App = () => {
  return (
    <DataProvider>
      <div className="">
        <div className="flex h-screen align-center items-center">
          <div className="flex w-screen">
            <InputPanel />
            <div className="w-3/4 md:1/2 grow grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
              <OriginalView />
              <SplitView />
            </div>
          </div>
        </div>
      </div>
    </DataProvider>
  )
}

export default App
