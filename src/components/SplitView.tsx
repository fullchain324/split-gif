import React, { useContext, useMemo } from 'react'

import { DataContext } from '../context'
import { DataContextType } from '../interfaces'

interface SplittedGifItemInterface {
  displayColumn: number
  src: string
}

const SplittedGifItem = ({ displayColumn, src }: SplittedGifItemInterface) => {
  return (
    <div className="p-[1px]" style={{ width: `${100 / displayColumn}%` }}>
      <img className="w-full" src={src} alt="item" />
    </div>
  )
}

const SplitView = () => {
  const context = useContext(DataContext) as DataContextType

  const { data } = context
  const { splittedFileUrls, displayColumn } = data
  const isShownSplittedGif = useMemo(
    () => splittedFileUrls && splittedFileUrls.length > 0,
    [splittedFileUrls]
  )

  return (
    <div className="border-2 rounded-md p-2 drop-shadow-md aspect-square flex items-center justify-center">
      {isShownSplittedGif ? (
        <div className="flex flex-wrap">
          {splittedFileUrls.map((s, idx) => (
            <SplittedGifItem key={idx} displayColumn={displayColumn} src={s} />
          ))}
        </div>
      ) : (
        <p>Splitted GIF is shown here</p>
      )}
    </div>
  )
}

export default SplitView
