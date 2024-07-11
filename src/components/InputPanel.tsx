import React, { ChangeEvent, useContext, useRef } from 'react'
import { Button, Form, InputNumber } from 'antd'

import { DataContext } from '../context'
import { getSplittedFileUrls } from '../utils/common'
import { DataContextType } from '../interfaces'

const InputPanel = () => {
  const fileInput = useRef<HTMLInputElement>(null)
  const context = useContext(DataContext) as DataContextType

  const { data, setData } = context

  const onFileSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    setData({
      ...data,
      originalFile: e.target.files[0],
    })
  }
  
  const onRowChanged = (count: number | null) => {
    if (!count) return

    setData({
      ...data,
      rowCount: count,
    })
  }

  const onColChanged = (count: number | null) => {
    if (!count) return

    setData({
      ...data,
      columnCount: count,
    })
  }

  //button click event for importing the gif source file
  const onSelectFile = () => {
    fileInput.current?.click()
  }

  //process gif
  const splitGif = async () => {
    setData({
      ...data,
      isProcessing: true,
    })

    const splittedFileUrls = await getSplittedFileUrls(data, fileInput)

    if (splittedFileUrls.length > 0) {
      setData({
        ...data,
        displayColumn: data.columnCount,
        splittedFileUrls,
        isProcessing: false,
      })
    } else {
      setData({
        ...data,
        isProcessing: false,
      })
    }
  }

  return (
    <div className="w-1/4 md:1/2 flex flex-col items-center justify-center">
      <input
        accept="image/gif"
        className="hidden"
        onChange={onFileSelected}
        ref={fileInput}
        type="file"
      />
      <div className="flex flex-col items-end">
        <Form.Item label="Row Count">
          <InputNumber
            min={1}
            max={20}
            onChange={onRowChanged}
            defaultValue={data.rowCount}
            changeOnWheel
          />
        </Form.Item>
        <Form.Item label="Column Count">
          <InputNumber
            min={1}
            max={20}
            onChange={onColChanged}
            defaultValue={data.columnCount}
            changeOnWheel
          />
        </Form.Item>
      </div>
      <Button
        type="primary"
        shape="round"
        size="large"
        disabled={data.isProcessing}
        onClick={onSelectFile}
      >
        Pick Gif
      </Button>
      <Button
        className="mt-4"
        type="primary"
        shape="round"
        size="large"
        onClick={splitGif}
        loading={data.isProcessing}
        disabled={!data.originalFile || data.isProcessing}
      >
        Split Gif
      </Button>
    </div>
  )
}

export default InputPanel
