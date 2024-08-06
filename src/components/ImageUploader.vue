<template>
  <div class="image-uploader">
    <input type="file" ref="fileInput" @change="onFileChange" accept="image/*" style="display: none;" />
    <div v-if="!imageUrl" class="upload-icon" @click="triggerFileInput">
      <img src="../assets/image-P.png" alt="Upload Icon" />
    </div>
    <div v-else class="image-preview" @click="triggerFileInput">
      <img :src="imageUrl" alt="上传参考图片" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axiosInstance from '@/services/axiosConfig'
import { useToast } from 'vue-toastification'
import { defineEmits } from 'vue';

const emits = defineEmits(['uploadSuccess']);

const toast = useToast();

// import { Console } from 'console';
const props = defineProps<{ imageUrl: string | null }>();

const fileInput = ref<HTMLInputElement | null>(null);
const error = ref('')
const successMessage = ref('')

const onFileChange = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // imageUrl.value = e.target?.result as string;  //由父组件控制，不在这里更新
      // console.log(imageUrl.value)

    };
    reader.readAsDataURL(file);
  }

  const formData = new FormData()
  formData.append('file', file);

  try {
    error.value = ''
    successMessage.value = ''
    const response = await axiosInstance.post('/image/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const imageId = response.data.data.id;
    console.log(imageId);
    emits('uploadSuccess',imageId);
    toast.success('图片上传成功');
    console.log(props.imageUrl)
  } catch (err) {
    toast.error('图片上传失败，请重试');
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

</script>

<style scoped>
.image-uploader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.upload-icon, .image-preview {
  cursor: pointer;
}

.upload-icon img, .image-preview img {
  max-width: 100%;
  max-height: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
