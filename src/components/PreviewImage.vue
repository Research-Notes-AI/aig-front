<template>
  <div class="Preview">
    <div class="head">
      <div class="head-title">预览</div>
      <div class="SdtoolsClose" @click="$emit('close')">
        <img src="../assets/close.png" />
      </div>
    </div>
    <div class="Line"></div>
    <img class="imageBig" :src="`http://13.215.140.116:5001/api/v1/image/${imageId}`" />
    <div class="operation">
      <div class="op1" @click="downloadImage(imageId, `{{ taskDetail.seeds }}-{{ taskDetail.promp }}-image.jpg`)">
        <div class="SdtoolsDownload">
          <img src="../assets/download_black.png" />
        </div>
        <div class="op-title">下载</div>
      </div>
      <div v-if="showReferenceOption"  class="op2">
        <div
            class="SdtoolsImageP" 
            @click="setAsReferenceImage(imageId)"
          >
          <img src="../assets/image-ref.png" />
        </div>
        <div class="op-title">设为参考图</div>
      </div>
      <div class="op3">
        <div class="SdtoolsStar" @click="toggleFavorite(imageId)">
          <img :src="isFavorite ? 'src/assets/star-full.png' : 'src/assets/star_black.png'" />
        </div>
        <div class="op-title">喜欢</div>
      </div>
      <div class="op4">
        <div class="SdtoolsDelete" @click="deleteImage(imageId)">
          <img src="../assets/delete.png" />
        </div>
        <div class="op-title">删除</div>
      </div>
    </div>
    <div class="Line"></div>
    <div class="Frame1000003518">
      <div class="label">生成方式</div>
      <div class="value">{{ currentTitle }} / {{ senceSubTitle }} </div>
    </div>
    <div class="Line"></div>
    <div class="Frame1000003521">
      <div class="label">提示词</div>
      <div class="value">{{ taskDetail.prompt }}</div>
    </div>
    <div class="Line"></div>
    <div class="Frame1000003519">
      <div class="label">创建时间</div>
      <div class="value">{{ taskDetail.update_time }}</div>
    </div>
    <div class="Line"></div>
    <div class="Frame1000003520">
      <div class="label">分辨率</div>
      <div class="value"> {{ taskDetail.height }} ×  {{ taskDetail.height }} px</div>
    </div>
    <div class="Line"></div>
    <div class="Frame1000003523">
      <div class="label">步数</div>
      <div class="value">{{ taskDetail.steps }}</div>
    </div>
    <div class="Line"></div>
    <div class="Frame1000003522">
      <div class="label">种子</div>
      <div class="value">{{ taskDetail.seed }}</div>
    </div>
    <div class="Line"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType ,defineEmits} from 'vue';
import axiosInstance from '@/services/axiosConfig';
import { ref, watch } from 'vue';
import { toastInjectionKey } from 'vue-toastification';
import { useToast } from 'vue-toastification';
import { SetupStoreDefinition } from 'pinia';

const toast = useToast();


// 定义 props 的类型
interface TaskDetail {
  height:string;
  width:string;
  shortid:string;
  update_time:string;
  steps:string;
  prompt:string;
  seed:string;
}

// 定义 props
const props = defineProps<{
  taskDetail: TaskDetail;
  imageId: string;
  shortcutId: string;
  imageUrl: string;
  showReferenceOption: boolean;  
  currentTitle: string;
  senceSubTitle: string;
}>();

console.log(props.currentTitle);
console.log(props.senceSubTitle);

//下载图片
const downloadImage = async (imageId: Number, filename: string) => {
   try {
    const response = await axiosInstance.get(`/image/download/${imageId}`, {
      responseType: 'blob',
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('下载图片时出错:', error);
  }
};

//设置图片为参考图片
const emits = defineEmits(['referenceSet', 'imageDeleted']);

const setAsReferenceImage = async (imageId: Number) => {
   try {
    const response = await axiosInstance.post(`/shortcut/refimage`, {
      image_id: props.imageId,
      shortcut_id: props.shortcutId,
     });
     emits('referenceSet', props.imageUrl);
     toast.success('设置参考图片成功');

  } catch (error) {
    toast.error('设置参考图片失败');
    console.error('设置参考图片失败:', error);
  }
};
//图片收藏

const isFavorite = ref(false);

const toggleFavorite = async (imageId:number) => {
  isFavorite.value = !isFavorite.value;
  try {
    await axiosInstance.post(`/image/like/${imageId}`, {
      imageId: props.imageId,
      favorite: isFavorite.value
    });
  } catch (error) {
    console.error('更新喜欢状态时出错:', error);
    // 如果请求失败，则恢复原来的状态
    isFavorite.value = !isFavorite.value;
  }
};

//删除图片
const deleteImage = async (imageId:Number) => {
  try {
    const response= await axiosInstance.post(`/image/delete/${props.imageId}`);
    emits('imageDeleted', props.imageId);
    if(response.data.success)
       {toast.info("删除图片成功!")}
  } catch (error) {
    console.error('删除图片时出错:', error);
  }
};
</script>

<style scoped>

.Preview {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 460px;
  padding: 20px;
  background: #fcfcfc;
  box-sizing: border-box;
  height: fit-content;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.head-title {
  width: 129px;
  height: 18px;
  color: #8e8e8e;
  font-size: 12px;
  font-family: Quicksand;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0.12px;
  word-wrap: break-word;
}

.SdtoolsClose {
  width: 16px;
  height: 16px;
  position: relative;
  cursor: pointer;
}

.Line {
  width: 100%;
  height: 0px;
  border: 1px solid #e3e3e3;
}

.imageBig {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.operation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.op1, .op2, .op3, .op4 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 60px;
  height: 46px;
}

.SdtoolsDownload, .SdtoolsImageP, .SdtoolsStar, .SdtoolsDelete {
  width: 24px;
  height: 24px;
  position: relative;
  cursor: pointer;

}

.op-title {
  width: 62px;
  height: 18px;
  text-align: center;
  color: #1d1d1d;
  font-size: 12px;
  font-family: Quicksand;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0.12px;
  word-wrap: break-word;
}

.Frame1000003518, .Frame1000003521, .Frame1000003519, .Frame1000003520, .Frame1000003523, .Frame1000003522 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.label {
  width: 49px;
  height: 18px;
  color: #1d1d1d;
  font-size: 12px;
  font-family: Nunito;
  font-weight: 700;
  text-transform: capitalize;
  line-height: 24px;
  letter-spacing: 0.12px;
  word-wrap: break-word;
}

.value {
  text-align: right;
  color: #8e8e8e;
  font-size: 12px;
  font-family: Quicksand;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0.12px;
  word-wrap: break-word;
}

.value-long {
  width: 298px;
  height: 18px;
}

.value-medium {
  width: 183px;
  height: 18px;
}

.value-short {
  width: 62px;
  height: 18px;
}

.value-extra-short {
  width: 73px;
  height: 18px;
}
</style>
