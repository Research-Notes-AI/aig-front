<template>
     <div class="relativity">
          <div class="Frame1000003590">
            <div class="Frame1000003591"></div>
            <div class="Frame1000003588">
              <div class="Frame1000003587">
              <div class="percentage-label" :style="percentageStyle" >{{ localSelectedPercentage }}%</div>
              </div>
            </div>
            <div class="Frame1000003592"></div>
          </div>
          <div class="SdtoolsBar">
            <!--进度条-->
            <div class="progress-bar">
              <div class="progress-container" >
            <div
               v-for="step in steps"
               :key="step"
               :class="['progress-step', { selected: step <= localSelectedPercentage }]"
               @click="selectPercentage(step)"
             ></div>
             <div class="step-indicator"></div>
          </div>
            </div>
            <div class="Frame24">
              <div class="Bg"></div>
            </div>
          </div>
        </div>
</template>

<script setup lang="ts">
import { ref,computed,defineEmits,defineProps } from 'vue';

const props = defineProps({
  selectedPercentage: {
    type: Number,
    default: 80
  }
});


const emit = defineEmits(['update:selectedPercentage']);

const localSelectedPercentage = ref(props.selectedPercentage);
const steps = Array.from({ length: 11 }, (_, i) => i * 10); // 0%到100%，每10%为一个步进长度

const selectPercentage = (step: number) => {
  localSelectedPercentage.value = step;
  emit('update:selectedPercentage', step);
};

// watch(() => props.selectedPercentage, (newVal) => {
//   localSelectedPercentage.value = newVal;
// });

const percentageStyle = computed(() => ({
  left: `calc(${localSelectedPercentage.value}% - 20px)` // 调整位置使其居中
}));

// const highlightBoxStyle = computed(() => ({
//   left: `calc(${localSelectedPercentage.value}% - 10px)` // 调整位置使其居中
// }));
</script>

<style scoped>

.SdtoolsBar {
  width: 100%;
  height: 20px;
  align-self: stretch;
}
.progress-container {
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.progress-bar {
  width: 100%;
  height: 4px;
  display:flex;
  background-color: #e5e5e5;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: width 0.3s ease; /* 添加过渡效果 */
}

.progress-step {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2px;
}

.step-indicator {
  width: 2px;
  height: 8px;
  background-color: gray;
  border-radius: 1px;
}

.step-indicator .progress-step{
  background-color: #377dff;
}

.step-indicator.selected{
  background-color: #377dff;
}
.relativity {
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
</style>
