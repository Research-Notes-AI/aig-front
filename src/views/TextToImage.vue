<template>
<div class="text-image" >
  <div class="setting">
    <div class="setup">
      <div class="prompt">
        <div class="Frame3659">
          <div class="title">提示词</div>
          <div class="text-count">{{ keywordsInput.length }}/1000</div>
        </div>
        <textarea
          v-model="keywordsInput"
          @input="updateText"
          placeholder="输入提示词,生成你需要的图片"
          :class="{ 'input-error': isKeywordInputEmpty }"
        ></textarea>
      </div>
      <div class="imprompt">
        <div class="Frame3659">
          <div class="Frame1000003586">
            <div class="title">反向提示词</div>
            <div class="help-icon">
              <img src="../assets/help.png">
              <div class="tooltip">描述不希望出现的元素或风格，来避免生成这些内容。</div>
            </div>
      
          </div>
          <div class="text-count">{{ imKeywordsInput.length }}/1000</div>
        </div>
        <textarea
          v-model="imKeywordsInput"
          @input="updateText"
          placeholder="输入反向提示词"
        ></textarea>
      </div>
      <div class="imageNum">
        <div class="title">图片数量</div>
        <div class="Frame1000003489">
          <div class="Frame1000003487">
            <div class="CommonImagessmall">
              <img src="../assets/imagessmall.png"/>
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
      <div class="imageWH">
        <div class="title">图片尺寸</div>
        <div class="Frame1000003489">
          <div class="Frame1000003487">
            <div class="CommonWidth">
             <img src="../assets/width.png">
            </div>
            <div class="dimension">
              <input type="number" 
                     class="dimension-input"
                     v-model="width"
                     @input="validateInput('width')"
                     :class="{ 'error': isWidthInvalid }"
                     >
                  <p v-if="isWidthInvalid" class="error-message">仅可输入1～1024之间的整数</p>

            </div>
          </div>
          <div class="Frame1000003487">
            <div class="CommonHight">
              <img src="../assets/hight.png">
            </div>
            <div class="dimension">
              <input 
                type="number"
                class="dimension-input"
                 v-model="height" 
               @input="validateInput('height')"
               :class="{ 'error': isHeightInvalid }"
               />
              <div v-if="isHeightInvalid" class="error-message">
                 仅可输入1～1024之间的整数
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="steps">
        <div class="Frame1000003490">
          <div class="Frame1000003524">
            <div class="title">迭代步数</div>
            <div class="mid-description">迭代步数越多细节越多，但更消耗时间，默认值 25</div>
          </div>
          <div class="Frame1000003489">
            <div class="Frame1000003487">
              <div class="CommonSteps">
                <img src="../assets/steps.png">
              </div>
              <div class="dimension">
                <input type="number" 
                       class="dimension-input"
                       v-model="steps"
                       @input="validateInput('steps')"
                    :class="{ 'error': isStepsInvalid }"
                    />
                <div v-if="isStepsInvalid" class="error-message">
                 仅可输入1～100之间的整数
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="progressbar">
        <div class="progressbar-title">
          <div class="title">图片与提示词的相关性</div>
        </div>
           <ProgressBar 
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
      <div class="seeds">
        <div class="Frame1000003490">
          <div class="Frame1000003524">
            <div class="title">种子</div>
            <div class="mid-description">默认为随机种子</div>
          </div>
          <div class="Frame1000003489">
            <div class="Frame1000003487">
              <div class="SdtoolsSeed">
                <img src="../assets/seed.png">
              </div>
              <div class="dimension">
                <input type="number" 
                        class="dimension-input"
                        v-model="seed"
                        @input="validateInput('seed')"
                        :class="{ 'error': isSeedInvalid }"
                      />
              <div v-if="isSeedInvalid" class="error-message">
               仅可输入0～4,294,967,295之间的整数
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="generateImage" 
         @click="generateImages"
         :class="{'disabled':isGenerating}">
      <div class="generate-button">生成图片</div>
    </div>
  </div>
  <div class="image-list-area"  
       :class="{ 'expanded': !previewVisible }">
    <div  v-if="!generatedImages.length && !isGenerating " class="dotted-frame">
    <div class="SdtoolsSmell">
      <img src="../assets/smell.png">
     </div>
     <div  class="image-text">生成图片区域</div>
       </div>
    <div v-else class="imageList">
      <div v-if="isGenerating" class="loading-overlay">
       <div class="loading-spinner"></div>
       <div class="loading-text">正在生成图片，请稍候...</div>
      </div>
      <div v-for="image in generatedImages" 
         :key="image.id" 
         class="image-container" 
         @click="showPreview(image.id,taskId)"
         >
         <img class="imageItem" :src="`${config.apiBaseUrl}/image/` + image.id" :alt="image.title" />
    
    </div>
    <div class="download-frame">
    <div class="download-frame-inner">
      <div class="download-ttoi" @click="downloadAllImages('image.zip')">
        <div class="button-content" >
          <img src="../assets/download.png" class="icon">
          <div class="download-text">
             全部下载
             <div class="download-desc">打包下载生成的所有图片</div>
          </div>   
        </div>
      </div>
    <div>
    </div>
    </div>
    </div>
      </div>
  </div> 
  <PreviewImage 
         v-if="previewVisible && taskDetail" 
         :imageId="selectedImageId" 
         @close="closePreview" 
         @imageDeleted="handleImageDeleted" 
         :taskDetail="taskDetail"
         class="preview-image"
         :currentTitle="currentTitle"
         :senceSubTitle="senceSubTitle"
         :show-reference-option="false"
         :images="imageList"
          />  
 </div>
</template>
<script setup lang="ts">

import { ref,defineProps,watch, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import ProgressBar from '@/components/ProgressBar.vue';
import axiosInstance from '@/services/axiosConfig';
import PreviewImage from '@/components/PreviewImage.vue';
import { useRouter,useRoute } from 'vue-router';
import { config } from '@/config';

const props = defineProps({
  currentTitle: String,
  senceSubTitle: String
});


const toast = useToast();
const router = useRouter();
const route = useRoute();

const keywordsInput = ref<string>('');
const imKeywordsInput = ref<string>('');
const isGenerating = ref(false); // 控制生成图片按钮是否可点击的状态

const currentTitle = ref<string>('中文生图');
const senceSubTitle = ref('文生图');

/* 提示词下文本输入*/
const text = ref('');
const updateText = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  text.value = target.value;
};
const isKeywordInputEmpty = ref(false);//提示词输入状态

/*图片数量*/

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

//默认选择
const options = ref([
  { value: 'option1', text: 1 },
  { value: 'option2', text: 5 },
  { value: 'option3', text: 10 },
  { value: 'option3', text: 15 },
  { value: 'option3', text: 20 }
]);
const selectedOption = ref(options.value[0].text);

//图片与词的相关性
const keywordsRelevance = ref(80);
const updateKeywordsRelevance = (value: number) => {
  keywordsRelevance.value = value;
};

const selectedImageId = ref(null);
const previewVisible = ref(false);

let taskId = ref<string | null>(null);
let taskStatus = ref<string | null>(null);


let taskDetail = ref({

})
//图片结果
const generatedImages = ref([]);
const imageList = ref<string | null>(null);



//创建任务参数
const task_type = ref(0);
const width = ref<number>(512);
const height = ref<number>(512);
const steps = ref<number>(25);
const seed = ref<number>(-1);
// const name = ref(generateRandomString(5));

//设置输入校验
const isWidthInvalid = ref(false);
const isHeightInvalid = ref(false);
const isStepsInvalid = ref(false);
const isSeedInvalid = ref(false);

const validateInput = (type: string) => {
  switch (type) {
    case 'width':
      isWidthInvalid.value = width.value < 1 || width.value > 1024;
      break;
    case 'height':
      isHeightInvalid.value = height.value < 1 || height.value > 1024;
      break;
    case 'steps':
      isStepsInvalid.value = steps.value < 1 || steps.value > 100;
      break;
    case 'seed':
      isSeedInvalid.value = seed.value < 0 || seed.value > 4294967295;
      break;
  }
};

// 监听 width、height、steps 和 seed 值的变化
watch(width, () => validateInput('width'));
watch(height, () => validateInput('height'));
watch(steps, () => validateInput('steps'));
watch(seed, () => validateInput('seed'));


// 创建任务并获取任务ID
const createTask = async () => {
  try {
    if (!keywordsInput.value.trim()) {
    isKeywordInputEmpty.value = true;
    toast.info("请输入提示词");
    return false;
     }
     isKeywordInputEmpty.value = false;
   
    const params = {
        task_type: task_type.value, // 任务类型为文生图
        prompt: keywordsInput.value,
        neg_prompt: imKeywordsInput.value,
        n: selectedOption.value, //图片生成数量
        sim: keywordsRelevance.value/100, //词语相关性
        height: height.value,
        width: width.value,
        steps: steps.value,
        seed: seed.value    
      }
       const response = await axiosInstance.post(`/task/`, params);
       taskId.value = response.data.data.id; 
       return true;
    } 
     catch (error) {
    toast.error('文生图-创建任务失败');
    console.error('Error creating task:', error);
    return false; // 创建任务失败
   
  }
};

//查询任务状态信息
const queryTaskStatus = async () => {
  if (!taskId.value) {
    const isTaskCreated =  await createTask();
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
  if(isGenerating.value) return; // 防止重复点击
  previewVisible.value = false; //关闭预览区域
  isGenerating.value = true; // 设置生成图片按钮不可点击状态

  const checkTaskStatus = async () => {
    const isCompleted = await queryTaskStatus();
    console.log(isCompleted)

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
        isGenerating.value = false; // 恢复生成图片按钮可点击状态
        console.log(imageList.value);
        console.log(taskId.value );
        router.push({ name: 'TextToImage', query: { taskid: taskId.value } });
        saveState();
        isGenerating.value = false; //恢复生成图片按钮
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

/**关闭预览区域 */
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

 }
}

//点击图片时调用 
const showPreview = (imageId: null,taskId:Number) => {
  selectedImageId.value = imageId;
  previewVisible.value = true;
};

// 保存当前状态到 localStorage
const saveState = () => {
  localStorage.setItem('keywordsInput', keywordsInput.value);
  localStorage.setItem('generatedImages', JSON.stringify(generatedImages.value));
  localStorage.setItem('selectedOption',String(selectedOption.value));
  localStorage.setItem('imKeywordsInput', imKeywordsInput.value);
  localStorage.setItem('keywordsRelevance', String(keywordsRelevance.value));
  localStorage.setItem('height',String(height.value));
  localStorage.setItem('width',String(width.value));
  localStorage.setItem('steps',String(steps.value));
  localStorage.setItem('seed',String(seed.value));
  localStorage.setItem('previewVisible',String(previewVisible.value))

};

// 监听变化保存状态
watch([keywordsInput, generatedImages, imKeywordsInput, selectedOption, keywordsRelevance,height,width,steps,seed,previewVisible], saveState);
onMounted(() => {
  // 初始化选中第一个标题
  senceSubTitle.value ='文生图';
  currentTitle.value = '中文生图';

  if (route.query.taskid) {
    // 只有当有 taskid 时才恢复状态
    keywordsInput.value = localStorage.getItem('keywordsInput') || '';
    imKeywordsInput.value = localStorage.getItem('imKeywordsInput') || '';
    generatedImages.value = JSON.parse(localStorage.getItem('generatedImages') || '[]');
    keywordsRelevance.value = parseInt(localStorage.getItem('keywordsRelevance') ?? '80') || 80;
    height.value = parseInt(localStorage.getItem('height') ?? '512' ) || 512;
    width.value = parseInt(localStorage.getItem('width') ?? '512' ) || 512;
    seed.value = parseInt(localStorage.getItem('seed') ?? '-1' ) || -1;
    steps.value = parseInt(localStorage.getItem('steps') ?? '-1' ) || -1;
    selectedOption.value = parseInt(localStorage.getItem('selectedOption') ?? '1' ) || 1;
    previewVisible.value = false;
  }
});
</script>

<style>
.text-image {
  width:100%; 
  height: 100vh; 
  background: #FCFCFC; 
  justify-content: flex-start; 
  align-items: flex-start; 
  display: inline-flex;
  overflow: auto;
  position: relative; 
}
.setting {
  width: 460px;
  height: auto;
  padding: 20px;
  background: white;
  border-right: 1px #E3E3E3 solid;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-left: 1px solid #E3E3E3;
}
.setup {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
}
/**输入框 */
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
  align-items: center; 
  gap: 113px; 
  display: inline-flex;
}
.prompt, .imprompt, .steps, .seeds {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
}
.Frame3659, .Frame1000003490,.imageNum, .imageWH {

  display: flex;
  width: 420px;
  justify-content: space-between;
  align-items: center;
 
} 
.progressbar{
  display: flex;
  width: 420px;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
}

.progressbar-title {
  width: 420px;
  justify-content: flex-start;
  align-items: center;
  display: flex;
}

.Frame3660{

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
.Frame1000003586, .Frame1000003489 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
}
.Frame1000003487 {
 display: flex;
 width: 100px;
 height: 30px;
 padding: 11px 10px;
 justify-content: space-between;
 align-items: center;
 border-radius: 4px;
 border: 1px solid #B0B0B0;
 background: #FFF;
}
.CommonImagessmall, .CommonWidth, .CommonHight, .CommonSteps, .SdtoolsSeed {
  width: 16px;
  height: 16px;
  position: relative;
}
.Frame24 {
  position: absolute;
  left: 284.85px;
  top: 0px;
}
.SdtoolsBar {
  width: 420px;
  height: 20px;
  position: relative;
}
.SdtoolsBar .Shape {
  height: 4px;
  top: 8px;
  position: absolute;
  border-radius: 11px;
}
.Bg {
  width: 8px;
  height: 20px;
  background: white;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.20);
  border-radius: 5px;
}
.title {
  color: #1D1D1D; 
  font-size: 16px; 
  font-family: Nunito; 
  font-weight: 700; 
  text-transform: capitalize; 
  line-height: 24px; 
  letter-spacing: 0.16px; 
  word-wrap: break-word;
  white-space: nowrap; /* 防止换行 */
  text-align:left;
}
.mid-description {
  color: #8E8E8E;
  font-size: 12px;
  display: flex;
  width: 300px;
  height: 18px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  font-family: Nunito;
  font-style: normal;
  /* font-weight: 700; */
  text-transform: capitalize;
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
.generateImage {
  
  width: 460px;
  height: 64px;
  padding: 11px;
  background: #017AFF;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.generate-button {
  color: white;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.16px;
  word-wrap: break-word;
  cursor: pointer;
  font-family: Quicksand;
}
 
.generateImage.disabled {
  opacity: 0.5; /* 降低透明度以显示禁用状态 */
  pointer-events: none; /* 禁用点击事件 */
  background-color:gray;
  cursor: not-allowed;
}
 
.input-error {
  border: 1px solid red;
}

.dimension {
  display: flex;
  align-items: center;
  height: 30px;

}

.dimension-input {
  width: 48px; /* 根据需要调整输入框宽度 */
  height: 24px;
  font-size: 14px;
  padding: 2px 4px;
  border: 1px solid transparent;
  border-radius: 4px;
  text-align: center;

}
.help-icon {
  width: 16px;
  height: 16px;
  cursor: pointer;
  position: relative;
}

.help-icon:hover .tooltip {
  display: block; /* 悬停时显示 */
}

.tooltip {
  display: none;
  position: absolute;
  top: 30px; /* 从 .help-icon 顶部向上偏移 */
  right: -90px; /* 从 .help-icon 右边缘向外偏移 */
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 10;
  width: 300px;
}

 .image-list-area {
  width: calc(100% - 920px); /*减去 .setting 和.preview 的宽度 */
  height: 100%;
  padding: 20px;
  background: #FCFCFC;
  flex-direction: column;
}

.image-list-area.expanded {
  width:calc(100% - 460px); /*减去 .setting 的宽度 */
  transition: width 0.3s ease; 
  height: 100%;
}

.dotted-frame {
  width: 100%;
  height: 100%;
  padding: 20px;
  mix-blend-mode: multiply;
  background: white;
  border-radius: 8px;
  border: 2px #B0B0B0 dotted;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  display: flex;
}

.SdtoolsSmell {
  width: 24px;
  height: 24px;
  position: relative;
}

.image-text {
  text-align: center;
  color: #8E8E8E;
  font-size: 16px;
  font-family: Nunito;
  font-weight: 400;
  text-transform: capitalize;
  line-height: 24px;
  letter-spacing: 0.16px;
  word-wrap: break-word;
}
.download-frame {
  width: 100%; 
  height: 80px; 
  padding: 20px 28px;  
  border: 1px #377DFF solid; 
  border-radius: 8px;
  justify-content: center; 
  align-items: center; 
  display: flex;
}
.download-frame-inner{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;  
  background: #FCFCFC;

}
.download-ttoi{
  height: 60px; 
  padding-left: 20px; 
  padding-right: 20px; 
  padding-top: 28px; 
  padding-bottom: 28px; 
  border-radius: 8px;
  justify-content: center; 
  align-items: center; 
  display: flex;
  cursor: pointer;
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