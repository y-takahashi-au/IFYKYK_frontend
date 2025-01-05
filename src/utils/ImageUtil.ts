import imageCompression from 'browser-image-compression'

export default {
  // アップロードされた画像ファイルを取得
  async getCompressImageFileAsync(file: File) {
    const options = {
      maxSizeMB: 1, // 最大ファイルサイズ
      maxWidthOrHeight: 800, // 最大画像幅もしくは高さ
      fileType: 'image/jpeg'
    }
    try {
      // 圧縮画像の生成

      return await imageCompression(file, options)
    } catch (error) {
      console.error('getCompressImageFileAsync is error', error)
      throw error
    }
  },
  // プレビュー表示用のdataurlを取得
  async getDataUrlFromFile(file: File) {
    try {
      return await imageCompression.getDataUrlFromFile(file)
    } catch (error) {
      console.error('getDataUrlFromFile is error', error)
      throw error
    }
  }
}
