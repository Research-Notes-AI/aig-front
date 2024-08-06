<template>
<div class="container">
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
      <div :class="['CommonSidebarLeft', { 'collapsed': isCollapsed }]" >
          <img :src="isCollapsed ? '../src/assets/sidebar-right.png' : '../src/assets/sidebar-left.png'"
                @click="toggleSidebar" 
                />
      </div>
    </div>
    <div class="Frame_blank">
      <div class="leftMid" >
        <SidebarItem
          title="快捷场景"
          description="常用场景快捷生图"
          :iconSrc="currentTitle === '快捷场景' ? '../assets/gallery-edit.png' : '../assets/gallery-favorite.png'"
          :arrowSrc="currentTitle === '快捷场景' ? '../assets/arrow-right01.png' : '../assets/right01.png'"
          :isActive="currentTitle === '快捷场景'"
          :isCollapsed = "isCollapsed"
          acitiveTitle="快捷场景" 
          @item-click="() => navigateTo('ShortCut')"
        />
        <SidebarItem
          title="中文生图"
          description="用中文提示词与简单参数生成图片"
          :iconSrc="currentTitle === '中文生图' ? '../assets/translate-gray.png' : '../assets/translate.png'"
          :arrowSrc="currentTitle === '中文生图' ? '../assets/arrow-right01.png' : '../assets/right01.png'"
          :isActive="currentTitle === '中文生图'"
          :isCollapsed = "isCollapsed"
          @item-click="() => navigateTo('TextToImage')"
          acitiveTitle="文生图 图生图" 
        />
        <div :class="['documentCode', { 'no-border': isCollapsed }]" >
          <div class="Frame3649">
            <div class="CommonDocumentCode">
              <img src="../assets/document-code.png">
            </div>
            <div class="code2image" v-if="!isCollapsed" >
              <div class="title">高级生图</div>
              <div class="tips">用英文Prompt与完整参数生成图片</div>
            </div>
          </div>
          <div v-if="!isCollapsed" >建设中</div>
        </div>    
              
      </div>
      <div class="leftBottom" >
        <div class="Frame1000003507">
          <div class="ComponentAbstract01">
            <div class="ComponentAbstract06">
              <img class="Abstract06" src="../assets/profile-circle.png" />
            </div>
          </div>
          <div class="Larrykey" v-if="!isCollapsed" >LarryKey</div>
        </div>
        <div class="Frame1000003506">
          <div class="CommonDocumentText">
            <div class="CommonDocumentText">
              <div class="DocumentText">
                <img src="../assets/document-text.png">
              </div>
            </div>
          </div>
          <div v-if="!isCollapsed" >教程</div>
        </div>
        <div class="Frame1000003509">
          <div class="CommonMessageText">
            <div class="CommonMessageText">
              <div class="MessageText">
                <img src="../assets/message-text.png">
              </div>
            </div>
          </div>
          <div v-if="!isCollapsed" >论坛</div>
        </div>
      </div>
    </div>
  </div>
  <div :class="['sideRight', { expanded: isCollapsed } ]" >
    <div class="right-top">
    <div class="right-top-inner">
      
      <div v-if="currentTitle==='中文生图'" class="tabs-container" >
        <div 
         class="tab" 
         :class="{ active: activeTab === '文生图' }" 
         @click="() => selectTab('文生图')"
          >
         文生图
        </div>
        <div 
        class="tab" 
        :class="{ active: activeTab === '图生图' }" 
        @click="() => selectTab('图生图')"
        >
         图生图
        </div>
       </div>
       <div v-else class="title" >{{ currentTitle }}</div>
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
     <router-view />
</div>
  
</div>
</template>

<script setup lang="ts">
import { ref,onMounted , defineEmits,computed } from 'vue'
import { useToast } from 'vue-toastification';

import SidebarItem from '../components/SideBarItem.vue';
import  {useRouter, useRoute , RouterView}  from 'vue-router'
import axiosInstance from '@/services/axiosConfig';


const router = useRouter()
const route = useRoute()

const previewVisible = ref(false);
const selectedImageId = ref(null);

const isImageUploaded = ref(false);
const activeTab = ref('文生图');

const emit = defineEmits(['click'])
// 动态计算 未完成的class
const documentCode = computed(() => {
  return {
    'documentCode': true,
    'no-border': isCollapsed.value
  };
});


const selectTab = (tab: string) => {
  activeTab.value = tab;
  senceSubTitle = activeTab.value;
  if (tab === '图生图') {
    router.push('/main/ImageToImage')
  } else {
    router.push('/main/TextToImage')
  }
  }

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

const currentTitle = ref('快捷场景');// 默认选中第一个项的标题
const activeTitle = ref<string>('快捷场景');
// const isSidebarCollapsed = ref(false);

const updateTitle = (title: string) => {
  currentTitle.value = title;
};

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  emit('click', isCollapsed.value);
};

const navigateTo = (route: string) => {
  currentTitle.value = route === 'ShortCut' ? '快捷场景' : '中文生图';
  router.push(`/main/${route}`)
};

const options = ref([
  { value: 'option1', text: 1 },
  { value: 'option2', text: 5 },
  { value: 'option3', text: 10 },
  { value: 'option3', text: 15 },
  { value: 'option3', text: 20 }
]);


const imageUrl = ref<string | null>(null); // 用于传递给 ImageUploader.vue 的图标
const uploadedImageUrl = ref<string | null>(null);
const referenceImage = ref<string | null>(null);


// // 快捷场景生成任务入参
// const keywordsInput = ref<string>('');
// // const sim = ref<number>(0);
const uploadedImageId = ref<Number | null>(null);
// const keywordsRelevance = ref(80);
// const imageRelevance = ref(80);
// const updateKeywordsRelevance = (value: number) => {
//   keywordsRelevance.value = value;
// };
// const updateImageRelevance = (value: number) => {
//   imageRelevance.value = value;
// };


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
      // senceSubTitle.value =  selectedItem.value.subTitle;
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

let taskDetail = ref();
let shortcutId = ref();
let senceSubTitle = ref("");

const imageList = ref<string | null>(null);

 //选择快捷场景
const selectItem = (item: any) => {
 selectedItem.value = item;
   if(selectedItem.value){
   senceSubTitle = selectedItem.value.subTitle;
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
  // currentTitle.value = '快捷场景';
  // activeTitle.value = '快捷场景';
  fetchData();
  if (route.path === '/main/ImageToImage') {
    activeTab.value = '图生图'
    currentTitle.value = '中文生图'
  }
  if (route.path === '/main/TextToImage') {
    activeTab.value = '文生图'
    currentTitle.value = '中文生图'
  }

});
</script>

<style> 
.container {
  width: 100%;
  align-items:flex-start;
  height: 100vh; 
  display: flex; 
  /* overflow-x: hidden; 禁用容器的水平滚动 */
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

.sideLeft {
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  transition: width 0.3s;
  /* border-right: 1px #E3E3E3 solid; */
  width: 400px; 
  height: 100vh;
}
.sideRight {
  flex-grow: 1;
  width:calc(100% - 400px);
  flex-direction: column; 
  justify-content: flex-start; 
  align-items: flex-start; 
  display: flex;
  border-left: 1px #E3E3E3 solid;
  box-sizing: border-box; /* 包含内边距和边框 */
}

.sideRight.expanded {
  width:calc(100% - 80px);
  display: flex;
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

.CommonSidebarLeft {
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  display: flex;
  padding-left: 32px;
}

.CommonSidebarLeft.collapsed {
  padding-left: 32px; /* 收起时的左侧间距 */
  /* 你可以在这里设置收起时的宽度等其他样式 */
}

/* 如果边栏展开时有不同样式，可以定义 */
.CommonSidebarLeft:not(.collapsed) {
  padding-left: 0; /* 展开时去掉左侧间距 */
  /* 其他展开时的样式 */
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
  transition: border 0.3s ease; /* 添加过渡效果 */

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
   /* border-left: 1px #E3E3E3 solid; */
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


.sideLeft.collapsed {
  width: 80px; /* 只显示图标时的宽度 */
  height: 100px;
  transition: width 0.3s;
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

.sideLeft:not(.collapsed) .SidebarItem .description .documentCode .code2image{
  display: block;
}
 
.no-border {
  border: none; /* 当边栏收起时移除边框 */
}

.documentCode img {
  display: block;
  margin: 0 auto;
}

.code2image {
  display: block;
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
  /* color: #8E8E8E; */
  border-bottom: 1px solid transparent;
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
  border-bottom: 1px solid #377DFF ;
}
</style>