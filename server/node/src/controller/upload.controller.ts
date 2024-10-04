import type { Context } from 'koa'
import path from 'path'
import fs from 'fs-extra'
const allowExtensions = ['.zip', '.tar.gz', '.tgz', '.gz', '.rar', '.7z']
export const uploadFile = async (ctx: Context) => {
  const files = ctx.request.files as any

  if (files && Array.isArray(files.file)) {
    for (const file of files.file) {
      // 确保文件对象有 path 属性
      if (typeof file === 'object' && file !== null) {
        const originalName = path.basename(file.filepath)
        const extension = path.extname(originalName)

        // 生成新的文件名（例如：使用时间戳和随机数）
        const newName = `${Date.now()}-${Math.random().toString(
          36
        )}${extension}`

        // 定义最终保存的路径
        const finalPath = path.join(__dirname, 'finalDestination', newName)

        try {
          // 确保目标目录存在
          await fs.ensureDir(path.dirname(finalPath))

          // 移动文件到最终路径
          await fs.move(file.filepath, finalPath, { overwrite: false })

          console.log(`File ${originalName} uploaded and renamed to ${newName}`)
          ctx.body = {
            message: 'File(s) uploaded successfully!',
            filePaths: [finalPath],
          }
        } catch (err: any) {
          ctx.status = 500
          ctx.body = { message: 'Failed to upload file', error: err.message }
        }
      } else {
        ctx.status = 400
        ctx.body = { message: 'Invalid file object' }
      }
    }
  } else if (files && typeof files.file === 'object') {
    const file = files.file
    const originalName = path.basename(file.filepath)
    const extension = path.extname(originalName)
    if (!allowExtensions.includes(extension)) {
      ctx.status = 400
      ctx.body = { message: 'Invalid file type ' }
      return
    }
    console.log(`Received file: ${originalName}`)

    const newName = `${originalName}`

    // 定义最终保存的路径
    const finalPath = path.join(__dirname, '../uploads', newName)

    // try {
    //   // 确保目标formidable.Files目录存在
    //   await fs.ensureDir(path.dirname(finalPath))

    //   // 移动文件到最终路径
    //   await fs.move(file.filepath, finalPath, { overwrite: true })

    ctx.body = { message: 'File uploaded successfully!' }
    // } catch (err: any) {
    //   ctx.status = 500
    //   ctx.body = { message: 'Failed to upload file', error: err.message }
    // }
  } else {
    ctx.body = { message: 'No file uploaded' }
  }
}
