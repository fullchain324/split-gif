import React, { useContext, useMemo } from 'react'

import { DataContext } from '../context'
import { DataContextType } from '../interfaces'

const OriginalView = () => {
  const context = useContext(DataContext) as DataContextType

  const { data } = context
  const { originalFile } = data
  const originalURL = useMemo(
    () => (!originalFile ? '' : URL.createObjectURL(originalFile)),
    [originalFile]
  )

  return (
    <div className="w-full h-full border-2 rounded-md p-2 drop-shadow-md aspect-square flex items-center justify-center">
      {!originalURL ? (
        <p>No found original GIF</p>
      ) : (
        <img
          className="aspect-square w-full h-full object-contain"
          src={originalURL}
          alt={originalURL}
        />
      )}
    </div>
  )
}

export default OriginalView
