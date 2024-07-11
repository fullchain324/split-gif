import { ChangeEvent, useMemo, useRef, useState } from 'react';
import './App.css';
import { buildImageSrc, execute, extractInfo, getInputFilesFromHtmlInputElement } from 'wasm-imagemagick';
import { Button, Form, InputNumber } from 'antd';

const App = () => {

  const fileInput = useRef<HTMLInputElement>(null);
  const [originalGif, setOriginalGif] = useState<File>();
  const [croppedGif, setCroppedGif] = useState<string[]>();
  const [generating, setGenerating] = useState<boolean>(false);

  const [rowCount, setRowCount] = useState(2);
  const [colCount, setColCount] = useState(2);

  const onSelectFile = () => {
    fileInput.current?.click();
  }

  const splitGif = async () => {
    if (!originalGif) {
      return;
    }

    if (!fileInput.current) return;
    setGenerating(true);

    const fileName = originalGif.name;
    const inputFiles = await getInputFilesFromHtmlInputElement(fileInput.current);

      try {
      const info = await extractInfo(
        inputFiles[0]
      );

      const width = (info[0].image? info[0].image.geometry.width : 0) / colCount;
      const height = (info[0].image ? info[0].image.geometry.height : 0) / rowCount;
      let cmd = ``;
      for (let i = 0; i < rowCount; i ++) {
        for (let j = 0; j < colCount; j ++) {
          const offX = width * j;
          const offY = height * i;
          cmd += `convert ${fileName} -crop ${width}x${height}+${offX}+${offY} +repage output_${i}_${j}.gif\n`;
        }
      }
      const result = await execute({
        inputFiles,
        commands: cmd
      });
      console.log(cmd);
      let resultFiles: string[] = [];
      for (const file of result.outputFiles) {
        const path = await buildImageSrc(file);
        resultFiles = [...resultFiles, path];
      }
      setCroppedGif(resultFiles);
    } catch (e) {

    } finally {
      setGenerating(false);
    }
  }

  const onFileSelected = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setOriginalGif(e.target.files[0]);
  }

  const onRowChanged = (e: number | null) => {
    if (e) {
      setRowCount(e);
    }
  }

  const onColChanged = (e: number | null) => {
    if (e) {
      setColCount(e);
    }
  }

  return (
    <div className='flex'>
      <div className='w-1/4 md:1/2 flex flex-col items-center justify-center'>
        <div className='flex flex-col items-end'>
          <Form.Item label="Row Count">
            <InputNumber min={1} max={20} onChange={onRowChanged} defaultValue={rowCount} changeOnWheel/>
          </Form.Item>
          <Form.Item label="Column Count">
            <InputNumber min={1} max={20} onChange={onColChanged} defaultValue={colCount} changeOnWheel />
          </Form.Item>
        </div>
        <Button
          type="primary"
          shape="round"
          size="large"
          disabled={generating}
          onClick={onSelectFile}>
            Pick Gif
        </Button>
        <Button
            className='mt-4'
          type="primary"
          shape="round"
          size="large"
          onClick={splitGif}
          loading={generating}
          disabled={!originalGif || generating}>
            Split Gif
          </Button>
      </div>
      <div className='w-3/4 md:1/2 grow grid grid-cols-1 md:grid-cols-2 gap-4 p-2'>
        <div className='border-2 rounded-md p-2 drop-shadow-md aspect-square flex items-center justify-center'>
          <input
            accept="image/gif"
            className='hidden'
            onChange={onFileSelected}
            ref={fileInput}
            type='file' />
            {
              !originalGif ? 
              <p>Original gif shows here</p>
              :
              <img
                className='aspect-square w-full object-contain'
                src={originalGif ? URL.createObjectURL(originalGif) : ""}
                alt="Original image"/>
            }          
        </div>
        <div className='border-2 rounded-md p-2 drop-shadow-md aspect-square flex items-center justify-center'>
          {
            croppedGif && croppedGif.length > 0 ?
              <div className='flex flex-wrap'>
              {
                  croppedGif.map((s, idx) => {return <div key={`item-${idx}`} className='p-[1px]' style={{width: `${100 / colCount}%`}}><img className='w-full' src={s}/></div>})
              }
              </div>
              :
              <p>Result Image shows here</p>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
