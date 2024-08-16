<template>
<div class="shortcut-container">
      <div class="middle" >
        
      <div v-for="(section,sectionIndex) in sections" :key="sectionIndex" class="sence">
          <div class="middle-title">{{ section.title }}</div>
          <div 
              v-for="(middleItem, itemIndex) in section.items" 
              :key="itemIndex"
              :class="['middleItem', { active: selectedItem && selectedItem.subTitle === middleItem.subTitle }]"
              @click="selectItem(middleItem)" 
           >
             <img :src="`${config.apiBaseUrl}/image/${middleItem.imageSmall}`" class="middle-image" />
             <div class="middle-subtitle">{{ middleItem.subTitle }}</div>
          </div>
       </div>
      </div>
      <div class="sideright2" :class="{ 'expanded': !previewVisible }">
      <!-- <div class="Frame3666"> -->
      <div class="prompt">
        <div class="prompt-frame">
          <div class="text-label">提示词</div>
          <div class="text-count">{{ keywordsInput.length }}/1000</div>
        </div>
        <textarea
          v-model="keywordsInput"
          @input="updateText"
          placeholder="输入提示词"
          :class="{ 'input-error': isKeywordInputEmpty }"
        ></textarea>
      </div>
      <div class="text_image_num">
        <div class="text-label">生成图片数量</div>
        <div class="Frame1000003489">
          <div class="Frame1000003487">
            <div class="CommonImagessmall">
              <img src="../assets/imagessmall.png" />
            </div>
            <div class="select">
              <select id="dropdown" v-model="selectedOption">
                <option v-for="option in options" :key="option.value" :value="option.text">
                  {{ option.text }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="simKeyword">
        <div class="Frame3662">
          <div class="text-label">图片与提示词的相关性</div>
        </div>
        <ProgressBar 
           :class="{ 'expanded': previewVisible }" 
           id="keywordsRelevance" 
           class="ProgressBar" 
           :selectedPercentage="keywordsRelevance"
           @selectedPercentage="updateKeywordsRelevance"
           />
        <div class="Frame3660">
          <div class="creative-label">更有创意</div>
          <div class="relevance-label">更贴近提示词</div>
        </div>
      </div>
      <div class="ImageP">
        <div class="Frame3647">
          <div class="text-label">上传参考图片</div>
          <div class="reference-description">上传后会生成与参考图片相似的图片</div>
        </div>
        <div class="SdtoolsImageP">
          <ImageUploader
           :imageUrl="imageUrl"
           @uploadSuccess="handleUploadSuccess"/>
        </div>
      </div>
      <div  v-if="isImageUploaded" class="simImage"  >
           <div class="Frame3662">
           <div class="text-label">贴近参考图程度</div>
        </div>
        <ProgressBar 
        :class="{ 'expanded': previewVisible }" 
        id="imageRelevance" 
        :selectedPercentage="imageRelevance"
        @update:selectedPercentage="updateImageRelevance" 
        class="ProgressBar"/>
        <div class="Frame3660">
          <div class="creative-label">更有创意</div>
          <div class="relevance-label">更贴近参考图</div>
        </div>
      </div>
      <div v-if="!(generatedImages.length)" class="senceInfo">
        <div class="text-label">场景说明</div>
        <div v-if="selectedItem" class="scene-description">{{ selectedItem.desc }}</div>
        <img v-if="selectedItem" class="Image8" :src="`${config.apiBaseUrl}/image/${selectedItem.imageBig}`" />
        <div v-if="isGenerating" class="loading-overlay">
        <div class="loading-spinner"></div>
         <div class="loading-text">正在生成图片，请稍候...</div>
        </div>
       </div>

      <div v-else class="imageList">
  
         <div v-for="image in generatedImages" 
         :key="image.id" 
         class="image-container" 
         @click="showPreview(image.id,taskId)"
         >
            <img class="imageItem" :src="`${config.apiBaseUrl}/image/` + image.id" :alt="image.title" />
         </div>
      </div>
    <div v-if="!(generatedImages.length)" class="Frame3"     
            @click="generateImages" 
            :class="{'disabled':isGenerating}">
        <div class="generate-button" 
             >生成图片</div>
    </div>
    <div v-else class="action-buttons">
      <div class="download" @click="downloadAllImages('image.zip')">
        <div class="button-content" >
          <img src="../assets/download.png" class="icon">
          <div class="download-text">
             全部下载
             <div class="download-desc">打包下载生成的所有图片</div>
          </div>   
        </div>
      </div>
      <div class="regen" @click="regenerateImages" :disabled="isGenerating">
        <div class="button-content-regen" >
          <img src="../assets/edit.png" class="icon">
            <div class="regen-text" >
             重新生成
            <div class="regen-desc" >修改条件重新生成图片</div>
          </div>
        </div>
      </div>
    </div>
        <!-- </div> -->
      </div>
      <PreviewImage 
         v-if="previewVisible" 
         :imageId="selectedImageId"
         @close="closePreview" 
         @imageDeleted="handleImageDeleted" 
         :referenceSet="setAsReferenceImage"
         :taskDetail="taskDetail"
         :shortcutId="shortcutId"
         :imageUrl="uploadedImageUrl"
         :currentTitle="currentTitle"
         :senceSubTitle="senceSubTitle"
         class="preview-image"
         :show-reference-option="true"
         :images="imageList"
       />
    </div>
</template>

<script setup lang="ts">
import { ref,onMounted, watch } from 'vue'
import { useToast } from 'vue-toastification';

import ProgressBar from '../components/ProgressBar.vue';
import ImageUploader from '../components/ImageUploader.vue';
import axiosInstance from '@/services/axiosConfig';

import PreviewImage from '@/components/PreviewImage.vue';
import  {useRouter, useRoute }  from 'vue-router'
import { config } from '@/config';

const router = useRouter();
const route = useRoute();
 

const previewVisible = ref(false);
const selectedImageId = ref();

const isImageUploaded = ref(false);
const activeTab = ref('文生图');

const selectTab = (tab: string) => {
  activeTab.value = tab;
  senceSubTitle.value = activeTab.value;
  }

// const imageId = ref();
// const shortcutId = ref();
//点击图片时调用 
const showPreview = (imageId: string,taskId:Number) => {
  selectedImageId.value = imageId;
  previewVisible.value = true;
  uploadedImageUrl.value =  `${config.apiBaseUrl}/image/${imageId}`; 


};
//定义变量
const isCollapsed = ref(false);
const toast = useToast();

const isGenerating = ref(false); // 控制生成图片按钮是否可点击的状态
const isKeywordInputEmpty = ref(false);//提示词输入状态

const currentTitle = ref<string>('快捷场景');// 默认选中第一个项的标题
const activeTitle = ref<string>('快捷场景');
// const isSidebarCollapsed = ref(false);

const updateTitle = (title: string) => {
  currentTitle.value = title;
};

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const options = ref([
  { value: 'option1', text: 1 },
  { value: 'option2', text: 5 },
  { value: 'option3', text: 10 },
  { value: 'option3', text: 15 },
  { value: 'option3', text: 20 }
]);


const imageUrl = ref<string | null>(null); // 用于传递给 ImageUploader.vue 的图标
const uploadedImageUrl = ref<string>('');
const referenceImage = ref<string | null>(null);
const imageIdList = ref<string[]>([]);

// 快捷场景生成任务入参
const keywordsInput = ref<string>('');
// const sim = ref<number>(0);
const uploadedImageId = ref<Number>();
const keywordsRelevance = ref(80);
const imageRelevance = ref(80);
const updateKeywordsRelevance = (value: number) => {
  keywordsRelevance.value = value;
};
const updateImageRelevance = (value: number) => {
  imageRelevance.value = value;
};


//上传成功事件动作
const handleUploadSuccess = (imageId: Number) => {
  isImageUploaded.value = true;
  uploadedImageId.value = imageId;
  uploadedImageUrl.value =  `${config.apiBaseUrl}/image/${imageId}`; 
  imageUrl.value = uploadedImageUrl.value; // 更新图标
  console.log(imageUrl.value);

}; 

const handleReferenceSet = () => {
  isImageUploaded.value = true; //同上传图片成功
  uploadedImageId.value = selectedImageId.value; //为后续生成任务请求做准备
  referenceImage.value =  `${config.apiBaseUrl}/image/${selectedImageId.value}`;
  imageUrl.value = referenceImage.value; // 更新图标
  console.log( imageUrl.value);

};

//默认选择

const selectedOption = ref(options.value[0].text)

console.log(selectedOption)
console.log(uploadedImageId)

// 定义图片类型
interface Image {
  id: string;
  url: string;
  title: string;
}

// 定义响应类型
interface CreateTaskResponse {
  taskId: Number;
}

//获取快捷场景数据
interface Item {
  subTitle: string;
  id:Number;
  desc:string;
  imageBig:Number;
  imageSmall:Number;
}

interface Section {
  items: Item[];
  title: string;
}

const sections = ref<Section[]>([]);
const selectedItem = ref<Item | null>(null);

const fetchData = async () => {
  try {
    const response = await axiosInstance.get('/shortcut/list');
    if (response.data.data !== null) {
      sections.value = response.data.data;

      if (sections.value.length > 0 && sections.value[0]?.items?.length > 0) {
        selectedItem.value = sections.value[0].items[0];
        senceSubTitle.value = selectedItem.value.subTitle;
      }
      // successMessage.value = '获取项目成功'
    } else {
      toast.info(response.data.message);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

/** 创建任务 生成图片发送请求结果 */
const generatedImages = ref<Image[]>([]);
let taskId = ref<Number>(0);
let taskStatus = ref<string | null>(null);

let taskDetail = ref();
let shortcutId = ref();
let senceSubTitle = ref("");

const imageList = ref<string>('');

 //选择快捷场景
const selectItem = (item: any) => {
 selectedItem.value = item;
   if(selectedItem.value){
   senceSubTitle.value = selectedItem.value.subTitle;
   
  // 重置输入状态
  keywordsInput.value = '';
  keywordsRelevance.value = 80;
  isImageUploaded.value = false;
  imageUrl.value = '';
  previewVisible.value = false;


  // // 强制刷新当前 ShortCut 页面
  // router.push({ name: 'ShortCut', query: {} }).then(() => {
  //   router.go(0); // 这行代码会重新加载当前路由
  // });
  if (route.name === 'ShortCut' && route.query.taskid) {
    // 当前是 shortcut?taskid=*** 页面，更新地址栏为 shortcut
    router.push({ name: 'ShortCut', query: {} });
  } 
 }
 else
  {toast.error("未选中场景！！！")}

};

/* 右下文本输入*/
const text = ref('');
const updateText = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  text.value = target.value;
};


// 创建任务并获取任务ID
const createTask = async () => {
  try {
  
    if (!keywordsInput.value.trim()) {
    isKeywordInputEmpty.value = true;
    toast.info("请输入提示词");
    return false;
     }
     isKeywordInputEmpty.value = false;
    if (selectedItem.value ) {
       shortcutId.value = selectedItem.value.id;
       if(uploadedImageId.value){
       const params = {
        shortcut_id: selectedItem.value.id, // 替换为场景Id
        prompt: keywordsInput.value,
        n: selectedOption.value, //图片生成数量
        ref_image_sim: imageRelevance.value/100,
        ref_image_id: uploadedImageId.value, // 上传成功后imageId
        sim:keywordsRelevance.value/100
      }
       const response = await axiosInstance.post(`/task/from_shortcut`, params);
       taskId.value = response.data.data.id; 
  
       }
        else{
        const params = {
         shortcut_id: selectedItem.value.id, // 替换为场景Id
         prompt: keywordsInput.value,
         n: selectedOption.value, //图片生成数量
         sim:keywordsRelevance.value/100
          } 
         const response = await axiosInstance.post(`/task/from_shortcut`, params);
          taskId.value = response.data.data.id  
        }
       return true;
    } else {
      toast.error('获取快捷场景id失败');
      return false; // 获取快捷场景ID失败

    }
  } catch (error) {
    toast.error('创建任务失败');
    console.error('Error creating task:', error);
    return false; // 创建任务失败

  }
};

//查询任务状态信息
const queryTaskStatus = async () => {
  if (!taskId.value) {
    const isTaskCreated = await createTask();
    if (!isTaskCreated) {
      return false; // 创建任务失败，终止后续操作
    }
  }
  try {
    if (taskId.value) {
      const params = {
        task_id: taskId.value // 替换为任务Id
      };
      const response = await axiosInstance.get(`/task/${params.task_id}`);
      taskStatus.value = response.data.data.status;// 替换为实际的任务状态查询接口
      taskDetail.value = response.data.data;
      console.log(taskDetail.value)
      return taskStatus.value === 'completed'; // 接口返回任务状态，判断是否完成
      // 更新 URL，追加 taskId 参数
  
     } 
      else {
      toast.error('任务id获取失败');
      return false; // 获取任务ID失败
     } 
   } catch (error) {

    console.error('Error querying task status:', error);
    return false; // 查询失败时返回 false，
  }
};



//生成图片
const generateImages = async () => {
  
 if(isGenerating.value) return; // 防止重复点击
  
  isGenerating.value = true; // 设置生成图片按钮不可点击状态
 
 try { 
   
   const checkTaskStatus = async () => {
    const isCompleted = await queryTaskStatus();
    // console.log(isCompleted)
    if (!isCompleted) {
      // 如果任务状态不是完成态，继续查询
      setTimeout(checkTaskStatus, 1000); // 设置适当的间隔，避免过度频繁地查询
    } else {
      // 任务状态为完成态时，调用获取图片接口
        const params = {
          task_id: taskId.value, // 替换为实际任务ID
        };
        const response = await axiosInstance.get('/image/list', { params });
        generatedImages.value = response.data.data; // 返回的数据中包含图片数组
        
          //用于下载图片用
        if (generatedImages.value.length > 0) {
          imageList.value = generatedImages.value.map(image => image.id).join(',');
        }   
        console.log(imageList.value);
        isGenerating.value = false; // 恢复生成图片按钮可点击状态
        const taskIdString = taskId.value.toString();

        router.push({ name: 'ShortCut', query: { taskid: taskIdString } });
        saveState();
      } 
  };
  /**任务创建失败就返回 */
   const isTaskCreated = await createTask();
    if (!isTaskCreated) {
      isGenerating.value = false;
      return;
    }
  await checkTaskStatus(); // 首次调用检查任务状态
}
  catch (error) {
    console.error('Error generating images:', error);
  } 
  finally {
    // isGenerating.value = false; // 恢复生成图片按钮可点击状态
  }
};


/*下载所有图片*/
const downloadAllImages = async (filename: string) => {
  // 实现下载所有生成图片的逻辑
  const ids = imageList.value;
try {
    const response = await axiosInstance.get(`/image/download/${ids}`, {
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

//重新生成图片
const regenerateImages = async () => {
  previewVisible.value = false; //关闭预览区
  const isTaskCreated = await createTask(); //等待task创建成功后再 做生成图片请求

  if (isTaskCreated) {
    generatedImages.value = [];
    await generateImages();
  }
};

function closePreview() {
  previewVisible.value = false;
  selectedImageId.value = null;
}

// 处理图片删除
const handleImageDeleted = (imageId:any,imageNextId:any ) => {

 //图片展示部分去掉删除的图片
  generatedImages.value = generatedImages.value.filter(image => image.id !== imageId);  
  if (imageNextId==="" ){
    previewVisible.value = false;
    selectedImageId.value = null;
  }
  else {
    console.log(imageNextId);
    previewVisible.value = true;
    selectedImageId.value = imageNextId;
    uploadedImageUrl.value =  `${config.apiBaseUrl}/image/${imageNextId}`; 

  }
}

const setAsReferenceImage = async () => {

   try {

    if (selectedItem.value) {
    const response = await axiosInstance.post(`/shortcut/refimage`, {
      image_id: selectedImageId.value,
      shortcut_id: selectedItem.value.id,
     });
    }
    handleUploadSuccess(selectedImageId.value);
     toast.success('设置参考图片成功');

  } catch (error) {
    toast.error('设置参考图片失败');
    console.error('设置参考图片失败', error);
  }
};

// 保存当前状态到 localStorage
const saveState = () => {
  localStorage.setItem('keywordsInput', keywordsInput.value);
  localStorage.setItem('generatedImages', JSON.stringify(generatedImages.value));
  localStorage.setItem('imageRelevance', String(imageRelevance.value));
  localStorage.setItem('keywordsRelevance', String(keywordsRelevance.value));
  localStorage.setItem('isImageUploaded',String(isImageUploaded.value));
  if(imageUrl.value != null)
  {localStorage.setItem('imageUrl',String(imageUrl.value));}

  localStorage.setItem('previewVisible',String(previewVisible.value));
  localStorage.setItem('taskDetail',JSON.stringify(taskDetail.value));
};

// 监听变化保存状态
watch([keywordsInput, generatedImages, imageRelevance, keywordsRelevance,isImageUploaded,imageUrl,previewVisible], saveState);

onMounted(() => {
  fetchData();
  if (route.query.taskid) {
    // 只有当有 taskid 时才恢复状态
    keywordsInput.value = localStorage.getItem('keywordsInput') || '';
    generatedImages.value = JSON.parse(localStorage.getItem('generatedImages') || '[]');
    imageRelevance.value = parseInt(localStorage.getItem('imageRelevance')?? '80') || 80;
    keywordsRelevance.value = parseInt(localStorage.getItem('keywordsRelevance') ?? '80') || 80;
    const storedValue = localStorage.getItem('isImageUploaded');
    isImageUploaded.value = storedValue === 'true';
    imageUrl.value = localStorage.getItem('imageUrl') || null;
    console.log(imageUrl.value);
    taskDetail.value = JSON.parse(localStorage.getItem('taskDetail') || '[]');
    previewVisible.value = false;
  }
  else
  { // 初始化选中第一个标题
    currentTitle.value = '快捷场景';
    activeTitle.value = '快捷场景';
  }
});
</script>

<style> 
.shortcut-container {
  width: 100%;
  align-items:flex-start;
  height: 100vh; 
  display: flex;
  position: relative; /* 确保子元素的绝对定位 */ 
}
select {
  /* margin-top: 2px; */
  /* padding: 2px; */
  font-size: 16px;
  border: 2px solid transparent; /* 将边框设置为透明 */
  background-color: white; /* 设置背景颜色为白色以确保文本可见 */
  border-radius: 4px; /* 可选，设置圆角 */
  outline: none; /* 移除默认的焦点样式 */
}

.right-bottom {

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  position: relative; /* 确保子元素的绝对定位 */
}

.lefttop {
  width: 400px;
  height: 100px;
  padding: 10px 20px;
  border-top-left-radius: 16px;
  border-bottom: 1px #E3E3E3 solid;
  justify-content: space-between;
  align-items: center;
  display: flex;
  box-sizing: border-box; /* 包含内边距和边框*/
} 
/* .lefttop div {
      /* background-color: lightgrey; 为子元素添加背景颜色以便观察布局 */
      /* padding: 10px;
      box-sizing: border-box; /* 确保内边距和边框包含在元素的总高度内 */
   /* } */

.ComponentLogo {
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  display: flex;
  margin: 0;
  padding: 0;
}

.Abstract05 {
  width: 60px;
  height: 60px;
  border-radius: 8px;
}

.Frame2186 {
  height: 56px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  display: inline-flex;
}

.AigAiImagesGenerator {
  width: 190px;
  height: 55px;
}

.AigAiImagesGenerator span {
  color: #1D1D1D;
  font-size: 24px;
  font-family: Nunito;
  font-weight: 700;
  letter-spacing: 0.24px;
  word-wrap: break-word;
}

.AigAiImagesGenerator span:last-child {
  color: #797979;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.14px;
}

.CommonSidebarLeft,
.CommonArrowRight01,
.CommonGalleryFavorite,
.CommonTranslate,
.CommonDocumentCode,
.CommonDocumentText,
.CommonMessageText {
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  display: flex;
  /* margin: 0;
  padding: 0; */
}

.ComponentAbstract06,
.DocumentText,
.MessageText {
  width: 24px;
  height: 24px;
  position: relative;
}

.SidebarLeft img {
  width: 24px;
  height: 24px;
}


.Frame_blank {
  width: 400px;
  height: calc(100% - 100px);
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  display: flex;
  position: relative;
}

.leftMid {
  width: 400px;
  height: 380px;
  padding: 20px 0;
  flex-direction: column;
  /* justify-content: ; 垂直方向 */
  align-items: center;
  gap: 20px;
  display: flex;
  flex-shrink: 0;
}

.documentCode {
  width: 360px;
  height: 100px;
  padding: 28px 20px;
  border-radius: 8px;
  border:1px solid #E3E3E3;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
}

.Frame3643 {
  border: 1px #377DFF solid;
}

.Frame3652 {
  border: 1px #E3E3E3 solid;
}

.Frame3649 {
  /* height: 44px;
  justify-content: flex-start;
  align-items: center;
  gap: 20px; */
  display: flex;

  width: 237px;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
}

.Frame3647 {
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
  display: inline-flex;
}

.Frame3647 div:first-child {
  color: #1D1D1D;
  font-size: 16px;
  font-family: Nunito;
  font-weight: 700;
  text-transform: capitalize;
  line-height: 24px;
  letter-spacing: 0.16px;
  word-wrap: break-word;
}

.Frame3647 div:last-child {
  color: #8E8E8E;
  font-size: 12px;
  font-family: Quicksand;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.12px;
  word-wrap: break-word;
}

.tips {
  width: 193px;
  height: 18px;
  color: #8E8E8E; 
  font-size: 12px; 
  font-family: Quicksand; 
  font-weight: 700; 
  line-height: 22px;
  letter-spacing: 0.12px; 
  word-wrap: break-word;
}
.leftBottom {
  align-self: stretch;
  width:400px;
  /* height: 240px; */
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  display: flex;
  position:fixed;
  bottom: 0px;
}

.Frame1000003507,
.Frame1000003506,
.Frame1000003509 {
  align-self: stretch;
  height: 60px;
  padding: 20px;
  border-top: 1px #E3E3E3 solid;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
}

.ComponentAbstract01 {
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  display: flex;
}

.Larrykey {
  color: #1D1D1D;
  font-size: 16px;
  font-family: Nunito;
  font-weight: 400;
  text-transform: capitalize;
  line-height: 24px;
  letter-spacing: 0.16px;
  word-wrap: break-word;
}

.Frame1000003506 div:last-child,
.Frame1000003509 div:last-child {
  color: #1D1D1D;
  font-size: 16px;
  font-family: Nunito;
  font-weight: 400;
  text-transform: capitalize;
  line-height: 24px;
  letter-spacing: 0.16px;
  word-wrap: break-word;
}

.right-top {
  align-self: stretch;
  height: 100px;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  border-radius: 0px 16px 0px 0px;
  border-bottom: 1px solid #E3E3E3;
  box-sizing: border-box; /* 包含内边距和边框 */
}

.right-top-inner {
  height: 100px;
  justify-content: flex-start;
  align-items: center;
  /* justify-content: space-between; */
  gap: 20px;
  display: flex;
  flex-shrink: 0;
}

.title {
  width: 65px;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  display: flex;
  color: #1d1d1d;
  font-size: 16px;
  font-family: Nunito;
  font-weight: 700;
  text-transform: capitalize;
  line-height: 24px;
  letter-spacing: 0.16px;
  word-wrap: break-word;
}

.ComponentHistory {
  height: 40px;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  display: flex;
  width: 160px;
  flex-shrink: 0;
}

.Frame1000003526 {
  width: 120px;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 8px;
  border: 1px #017aff solid;
  justify-content: space-between;
  align-items: center;
  display: flex;
}

.SdtoolsHistory {
  width: 24px;
  height: 24px;
  position: relative;
}

.history-text {
  width: 65px;
  height: 22px;
  color: #017aff;
  font-size: 16px;
  font-family: Nunito;
  font-weight: 700;
  text-transform: capitalize;
  line-height: 24px;
  letter-spacing: 0.16px;
  word-wrap: break-word;
}

/**right-bottom */
 .middle {
   width: 300px;
   height: 1180px; 
   padding-top: 20px; 
   padding-bottom: 20px; 
   background: #FCFCFC; 
   flex-direction: column; 
   justify-content: flex-start; 
   align-items: center; 
   gap: 20px; 
   display: inline-flex;
   border-left: 1px #E3E3E3 solid;
   box-sizing: border-box;
}
.sence{
  width: 260px; 
  height: 122px; 
  flex-direction: column; 
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  border-top: 20px;
  display: inline-flex
}
.middleItem{
  width: 260px; 
  height: 40px; 
  padding-left: 10px;
   padding-right: 10px; 
   border-radius: 8px; 
   justify-content: flex-start; 
   align-items: center; 
   gap: 10px;
   display: inline-flex
}
.middleItem.active {
  background-color: #377DFF;
  color: white;
}

.middleItem.active  .middle-subtitle {
  color: white;
}
.middle-title {
  width: 260px;
  height: 22px;
  color: #1D1D1D;
  font-size: 16px;
  font-family: Nunito;
  font-weight: 700;
  text-transform: capitalize;
  line-height: 24px;
  letter-spacing: 0.16px;
  word-wrap: break-word;
}

.middle-subtitle {
  width: 260px;
  height: 40px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 8px;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  display: flex;  
}

.middle-image {
  width: 20px;
  height: 20px;
  border-radius: 4px; 
  flex-shrink: 0;
}



.SidebarItem {
  display: flex;
  align-items: center;
  padding: 10px;

}

.SidebarItem img {
  margin-right: 10px;
}

.SidebarItem {
  display: none;
}


.documentCode img {
  display: block;
  margin: 0 auto;
}

.code2image {
  display: block;
}

/** 提示词输入*/
textarea {
  font-size: 16px;
  font-family: Arial, sans-serif;
  resize: vertical;
  align-self: stretch;
  height: 80px; 
  width:100%;
  padding-left:20px; 
  padding-right:20px; 
  padding-top: 10px; /* 添加此行以设置上边距 */
  mix-blend-mode:multiply; 
  background: white; 
  border-radius: 8px; 
  border: 1px #E5E5E5 solid;
  justify-content: flex-start; 
  align-items: center; gap: 113px; 
  display: inline-flex;
}

/**生成图片区域 */

.sideright2 {
  width:calc(100% - 760px); /*减去 .middle 和.preview 的宽度 */
  /* flex-grow: 1; 第二列在默认情况下占据剩余空间 */
  transition: width 0.3s ease;
  padding: 20px;
  background: #fcfcfc;
  border-top-left-radius: 16px;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  height:100%;
}

.sideright2.expanded {
  /* flex-grow: 2; 当第三列隐藏时，第二列扩展 */
  width:calc(100% - 300px); /*减去 .middle 的宽度 */
  transition: width 0.3s ease; 
}
.Frame3666 {
  align-self: stretch;
  /* width: 100%;
  height: 100%; */
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  display: flex;
}


.prompt {
  align-self: stretch;
  height: 114px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  display: flex;
}
.prompt-frame {
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
}
.text-label {
  color: #1d1d1d;
  font-size: 16px;
  font-family: Nunito;
  font-weight: 700;
  text-transform: capitalize;
  line-height: 24px;
  letter-spacing: 0.16px;
  word-wrap: break-word;
}
.text-count {
  color: #8e8e8e;
  font-size: 12px;
  font-family: Nunito;
  font-weight: 700;
  text-transform: capitalize;
  line-height: 24px;
  letter-spacing: 0.12px;
  word-wrap: break-word;
}
.text_image_num {
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
}

.input-error {
  border-color: red;
}

.Frame1000003489 {
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  display: flex;
}
.Frame1000003487 {
  width: 86px;
  padding: 11px 10px;
  background: white;
  border-radius: 4px;
  border: 1px #b0b0b0 solid;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  display: flex;
}
.CommonImagessmall {
  width: 16px;
  height: 16px;
  position: relative;
}
.select {
  height: 22.5px;
  position: relative;
  border: transparent;
  text-align: right;
  flex-grow: 1;
}
.simKeyword, .simImage {
  /* padding: 20px; */
  align-self: stretch;
  height: 114px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  display: flex;
  width: 100%;

}
.Frame3662 {
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  display: inline-flex;
}
.Frame1000003589 {
  align-self: stretch;
  height: 52px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  display: flex;
}
.Frame1000003590 {
  align-self: stretch;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  display: inline-flex;
}
.Frame1000003591 {
  width: 661px;
  height: 28px;
  position: relative;
}
.Frame1000003588 {
  width: 38px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: inline-flex;
}
.Frame1000003587 {
  align-self: stretch;
  padding: 6px;
  background: #377dff;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: inline-flex;
}
.percentage-label {
  color: white;
  font-size: 12px;
  font-family: Nunito;
  font-weight: 700;
  text-transform: capitalize;
  line-height: 24px;
  letter-spacing: 0.12px;
  word-wrap: break-word;
}

.Frame1000003592 {
  width: 269px;
  height: 28px;
  position: relative;
}
.SdtoolsBar {
  width: 988px;
  height: 20px;
  position: relative;
}
.Frame24 {
  width: 39.13px;
  height: 20px;
  left: 670.08px;
  top: 0px;
  position: absolute;
}
.Bg {
  width: 8px;
  height: 20px;
  left: 16px;
  top: 0px;
  position: absolute;
  background: white;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}
.Frame3660 {
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
  height: 18px;
  width: 100%;
}
.creative-label,
.relevance-label {
  color: #8e8e8e;
  font-size: 12px;
  font-family: Nunito;
  font-weight: 700;
  text-transform: capitalize;
  line-height: 24px;
  letter-spacing: 0.12px;
  word-wrap: break-word;
}
.ImageP {
  align-self: stretch;
  height: 100px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  border: 1px #e5e5e5 solid;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
}
.Frame3647 {
  height: 40px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  display: inline-flex;
}
.reference-description {
  width: 206px;
  height: 18px;
  color: #8e8e8e;
  font-size: 12px;
  font-family: Quicksand;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.12px;
  word-wrap: break-word;
}
.SdtoolsImageP {
  width: 24px;
  height: 24px;
  position: relative;
}
.senceInfo {
  align-self: stretch;
  height: 406px;
  padding: 20px;
  border-radius: 8px;
  border: 1px #e5e5e5 dotted;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  display: inline-flex;
}
.scene-description {
  align-self: stretch;
  height: 44px;
  color: #8e8e8e;
  font-size: 12px;
  font-family: Quicksand;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.12px;
  word-wrap: break-word;
}
.Image8 {
  width: 260px;
  height: 260px;
  border-radius: 4px;
}
.Frame3 {
  width: 100%;
  height: 60px;
  padding: 12px 50px;
  background: #377dff;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  /* flex-shrink: 0; */
  display: flex;
  margin-top: auto; /*将 Frame3 推到父容器的底部*/
  cursor: pointer;
  transition: background-color 0.3s;
  /* position: absolute;
  bottom: 20px; */

}
.Frame3.disabled {
  opacity: 0.5; /* 降低透明度以显示禁用状态 */
  pointer-events: none; /* 禁用点击事件 */
  background-color:gray;
  cursor: not-allowed;
}

.generate-button {
  position: fiexd;
  bottom: 0px;
  left: 0;
  color: white;
  font-size: 16px;
  font-family: Quicksand;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.16px;
  word-wrap: break-word;
}


.imageList {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;  /* 设置间隔为20px */


}
.imageItem {
  width: 190px;
  height: 190px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 4px solid transparent;  /* 初始边框透明 */
  cursor: pointer;
}

.imageItem:hover  {
  border: 4px solid #017AFF;  /* 鼠标悬停时边框变为蓝色 */
}
.action-buttons {
  width: 100%; 
  height: 80px; 
  justify-content: space-between; 
  align-items: flex-start; 
  display: inline-flex;
  bottom: 20px; /* 距离底部的距离，根据需要调整 */
}
.download {
  width: 45%;
  height: 60px; 
  padding-left: 20px; 
  padding-right: 20px; 
  padding-top: 28px; 
  padding-bottom: 28px; 
  border-radius: 8px;
  border: 1px #377DFF solid; 
  justify-content: center; 
  align-items: center; 
  display: flex;
  cursor: pointer;
}

.regen {
  width: 45%;
  height: 60px; 
  padding-left: 20px; 
  padding-right: 20px; 
  padding-top: 28px; 
  padding-bottom: 28px; 
  border-radius: 8px;
  border: 1px #377DFF solid; 
  justify-content: center; 
  align-items: center; 
  display: flex;
  background: #0179FC;
  cursor: pointer;
}

.button-content, .button-content-regen{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.button-content-regen.disabled {
  opacity: 0.5; /* 示例：降低透明度以显示禁用外观 */
  pointer-events: none; /* 禁用指针事件 */
}



.icon {
  width: 24px;
  height: 24px;
}

.download-text {
  display: flex;
  flex-direction: column;
}

.regen-text{
  color: white; 
  font-size: 16px; 
  font-family: Nunito; 
  font-weight: 700; 
  text-transform: capitalize; 
  line-height: 24px; 
  letter-spacing: 0.16px; 
  word-wrap: break-word;
}

.regen-desc{
  width: 142px; 
  height: 18px; 
  color: white; 
  font-size: 12px; 
  font-family: Quicksand; 
  font-weight: 700; 
  line-height: 22px; 
  letter-spacing: 0.12px; 
  word-wrap: break-word;
}
.download-desc{
  width: 142px;
  color: #8E8E8E;
  font-size: 12px;
  font-family: Quicksand;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.12px;
  word-wrap: break-word;
}

.preview-image {
  position: absolute; /* 固定定位 */
  top: 0;
  right: 0;
  width: 30%; /* 根据需要调整这个宽度 */
  height: 100%;
  background: white; /* 根据需要设置背景色 */
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1); /* 添加阴影以示区分 */
  z-index: 1000; /* 确保它在顶部 */
}

.ProgressBar {
  width: 100%; /* 确保填充父容器宽度 */
  box-sizing: border-box; /* 确保 padding 和 border 包含在元素的总宽度内 */
}
/**顶部tab */
.tabs-container {
  display: flex;
  justify-content: center;
  /* margin-bottom: 1rem; */
  background-color: white;
  border-radius: 8px;
  height:100px;
}

.tab {
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: normal;
  color: #8E8E8E;
  border-bottom: 2px solid transparent;
  transition: color 0.3s, border-bottom 0.3s;
  font-family: Nunito;
  font-size: 16px;
  font-style: normal;
  cursor: pointer;
  height: 100px;
  display: flex; /* 确保使用 Flexbox 布局 */

  justify-content: center; /* 文字水平居中 */
  align-items: center; 
}

.tab.active {
  font-weight: bold;
  color: #000;
  border-bottom: 2px solid #377DFF ;
}

/* 加载中的遮罩层 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* 加载中的旋转动画 */
.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #09f;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  margin-top: 10px;
  font-size: 16px;
  color: #333;
}
</style>