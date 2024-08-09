<template>
  <el-upload
    v-model="innerValue"
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :before-upload="beforeUpload"
    :on-success="handleSuccess"
  >
    <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" >
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <el-icon><Download /></el-icon>
          </span>
          <span
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>
</template>
<script lang="ts">
export type UploadEmitsType = {
  clear?: () => void;
}
</script>
<script lang="ts" setup>
import { Plus, ZoomIn, Download, Delete } from '@element-plus/icons-vue'
import { ElMessage, UploadRawFile, UploadFile, UploadFiles } from 'element-plus'
import { imgToBase64, getImgPx } from '@/utils/helper.ts'
interface PropsType {
  modelValue: string | number;
  options?: {
    disabled?: boolean; // 是否置灰
    uploadType?: string[]; // 上传格式，如['png']
    size?: number; // 上传大小限制，如5,则为5M
    pxObj?: {width: number; height: number}; // 允许上传的分辨率，如100*100
    componentEmits?: UploadEmitsType; // 暴露出去的事件
  }
}
const props = withDefaults(defineProps<PropsType>(), {
  options: () => ({})
})
const emit = defineEmits(['update:modelValue'])
const innerValue = computed({
  get () {
    // 统一转成字符串
    return props.modelValue?.toString()
  },
  set (newVal) {
    emit('update:modelValue', newVal)
  }
})

// 上传之前
async function beforeUpload (rawFile: UploadRawFile) {
  console.log(rawFile, 'rawFile')
  let type = rawFile.name.split('.')
  let typeF = type[type.length - 1]
  // 格式限制
  // 如果传入了格式就取传入的格式，否则就取默认格式
  let typeList = props.options.uploadType || ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'pdf']
  if (!typeList.includes(typeF)) {
    ElMessage.warning('请选择正确格式的文件')
    return false
  }

  // 大小限制
  let size = rawFile.size
  // 如果限制了大小就取传入的大小，否则默认不能超过10M
  let maxSize = props.options.size || 10
  if (size / 1024 / 1024 > maxSize) {
    ElMessage.warning( '上传大小不能超过' + maxSize + 'M')
    return false
  }

  // 分辨率限制
  if (props.options.pxObj) {
    const { width, height } = props.options.pxObj
    const base64 = await imgToBase64(rawFile)
    const pxObj = await getImgPx(base64)
    let checkPx = pxObj.width <= width && pxObj.height <= height
    if (!checkPx) {
      ElMessage.warning( `上传图片分辨率不能超过${width}*${height}`)
      return false
    }
  }
  return true
}

function handleSuccess (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) {
  console.log(response, 'response')
  console.log(uploadFile, 'uploadFile')
  console.log(uploadFiles, 'uploadFiles')
}

// 预览图片
function handlePreview (file) {
  console.log(file, 'file')
}
// 下载图片
function handleDownload (file) {
  console.log(file, 'file')
}
// 移除图片
function handleRemove (file) {
  console.log(file, 'file')
}
</script>
<style lang="scss" scoped>
.avatar-uploader {
  :deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: 0.2s;
    &:hover {
      border-color: var(--el-color-primary);
    }
  }
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>