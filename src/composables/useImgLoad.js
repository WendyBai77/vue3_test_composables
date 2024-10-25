import { ref } from "vue"; // 引入 Vue 的 ref 用來定義反應式變數

export const useImgLoad = (input) => {
  const images = ref([]); // 用來儲存載入的圖片結果
  const imagesError = ref([]); // 用來儲存載入失敗的圖片路徑
  const error = ref(""); // 用來顯示圖片載入失敗的錯誤訊息
  const isLoad = ref(true); // 圖片都尚未被載入，預設true。當所有圖片(成功或失敗)載入後，才會變為 false。

  // 定義載入單張圖片的函式，接收圖片路徑
  const loadImage = (src) => {
    return new Promise((resolve, reject) => { // 回傳一個 Promise，當載入成功時 resolve，失敗時 reject
      const img = new Image(); // 創建一個 Image 元件
      img.src = src; // 設定圖片的來源 URL

      img.onload = () => { // 當圖片成功載入時觸發
        // 成功時直接 resolve，並回傳圖片路徑和載入狀態
        resolve({
          src,
          isImageLoad: true,    // 該圖片成功載入
        });
      };

      img.onerror = () => { // 當圖片載入失敗時觸發
        // 失敗時 reject，回傳失敗的圖片路徑
        reject(src);
      };
    });
  };
  // 定義一個函式來載入多張圖片，接收圖片路徑陣列
  const loadImages = async (imgArray) => {
    console.log('imgArray:', imgArray)
    // imgArray.map((imgSrc) =>  { return loadImage... } 加上大括號 和 return 才能另外印東西
    const promises = imgArray.map((imgSrc) => { // map 迭代每個圖片 URL，並呼叫 loadImage 處理每張圖的載入
      console.log('imgSrc:', imgSrc)

      return loadImage(imgSrc).catch((failedSrc) => { // 如圖片載入失敗，將失敗的路徑加入 imagesError 陣列
        console.log('failedSrc:', failedSrc)
        imagesError.value.push(failedSrc); // 將載入失敗的圖片路徑放入 imagesError
        console.log('imagesError.value:',imagesError.value)
        error.value = "圖片載入失敗"; // 設定錯誤訊息
        return { src: failedSrc, isImageLoad: false }; // 回傳失敗的圖片路徑及載入失敗
      })
    });

    const results = await Promise.all(promises); // 等待所有 Promise 完成後，將結果存入 results
    images.value = results; // 將結果陣列儲存到 images 中
    isLoad.value = false; // 當所有圖片(成功或失敗)載入後，載入完成將 isLoad 設為 false
  };

  // 判斷 input 是單一圖片字串 還是 圖片陣列
  if (Array.isArray(input)) {
    loadImages(input); // 如果是陣列，呼叫 loadImages 載入多張圖片
  } else {
    loadImages([input]); // 如果是單一字串，將其包裝成陣列後呼叫 loadImages
  }

  return {
    images, // 回傳圖片載入結果
    imagesError, // 回傳載入失敗的圖片
    error, // 回傳錯誤訊息
    isLoad, // 回傳載入狀態
  };
};
