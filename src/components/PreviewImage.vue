<template>
  <div class="Preview">
    <div class="head">
      <div class="head-title">预览</div>
      <div class="SdtoolsClose" @click="$emit('close')">
        <img src="../assets/close.png" />
      </div>
    </div>
    <div class="Line"></div>
    <img class="imageBig" :src="`${config.apiBaseUrl}/image/${imageId}`" />
    <div class="operation">
      <div class="op1" @click="downloadImage(imageId, `${props.taskDetail.seed}-${props.taskDetail.prompt}-${props.imageId}.jpg`)">
        <div class="SdtoolsDownload">
          <img src="../assets/download_black.png" />
        </div>
        <div class="op-title">下载</div>
      </div>
      <div v-if="showReferenceOption"  class="op2">
        <div
            class="SdtoolsImageP"
            @click="handleClick"
          >
          <img src="../assets/image-ref.png" />
        </div>
        <div class="op-title">设为参考图</div>
      </div>
      <div class="op3">
        <div class="SdtoolsStar" @click="toggleFavorite(imageId)">
          <img :src="isFavorite ? '../src/assets/star-full.png' : '../src/assets/star_black.png'" />
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
import { config } from '../config';
import { defineEmits} from 'vue';
import axiosInstance from '@/services/axiosConfig';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();


// 定义 props 的类型
interface TaskDetail {
  height:string;
  width:string;
  shortid:number;
  update_time:string;
  steps:string;
  prompt:string;
  seed:string;
}

// 定义 props
const props = defineProps<{
  taskDetail: TaskDetail;
  imageId: number;
  shortcutId?: number;
  imageUrl?: string;
  showReferenceOption: boolean;  
  currentTitle: string;
  senceSubTitle: string;
  images: string|null;
  referenceSet: Function;
}>();


if(props.images==="")
 {
  toast.error("获取不到图片!")

 }

const imagesList = props.images ? props.images.split(",") : [];
console.log(imagesList);
console.log(props.imageId);
const currentIndex = ref(imagesList.indexOf(String(props.imageId)));
console.log(currentIndex.value);

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


// 处理点击事件并调用父组件传递的函数
const handleClick = () => {
  if (props.referenceSet) {
    props.referenceSet();
  }
};
//设置图片为参考图片
const emits = defineEmits(['referenceSet', 'imageDeleted','close']);


//图片收藏

const isFavorite = ref(false);

const toggleFavorite = async (imageId:Number) => {
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
    if(response.data.success)
      {        
        // 从数组中移除当前图片
        imagesList.splice(currentIndex.value, 1);
        toast.info("删除图片成功!")
        if (imagesList.length === 0) {
          //没有图片时关闭预览
          emits('imageDeleted', imageId , "" );  
        }
        else
        { 
          if (currentIndex.value === 0) {
          currentIndex.value = imagesList.length - 1;  // 切换到最后一张
          } else {
          currentIndex.value--;  // 切换到前一张
          }
           // 更新当前显示的图片ID 传给父组件
           console.log(imagesList[currentIndex.value])
          emits('imageDeleted', imageId, imagesList[currentIndex.value]);
        }

      }
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
