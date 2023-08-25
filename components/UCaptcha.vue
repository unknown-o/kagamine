<template>
  <v-row justify="center">
    <v-dialog v-model="showCaptcha" persistent max-width="600px">
      <v-card>
        <v-card-title class="mt-2 ml-2"> 安全验证 </v-card-title>
        <v-card-subtitle class="ml-2 mb-2">
          {{ subTitle }}
        </v-card-subtitle>
        <v-card-text>
          <div v-if="captchaMain && !showLoading">
            <v-row class="fill-height ma-0" align="center" justify="center">
              <template v-for="(image, i) in captchaImages" :key="i">
                <v-col cols="4">
                  <v-img
                    @click="clickImage"
                    :data-image-id="i"
                    :height="captchaImageSize[i]"
                    :src="captchaImageBaseURL + '/' + image"
                    class="grey lighten-2"
                    :style="
                      captchaImageSize[i] == 100 ? 'opacity: 1 ;' : 'opacity: 0.5 ;'
                    "
                  >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey lighten-5">
                        </v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-col>
              </template>
            </v-row>
            <div class="ma-2">
              {{ captchaText }}
            </div>
          </div>
          <div v-if="showLoading" class="ma-2">
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                size="100"
                color="amber"
                indeterminate
              ></v-progress-circular>
            </v-row>
          </div>
          <div v-if="showIcon" class="ma-2">
            <v-row align="center" justify="space-around">
              <v-icon size="100" :color="iconColor">mdi-{{ iconName }}</v-icon>
            </v-row>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="!showLoading && !showIcon">
            <v-btn color="green darken-1" text @click="showCaptcha = false"> 关闭 </v-btn>
            <v-btn color="green darken-1" text @click="getCaptcha"> 刷新 </v-btn>
            <v-btn color="green darken-1" text @click="submit"> 提交 </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  <div class="text-center">
    <v-snackbar v-model="showSnackbar" :timeout="snackbarTimeout" multi-line>
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { Md5 } from "ts-md5";
import axios from "axios";
export default {
  name: "UCaptcha",
  setup() {
    let showSnackbar = ref(false);
    let snackbarTimeout = ref(3000);
    let snackbarText = ref("HelloWorld!");

    const appid = ref(import.meta.env.VITE_APP_UCAPTCHA_APPID);
    const showCaptcha = ref(false);
    const captchaImages = ref([]);
    const captchaImageBaseURL = ref(import.meta.env.VITE_APP_UCAPTCHA_IMGBASE);
    const captchaText = ref("获取验证信息中...");
    const subTitle = ref("您需要通过安全验证后才能继续操作，请按照提示执行操作。");
    const clickList = ref([] as any);
    const showLoading = ref(true);
    const showIcon = ref(false);
    const iconColor = ref("green");
    const iconName = ref("check");
    const callbackSuccess = ref(function (token: string, timestamp: number) {
      console.log(token, timestamp);
    });
    const captchaImageSize = ref([
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
    ]);
    const captchaMain = ref(false);

    function snackbar(data: any) {
      showSnackbar.value = true;
      snackbarText.value = data.text;
      snackbarTimeout.value = data.timeout;
    }

    function clickImage(e: any) {
      var imageId = e.currentTarget.dataset.imageId;
      if (captchaImageSize.value[imageId] == 100) {
        captchaImageSize.value[imageId] = 80;
        clickList.value.push(imageId);
      } else {
        for (var i = 0; i < clickList.value.length; i++) {
          if (clickList.value[i] == imageId) {
            clickList.value.splice(i, 1);
            i--;
          }
        }
        captchaImageSize.value[imageId] = 100;
      }
    }

    function requestApi(
      apiPath: string,
      method: string,
      query: any,
      args: any,
      callbackSuccess: any
    ) {
      showLoading.value = true;
      var timestamp = Date.now();
      var key = Md5.hashStr("Kagamine Yes!" + timestamp.toString());
      var appid = "";
      var auth = btoa(timestamp.toString() + "__" + key);
      axios({
        withCredentials: true,
        method: method,
        params: query,
        headers: {
          Authorization: "Basic " + auth,
          "X-UCaptcha-APPID": appid,
        },
        data: args,
        url: import.meta.env.VITE_APP_UCAPTCHA_APIBASE + apiPath,
        responseType: "json",
      })
        .then(function (response) {
          showLoading.value = false;
          callbackSuccess(response);
        })
        .catch(function (error) {
          showLoading.value = false;
          try {
            if (error.response.data.msg) {
              callbackSuccess(error.response);
            } else {
              showIcon.value = true;
              iconName.value = "close-circle";
              iconColor.value = "red";
              subTitle.value = "抱歉，获取安全验证信息失败，请重试！";
              snackbar({
                type: "error",
                text: error.message,
                duration: 3000,
              });
            }
          } catch {
            showIcon.value = true;
            iconName.value = "close-circle";
            iconColor.value = "red";
            subTitle.value = "抱歉，获取安全验证信息失败，请重试！";
            snackbar({
              type: "error",
              text: error.message,
              duration: 3000,
            });
          }
        });
    }

    function submit() {
      clickList.value.sort(function (a: number, b: number) {
        return a - b;
      });
      var data = Md5.hashStr("[" + clickList.value.toString() + "]");
      requestApi("/" + appid.value, "post", {}, { data: data }, function (rdata: any) {
        snackbar({
          type: rdata.status == 200 ? "success" : "error",
          text: rdata.data.msg,
          duration: 3000,
        });
        if (rdata.data.code == 1) {
          captchaImages.value = [];
          captchaText.value = "通过验证！正在进行下一步操作...请稍后...";
          captchaMain.value = false;
          subTitle.value = "通过验证！正在进行下一步操作...请稍后...";
          showIcon.value = true;
          iconName.value = "check";
          iconColor.value = "green";
          showCaptcha.value = false;
          showSnackbar.value = false;
          callbackSuccess.value(rdata.data.data.token, rdata.data.data.timestamp);
        } else {
          getCaptcha(false);
        }
      });
    }

    function getCaptcha(callback: any) {
      captchaText.value = "获取验证信息中...";
      subTitle.value = "您需要通过安全验证后才能继续操作，请按照提示执行操作。";
      if (typeof callback == "function") {
        callbackSuccess.value = callback;
      }
      clickList.value = [];
      showIcon.value = false;
      showCaptcha.value = true;
      captchaImageSize.value = [
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
      ];
      requestApi("/" + appid.value, "get", {}, {}, function (rdata: any) {
        snackbar({
          type: rdata.status == 200 || rdata.status == 201 ? "success" : "error",
          text: rdata.data.msg,
          duration: 3000,
        });
        if (rdata.status == 200) {
          captchaImages.value = rdata.data.data.images;
          captchaText.value = rdata.data.data.prompt;
          captchaMain.value = true;
        } else if (rdata.status == 201) {
          captchaImages.value = [];
          captchaText.value = "已经自动通过验证！";
          captchaMain.value = false;
          subTitle.value = "当前环境安全！已自动通过安全验证！";
          showIcon.value = true;
          iconName.value = "check";
          iconColor.value = "green";
          showCaptcha.value = false;
          showSnackbar.value = false;
          callbackSuccess.value(rdata.data.data.token, rdata.data.data.timestamp);
        }
      });
    }

    return {
      showCaptcha,
      captchaImages,
      captchaText,
      getCaptcha,
      submit,
      clickImage,
      showLoading,
      iconColor,
      iconName,
      showIcon,
      captchaImageSize,
      subTitle,
      captchaImageBaseURL,
      captchaMain,
      showSnackbar,
      snackbarTimeout,
      snackbarText,
    };
  },
};
</script>
