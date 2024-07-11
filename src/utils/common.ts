import {
  buildImageSrc,
  execute,
  extractInfo,
  getInputFilesFromHtmlInputElement,
} from 'wasm-imagemagick'

import { DataType } from '../interfaces'

//split the original gif file into multiple files according to the row and column counts
export const getSplittedFileUrls: (
  data: DataType,
  fileInput: React.RefObject<HTMLInputElement>
) => Promise<string[]> = async (data, fileInput) => {
  const { originalFile, columnCount, rowCount } = data

  if (!originalFile || !fileInput.current) return []

  const { name: fileName } = originalFile
  const inputFiles = await getInputFilesFromHtmlInputElement(fileInput.current)

  const info = await extractInfo(inputFiles[0])

  const width = (info[0].image ? info[0].image.geometry.width : 0) / columnCount
  const height = (info[0].image ? info[0].image.geometry.height : 0) / rowCount
  let cmd = ``
  for (let i = 0; i < rowCount; i++) {
    for (let j = 0; j < columnCount; j++) {
      const offX = width * j
      const offY = height * i
      cmd += `convert ${fileName} -crop ${width}x${height}+${offX}+${offY} +repage output_${i}_${j}.gif\n`
    }
  }

  const result = await execute({
    inputFiles,
    commands: cmd,
  })

  let resultFiles: string[] = []
  for (const file of result.outputFiles) {
    const path = await buildImageSrc(file)
    resultFiles = [...resultFiles, path]
  }

  return resultFiles
}
