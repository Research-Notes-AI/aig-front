<template>
  <div 
    class="sidebar-item" 
    @mouseover="isHovered = true" 
    @mouseleave="isHovered = false"
    @click="handleClick"
    :class="{ 'hovered': isHovered, 'active': props.isActive, 'collapsed': props.isCollapsed }"
  >
    <div class="item-content">
      <div class="item-icon">
        <img :src="resolveImage(iconSrc)" />
      </div>
      <div  class="item-text">
        <div class="title">{{ title }}</div>
        <div class="description">{{ description }}</div>
      </div>
    </div>
    <div class="item-arrow">
      <img :src="resolveImage(arrowSrc)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  title: string,
  description: string,
  iconSrc: string,
  arrowSrc: string,
  isActive: boolean,
  acitiveTitle: string,
  isCollapsed: boolean,
}>();

const emits = defineEmits(['item-click']);

const isHovered = ref(false);
console.log(props.isCollapsed);

const handleClick = () => {
  emits('item-click', props.title);
};

const resolveImage = (src: string) => {
  return new URL(src, import.meta.url).href;
};
</script>

<style scoped>
.sidebar-item {
  width: 360px;
  height: 100px;
  padding: 28px 20px;
  border-radius: 8px;
  border: 1px solid #E3E3E3;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.3s;
}
.sidebar-item.hovered {
  border-color: #377DFF;
  cursor: pointer;
}
.sidebar-item.active {
  border-color: #377DFF;
   cursor: pointer;
   transition: border-color 0.3s;

}

.sidebar-item.collapsed {
  border:none;
  cursor: pointer;
}
.sidebar-item.collapsed.active {
  border: none; /* or use border-color: transparent; */
  transition: border-color 0.3s;

}
.item-content {
  display: flex;
  align-items: center;
  gap: 20px;
}
.item-icon, .item-arrow {
  width: 24px;
  height: 24px;
}
.item-text {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  color: #1D1D1D;
  font-size: 16px;
  font-family: Nunito;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.16px;
}
.description {
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
</style>
