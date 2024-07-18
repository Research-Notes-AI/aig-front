<template>
<!-- <div class="ShortcutIndex" style="width: 100%; height: flex; background: white; box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.30); border-radius: 16px; border: 1px #B0B0B0 solid; justify-content: flex-start; align-items: flex-start; display: inline-flex"> -->
  <div :class="['sideLeft', { collapsed: isCollapsed } ]">
    <div class="lefttop" >
      <div class="ComponentLogo" v-if="!isCollapsed">
        <img class="Abstract05" src="../assets/abstract-05.png" />
        <div class="Frame2186">
          <div class="AigAiImagesGenerator">
            <span>AIG <br /></span><span>AI Images Generator</span>
          </div>
        </div>
      </div>
      <div class="CommonSidebarLeft" >
        <div class="SidebarLeft">
          <img :src="isCollapsed ? '../src/assets/sidebar-right.png' : '../src/assets/sidebar-left.png'" @click="toggleSidebar" />
        </div>
      </div>
    </div>
    <div class="Frame_blank">
      <div class="leftMid">
        <SidebarItem
          title="快捷场景"
          description="常用场景快捷生图"
          iconSrc="../assets/gallery-favorite.png"
          :arrowSrc="currentTitle === '快捷场景' ? '../assets/arrow-right01.png' : '../assets/right01.png'"
          :isActive="currentTitle === '快捷场景'"
          acitiveTitle="快捷场景" 
          @item-click="updateTitle"
        />
        <SidebarItem
          title="中文生图"
          description="用中文提示词与简单参数生成图片"
          iconSrc="../assets/translate.png"
          :arrowSrc="currentTitle === '中文生图' ? '../assets/arrow-right01.png' : '../assets/right01.png'"
          :isActive="currentTitle === '中文生图'"
          @item-click="updateTitle"
          acitiveTitle="文生图 图生图" 
        />
        <div class="documentCode">
          <div class="Frame3649">
            <div class="CommonDocumentCode">
              <img src="../assets/document-code.png">
            </div>
            <div class="code2image" v-if="!isCollapsed" >
              <div>高级生图</div>
              <div class="Prompt">用英文Prompt与完整参数生成图片</div>
            </div>
          </div>
        </div>    
              <div v-if="!isCollapsed">建设中</div>
      </div>
      <!-- <div v-if="currentTitle === '中文生图'">
    <div class="tabs">
      <button @click="currentTab = '文生图'" :class="{ active: currentTab === '文生图' }">文生图</button>
      <button @click="currentTab = '图生图'" :class="{ active: currentTab === '图生图' }">图生图</button>
    </div>
    <component :is="currentTabComponent" />
  </div> -->
      <div class="leftBottom">
        <div class="Frame1000003507">
          <div class="ComponentAbstract01">
            <div class="ComponentAbstract06">
              <img class="Abstract06" src="../assets/profile-circle.png" />
            </div>
          </div>
          <div class="Larrykey">LarryKey</div>
        </div>
        <div class="Frame1000003506">
          <div class="CommonDocumentText">
            <div class="CommonDocumentText">
              <div class="DocumentText">
                <img src="../assets/document-text.png">
              </div>
            </div>
          </div>
          <div>教程</div>
        </div>
        <div class="Frame1000003509">
          <div class="CommonMessageText">
            <div class="CommonMessageText">
              <div class="MessageText">
                <img src="../assets/message-text.png">
              </div>
            </div>
          </div>
          <div>论坛</div>
        </div>
      </div>
    </div>
  </div>
  <div class="['sideRight', { expanded: isCollapsed } ]" >
    <div class="right-top">
    <div class="right-top-inner">
      <div class="title">{{ activeTitle }}</div>
    </div>
    <div class="ComponentHistory">
      <div class="Frame1000003526">
        <div class="SdtoolsHistory">
          <img src="../assets/history.png" />
        </div>
        <div class="history-text">历史任务</div>
      </div>
    </div>
  </div>
    <div v-if="currentTitle === '快捷场景'" class="right-bottom">
      <div class="middle" >
        
      <div v-for="(section,sectionIndex) in sections" :key="sectionIndex" class="sence">
          <div class="middle-title">{{ section.title }}</div>
          <div 
              v-for="(middleItem, itemIndex) in section.items" 
              :key="itemIndex"
              :class="['middleItem', { active: selectedItem && selectedItem.subTitle === middleItem.subTitle }]"
              @click="selectItem(middleItem)" 
           >
             <img :src="`http://13.215.140.116:5001/api/v1/image/${middleItem.imageSmall}`" class="middle-image" />
             <div class="middle-subtitle">{{ middleItem.subTitle }}</div>
          </div>
       </div>
      </div>
      <div class="sideright2" :class="{ 'expanded': previewVisible }">
      <div class="Frame3666">
      <div class="prompt">
        <div class="Frame3659">
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
           @update:selectedPercentage="updateSelectedPercentage"
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
        @update:selectedPercentage="updateSelectedPercentage" 
        class="ProgressBar"/>
        <div class="Frame3660">
          <div class="creative-label">更有创意</div>
          <div class="relevance-label">更贴近参考图</div>
        </div>
      </div>
      <div v-if="!(generatedImages.length)" class="senceInfo">
        <div class="text-label">场景说明</div>
        <div v-if="selectedItem" class="scene-description">{{ selectedItem.desc }}</div>
        <img v-if="selectedItem" class="Image8" :src="`http://13.215.140.116:5001/api/v1/image/${selectedItem.imageBig}`" />
       </div>
      <div v-else class="imageList">
         <div v-if="isGenerating">正在生成图片，请稍候...</div>
         <div v-for="image in generatedImages" 
         :key="image.id" 
         class="image-container" 
         @click="showPreview(image.id,taskId)"
         >
            <img class="imageItem" :src="'http://13.215.140.116:5001/api/v1/image/' + image.id" :alt="image.title" />
         </div>
      </div>
    <div v-if="!(generatedImages.length)" class="Frame3"  @click="generateImages" :disabled="isGenerating">
        
        <div class="generate-button" >生成图片</div>
    </div>
    <div v-else class="action-buttons">
      <div class="download" @click="downloadAllImages('image.zip')">
        <div class="button-content" >
          <img src="../assets/download.png" class="icon">
          <div class="text">
             全部下载
             <div class="description">打包下载生成的所有图片</div>
          </div>   
        </div>
      </div>
      <div class="regen" @click="regenerateImages" :disabled="isGenerating">
        <div class="button-content" >
          <img src="../assets/edit.png" class="icon">
          <div class="text" >
          <div style="color: white; font-size: 16px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.16px; word-wrap: break-word">重新生成</div>
          <div style="width: 142px; height: 18px; color: white; font-size: 12px; font-family: Quicksand; font-weight: 700; line-height: 22px; letter-spacing: 0.12px; word-wrap: break-word">修改条件重新生成图片</div>
          </div>
        </div>
      </div>
    </div>
        </div>
      </div>
      <PreviewImage 
         v-if="previewVisible" 
         :imageId="selectedImageId" 
         @close="closePreview" 
         @imageDeleted="handleImageDeleted" 
         @referenceSet="handleReferenceSet"
         :taskDetail="taskDetail"
         :shortcutId="shortcutId"
         :imageUrl="uploadedImageUrl"
         class="preview-image"
         :show-reference-option="true" />
    </div>
    <div v-if="currentTitle === '中文生图'" class="right-bottom">
    <TextToImage/>
    </div>
</div>
  
<!-- </div> -->
</template>

<script setup lang="ts">
import { ref,onMounted } from 'vue'
import { useToast } from 'vue-toastification';

import SidebarItem from '../components/SideBarItem.vue';
import ProgressBar from '../components/ProgressBar.vue';
import ImageUploader from '../components/ImageUploader.vue';
import axiosInstance from '@/services/axiosConfig';

import PreviewImage from '@/components/PreviewImage.vue';
import ImageToImage from './ImageToImage.vue';

import { computed } from 'vue';
import TextToImage from '../components/TextToImage.vue';

// const currentTab = ref('文生图');



// const currentTabComponent = computed(() => {
//   return currentTab.value === '文生图' ? TextToImage : ImageToImage;
// });
// import { useStore } from 'vuex';
// import type { RootState } from '@/stores';

// const store = useStore<RootState>();

// const fetchTask = (taskId: string) => {
//   store.dispatch('fetchTaskResult', taskId);
// };

// const taskResult = computed(() => store.getters.taskResult);

const previewVisible = ref(false);
const selectedImageId = ref(null);

const isImageUploaded = ref(false);

// const imageId = ref();
// const shortcutId = ref();
//点击图片时调用 
const showPreview = (imageId: null,taskId:Number) => {
  selectedImageId.value = imageId;
  previewVisible.value = true;
  // store.dispatch('fetchTaskDetails', taskId);

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
  if (title === '中文生图') {
    activeTitle.value = "文生图 图生文"
  }

  if(title === '快捷场景'){
    activeTitle.value = "快捷场景"
  } 
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

//生成任务的入参


// // 定义任务创建请求的数据结构
// interface CreateTaskRequest {
//   keywords: string[]; // 输入的提示词数组
//   referenceImage: string | null; // 上传的参考图片，可以为 null 或图片的 URL
//   relevance: number; // 图片与提示词的相关性，可以是一个数值
//   imageCount: number; // 图片的数量
// }

const imageUrl = ref<string | null>(null); // 用于传递给 ImageUploader.vue 的图标
const uploadedImageUrl = ref<string | null>(null);
const referenceImage = ref<string | null>(null);


// 快捷场景生成任务入参
const keywordsInput = ref<string>('');
// const sim = ref<number>(0);
const uploadedImageId = ref<Number | null>(null);
const keywordsRelevance = ref(0.8);
const imageRelevance = ref(0.8);
const updateKeywordsRelevance = (value: number) => {
  keywordsRelevance.value = value;
};
const updateimageRelevance = (value: number) => {
  imageRelevance.value = value;
};


//上传成功事件动作
const handleUploadSuccess = (imageId: Number) => {
  isImageUploaded.value = true;
  uploadedImageId.value = imageId;
  uploadedImageUrl.value =  `http://13.215.140.116:5001/api/v1/image/${imageId}`; //更新图标
  imageUrl.value = uploadedImageUrl.value; // 更新图标
  console.log(imageUrl.value);

}; 

const handleReferenceSet = () => {
  isImageUploaded.value = true; //同上传图片成功
  uploadedImageId.value = selectedImageId.value; //为后续生成任务请求做准备
  referenceImage.value =  `http://13.215.140.116:5001/api/v1/image/${selectedImageId.value}`;
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
  taskId: string;
}

const sections = ref([]);

//获取快捷场景数据
const fetchData = async () => {
   try {
    // error.value = ''
    // successMessage.value = ''
    const response = await axiosInstance.get('/shortcut/list');
    sections.value = response.data.data;

    if (sections.value.length > 0 && sections.value[0].items.length > 0) {
      selectedItem.value = sections.value[0].items[0];
      }
    // successMessage.value = '获取项目成功'
  }
   catch (error) {
    console.error('Error fetching data:', error);
  }
};

/** 中间部分item点击事件处理 */
// import { defineProps, defineEmits } from 'vue'
const selectedItem = ref(null)
/** 创建任务 生成图片发送请求结果 */
const generatedImages = ref([]);
// const senceId=selectedItem.value;
let taskId = ref<string | null>(null);
let taskStatus = ref<string | null>(null);

let taskDetail = ref()
let shortcutId = ref()

const imageList = ref<string | null>(null);

 //选择快捷场景
const selectItem = (item: any) => {
  selectedItem.value = item;

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
       shortcutId = selectedItem.value.id;
       if(uploadedImageId.value){
       const params = {
        shortcut_id: selectedItem.value.id, // 替换为场景Id
        prompt: keywordsInput.value,
        n: selectedOption.value, //图片生成数量
        ref_image_sim: imageRelevance.value,
        ref_image_id: uploadedImageId.value, // 上传成功后imageId
        sim:keywordsRelevance.value
      }
       const response = await axiosInstance.post(`/task/from_shortcut`, params);
       taskId.value = response.data.data.id; 
  
       }
        else{
        const params = {
         shortcut_id: selectedItem.value.id, // 替换为场景Id
         prompt: keywordsInput.value,
         n: selectedOption.value, //图片生成数量
         sim:keywordsRelevance.value
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
      // console.log(taskStatus.value)
      return taskStatus.value === 'completed'; // 接口返回任务状态，判断是否完成
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
 try { 
  isGenerating.value = true; // 设置生成图片按钮不可点击状态

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

        imageList.value = generatedImages.value.map(image => image.id).join(',');
        console.log(imageList.value);
      } 
  };
  await checkTaskStatus(); // 首次调用检查任务状态
}
  catch (error) {
    console.error('Error generating images:', error);
  } 
  finally {
    isGenerating.value = false; // 恢复生成图片按钮可点击状态
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
const handleImageDeleted = (imageId:any) => {
  generatedImages.value = generatedImages.value.filter(image => image.id !== imageId);
  selectedImageId.value = null;
  previewVisible.value = false;
};

onMounted(() => {
  // 初始化选中第一个标题
  currentTitle.value = '快捷场景';
  activeTitle.value = '快捷场景';
  fetchData();

});
</script>

<style> 
select {
  /* margin-top: 2px; */
  /* padding: 2px; */
  font-size: 16px;
  border: 2px solid transparent; /* 将边框设置为透明 */
  background-color: white; /* 设置背景颜色为白色以确保文本可见 */
  border-radius: 4px; /* 可选，设置圆角 */
  outline: none; /* 移除默认的焦点样式 */
}

.sideLeft {
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: inline-flex;
  gap: 10px;
}
.sideRight {
  flex: 1 1 0; 
  flex-direction: column; 
  justify-content: flex-start; 
  align-items: flex-start; 
  display: inline-flex;
}
.right-bottom {
  /* align-self: stretch;  */
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
  border-right: 1px #E3E3E3 solid;
  border-bottom: 1px #E3E3E3 solid;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
}

.ComponentLogo {
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  display: flex;
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
}

.SidebarLeft,
.ComponentAbstract06,
.DocumentText,
.MessageText {
  width: 24px;
  height: 24px;
  position: relative;
}

.Frame_blank {
  width: 400px;
  height: 1016px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  display: flex;
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

.Frame3652,
.documentCode {
  border: 1px #E3E3E3 solid;
}

.Frame3649 {
  height: 44px;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  display: flex;
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

.Prompt {
  width: 193px;
  height: 18px;
}

.leftBottom {
  align-self: stretch;
  width:400px;
  height: 240px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  display: flex;
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
  height: 80px;
  padding: 20px;
  /* border-top-left-radius: 16px; */
  border-bottom: 1px #e3e3e3 solid;
  justify-content: space-between;
  align-items: center;
  display: flex;
}

.right-top-inner {
  height: 100px;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  display: flex;
}

.title {
  width: 65px;
  justify-content: center;
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
   height: 1016px; 
   padding-top: 20px; 
   padding-bottom: 20px; 
   background: #FCFCFC; 
   flex-direction: column; 
   justify-content: flex-start; 
   align-items: center; 
   gap: 20px; 
   display: inline-flex;
   border-left: 1px #E3E3E3 solid;
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

/**左侧边栏样式 */
.sideLeft {
  transition: width 0.3s;
  border-right: 1px #E3E3E3 solid;
  width: 400px;
}

.sideLeft.collapsed {
  width: 60px; /* 只显示图标时的宽度 */
}

.SidebarItem {
  display: flex;
  align-items: center;
  padding: 10px;
}

.SidebarItem img {
  margin-right: 10px;
}

.SidebarItem .description {
  display: none;
}

.sideLeft:not(.collapsed) .SidebarItem .description {
  display: block;
}

.documentCode {
  padding: 10px;
}

.documentCode img {
  display: block;
  margin: 0 auto;
}

.documentCode .code2image {
  display: none;
}

.sideLeft:not(.collapsed) .documentCode .code2image {
  display: block;
}
/** 右下*/
textarea {
  font-size: 16px;
  font-family: Arial, sans-serif;
  resize: vertical;
  align-self: stretch;
  height: 80px; 
  width:95%;
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
  width: 100%;
  transition: width 0.3s ease;
  /* flex: 1; */
  height: 65%;
  padding: 20px;
  background: #fcfcfc;
  border-top-left-radius: 16px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
}

.sideright2.expanded {
  width: 35%;
  /* flex: 0;
  transition: width 0.3s ease; */

}
.Frame3666 {
  align-self: stretch;
  width: 100%;
  height: 100%;
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
.Frame3659 {
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
.simKeyword .simImage {
  /* padding: 20px; */
  align-self: stretch;
  height: 114px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  display: flex;
}
.Frame3662 {
  width: 828px;
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
  width: 90%;
  height: 60px;
  padding: 12px 50px;
  background: #377dff;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  /* flex-shrink: 0; */
  display: flex;
  /* margin-top: auto; 将 Frame3 推到父容器的底部 */

}
.generate-button {
  color: white;
  font-size: 16px;
  font-family: Quicksand;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.16px;
  word-wrap: break-word;
  cursor: pointer;
}
.generate-button.disabled {
  opacity: 0.5; /* 降低透明度以显示禁用状态 */
  pointer-events: none; /* 禁用点击事件 */
}

.imageList {
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
  width: 360px;
  height: 60px; 
  padding-left: 20px; 
  padding-right: 20px; 
  padding-top: 28px; 
  padding-bottom: 28px; 
  border-radius: 8px;
  border: 1px #377DFF solid; 
  justify-content: space-between; 
  align-items: center; 
  display: flex;
  cursor: pointer;
}

.regen {
  width: 360px;
  height: 60px; 
  padding-left: 20px; 
  padding-right: 20px; 
  padding-top: 28px; 
  padding-bottom: 28px; 
  border-radius: 8px;
  border: 1px #377DFF solid; 
  justify-content: space-between; 
  align-items: center; 
  display: flex;
  background: #0179FC;
  cursor: pointer;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.button-content.disabled {
  opacity: 0.5; /* 示例：降低透明度以显示禁用外观 */
  pointer-events: none; /* 禁用指针事件 */
}

.icon {
  width: 24px;
  height: 24px;
}

.text {
  display: flex;
  flex-direction: column;
}

.description {
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
</style>