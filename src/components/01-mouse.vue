<script setup>
import { computed } from "vue";
import { useMouse } from "../composables/useMouse.js"
// import { computed, ref, onMounted, onUnmounted } from "vue";

//使用“組合式函數”(Composables)將邏輯封裝。透過解構的方式，把原本包裝好的邏輯中的 x 和 y 取出来
const { x, y } = useMouse()

// const x = ref(0);
// const y = ref(0);

// 樣式綁定需加上px 透過計算屬性加上px
const flyX = computed(() => {
  return `${x.value - 300 / 2}px`; //flyX 在左上角 ，根據滑鼠的 X 軸位置計算圖片的水平位移，使其置中
});
const flyY = computed(() => {
  return `${y.value - 168 / 2}px`;
});

// 更新滑鼠位置的函式，當觸發 mousemove 時，會更新 x 和 y 的值(將滑鼠的 X、Y 軸位置賦值給 X、Y)
// const update = (e) => {
//   x.value = e.pageX;
//   y.value = e.pageY;
// };

// onMounted(() => window.addEventListener("mousemove", update));

// onUnmounted(() => window.removeEventListener("mousemove", update));
</script>

<template>
  <div class="content flex-center">
    <!-- ★『v-bind:style』：「key值(物件屬性名稱)→對應的是style屬性，value(物件的值)→則是相對應的值。」 -->
    <img class="fly" :style="{ top: flyY, left: flyX }" src="../assets/images/fly.png" alt="" />
    <h1>X:{{ x }}, Y:{{ y }}</h1>
  </div>
</template>

<style scoped>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url("../assets/images/bg.jpg");
  background-size: cover;
}

img.fly {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 168px;
}
</style>
