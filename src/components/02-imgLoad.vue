<script setup>
import { useImgLoad } from "../composables/useImgLoad.js";
import { ref, onMounted } from "vue";
const banner = "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*KncG4Kdw578f6IdYj2Vczg.j";

const imgArr = [
  "https://picsum.photos/id/106/300/200",
  "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*KncG4Kdw578f6IdYj2Vczg.jpe",
  "https://picsum.photos/id/106/300/200",
  "https://picsum.photos/id/106/300/200",
  "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*KncG4Kdw578f6IdYj2Vczg.jp",
];

// 改成 composables (只要 useImgLoad 帶入圖片連結，就可透過解構，把原本包裝好邏輯中的 images, error, isLoad 取出来)
// useImgLoad(banner) 要傳入當前 圖片路徑

// 分別處理 imgArr 和 banner 的圖片載入
const { images: imgArrImages, imagesError: imgArrError, error: imgArrLoadError, isLoad: imgArrIsLoad } = useImgLoad(imgArr);

const { images: bannerImages, imagesError: bannerError, error: bannerLoadError, isLoad: bannerIsLoad } = useImgLoad(banner);
</script>

<template>
  <div>
    <p style="color: blue">●imgArrImages: {{ imgArrImages }}</p>
    <p>♦︎bannerImages: {{ bannerImages }}</p>
    <p style="color: blue">●imgArrLoadError: {{ imgArrLoadError }}</p>
    <p style="color: blue">●imgArrError: {{ imgArrError }}</p>
    <p>♦︎bannerLoadError: {{ bannerLoadError }}</p>
  </div>

  <div class="imgload">

    <!-- 載入多張圖片，isLoad為false的情況，圖片都載入完成則顯示圖片。不適合用單一error欄位來判斷 -->
    <h1 v-if="imgArrIsLoad">載入中...</h1>
    <!-- 載入完成，顯示每張圖片 imgArrImages 已包含每張圖的 src 和 isImageLoad(載入狀態) -->
    <div v-else class="img_group">
      <div v-for="(img, index) in imgArrImages" :key="index">
        <img :src="img.src" v-if="img.isImageLoad" alt="" />
        <!-- 每張圖旁 顯示對應的錯誤圖片連結 -->
        <h2 v-else class="err_msg">
          {{ imgArrLoadError }}: 
          <br />
          {{ img.src }}
        </h2>
      </div>

    </div>

    <div v-if="imgArrError.length > 0" style="width:40vw">
      <h2 class="err_msg">載入失敗的圖片：</h2>
      <ul>
        <li class="err_msg" 
        v-for="(errorSrc, index) in imgArrError" :key="index">{{ errorSrc }}</li>
      </ul>
    </div>

    <!-- 顯示 banner 載入狀態 -->
    <!-- 如果 isLoad 為 false，就顯示圖片 -->
    <h1 v-if="bannerIsLoad">載入中...</h1>
    <div v-else class="img_group">
      <div v-for="(img, index) in bannerImages" :key="index">
        <img :src="img.src" v-if="img.isImageLoad" alt="" />
        <h2 v-else class="err_msg">
          {{ bannerLoadError }}:
          <br />
          {{ img.src }}
        </h2>
      </div>
    </div>

  </div>
</template>

<style scoped>
.imgload {
  width: 100%;
  height: 100%;
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
}

.err_msg {
  font-size: 16px;
  display: flex;
  flex-wrap: wrap;
  word-break: break-all;
}

.img_group {
  display: flex;
  flex-wrap: wrap;
  width: 30vw;
}
</style>
