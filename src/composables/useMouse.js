import { onMounted, onUnmounted, ref } from "vue"

export const useMouse = () => {
  const x = ref(0);
  const y = ref(0);

  // 更新滑鼠位置的函式，當觸發 mousemove 時，會更新 x 和 y 的值(將滑鼠的 X、Y 軸位置賦值給 X、Y)
  const update = (e) => {
    x.value = e.pageX;
    y.value = e.pageY;
  };

  // 當元件掛載時，監聽滑鼠移動事件
  onMounted(() => window.addEventListener("mousemove", update));
  // 當元件卸載時，移除滑鼠移動事件的監聽
  onUnmounted(() => window.removeEventListener("mousemove", update));
  
  // 將滑鼠位置的變數 x 和 y 暴露出去
  return {
    x,
    y
  }
}
