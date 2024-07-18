<template>
    <div class="Frame30">
      <div class="Cone">
        <img :src="resolveImage(imageSrc)" class="Cone012" />
        <div class="MaskGroup">
          <img :src="resolveImage(imageSrc)" class="Cone011" />
          <div class="Rectangle15" :style="{ background: gradientColors }"></div>
        </div>
      </div>
      <div class="title">{{ title_inner }}<br />{{ subtitle }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
   defineProps<{
  
      imageSrc: string,
      title_inner: string,
      subtitle: string,
      gradientColors: string,
    }>()

  const resolveImage = (src: string) => {
  return new URL(src, import.meta.url).href;
};
  </script>
  
  <style scoped>
  .Frame30 {
    width: 260px;
    height: 270px;
    padding: 20px 30px;
    background: white;
    box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
  }
  .Cone {
    width: 145px;
    height: 145px;
    position: relative;
  }
  .Cone012 {
    width: 145.71px;
    height: 145.72px;
    position: absolute;
    top: -0.31px;
    left: -1.52px;
  }
  .MaskGroup {
    width: 145.71px;
    height: 145.72px;
    position: absolute;
    top: -0.31px;
    left: -1.52px;
  }
  .Cone011 {
    width: 145.71px;
    height: 145.72px;
    position: absolute;
  }
  .Rectangle15 {
    width: 2500px;
    height: 145.72px;
    position: absolute;
    left: -1195.6px;
    top: 0;
    mix-blend-mode: hard-light;
  }
  .title {
    width: 180px;
    text-align: center;
    color: #1d1d1d;
    font-size: 20px;
    font-family: Nunito;
    font-weight: 700;
    line-height: 34px;
    letter-spacing: 0.2px;
    word-wrap: break-word;
  }
  </style>