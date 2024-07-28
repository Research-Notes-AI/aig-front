<template>
     <div class="relativity">
          <div class="Frame1000003590">
          </div>
          <div class="SdtoolsBar">
            <!--进度条-->
            <div class="progress-bar-sub">
              <div class="progress-container" >
              <div class="progress-bar" :style="{ width: `${localSelectedPercentage}%` }"></div>
               <div
               v-for="step in steps"
               :key="step"
               @click="selectPercentage(step)" 
               class="step-wrapper"
              >
              <div :class="['step', { selected: step <= localSelectedPercentage }]">
               <div v-if="step === localSelectedPercentage" class="percentage-display">{{ step }}%</div>
            </div>
             </div>
            </div>
           </div>
          
          </div>
        </div>
</template>

<script setup lang="ts">
import { ref,watch,computed,defineEmits,defineProps,onMounted } from 'vue';

const props = defineProps({
  selectedPercentage: {
    type: Number,
    default: 80
  }
});


const emit = defineEmits(['selectedPercentage']);

const localSelectedPercentage = ref(props.selectedPercentage);
const steps = Array.from({ length: 11 }, (_, i) => i * 10); // 0%到100%，每10%为一个步进长度

const selectPercentage = (step: number) => {
  localSelectedPercentage.value = step;
  emit('selectedPercentage', step);
};

watch(() => props.selectedPercentage, (newVal) => {
  localSelectedPercentage.value = newVal;
});


onMounted(() => emit('selectedPercentage', props.selectedPercentage));

</script>

<style scoped>

.SdtoolsBar {
  width: 100%;
  height: 20px;
}
.progress-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4px;
  background-color: #e5e5e5;
  
}

.progress-bar-sub {
  width: 100%;
  height: 30px;
  display:flex;
  /* background-color: #e5e5e5; */
  border-radius: 10px;
  /* overflow: hidden; */
  cursor: pointer;
  position: relative;
  transition: width 0.3s ease; /* 添加过渡效果 */
  align-items: center;
 }  

.step {
  width: 4px;
  height: 8px;
  background-color: grey;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative; /* 以便使用 z-index 确保步骤在进度条之上 */
  z-index: 1;
  /* margin-left: -15px; 确保每个矩形框之间有一定的重叠 */
  /* border-radius: 5px; */

}

.step.selected {
  background-color: #017AFF;
}

.percentage-display {
  font-size: 1.2em;
  font-weight: bold;
}
.relativity {
  height: 52px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}
.Frame1000003590 {
  justify-content: flex-start;
  gap: 10px;
  display: flex;
  width:100%;
  height: 20px;
}

.progress-bar {
  height: 4px;
  background-color: #017AFF;
  position: absolute;
  top: 13px;
  left: 0;
  border-radius: 10px;
  z-index: 0;
}

.percentage-display {
  font-size: 12px;
  font-weight: bold;
  margin-top: -30px;
  position: absolute;
  transform: translateX(-50%);
  color: white;
  background-color: #017AFF;
  padding: 2px 5px;
  border-radius: 4px;
}

.step-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
}
</style>
