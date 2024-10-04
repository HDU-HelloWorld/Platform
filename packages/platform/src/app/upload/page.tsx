'use client'
import React from 'react'
import { Upload, Radio, Button } from '@arco-design/web-react'

function App() {
  const [fileList, setFileList] = React.useState([])

  return (
    <>
      <h1>HelloWorld社团二面临时上传通道</h1>
      <span className="text-gray-500">仅支持上传压缩文件</span>
      <div className="custom-upload-progress w-1/2">
        <Upload
          autoUpload={false}
          drag
          accept={'.zip,.tar.gz,.tgz,.gz,.rar,.7z'}
          // showUploadList={{
          //   startIcon: (
          //     <Button size="mini" type="text">
          //       开始上传
          //     </Button>
          //   ),
          //   cancelIcon: (
          //     <Button size="mini" type="text">
          //       取消上传
          //     </Button>
          //   ),
          //   reuploadIcon: (
          //     <Button size="mini" type="text">
          //       点击重试
          //     </Button>
          //   )
          // }}
          // progressProps={{
          //   size: 'small',
          //   type: 'line',
          //   showText: true,
          //   width: '50%'
          // }}
          multiple
          fileList={fileList}
          action={process.env.NEXT_PUBLIC_BASE_URL + '/upload'}
          onChange={(v: any) => setFileList(v)}
          onProgress={(file) => {
            setFileList((v: any) => {
              return v.map((x: any) => {
                return x.uid === file.uid ? file : x
              })
            })
          }}
        />
      </div>
    </>
  )
}

export default App
