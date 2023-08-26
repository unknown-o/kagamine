<template>
  <title>Videos - KagamineFans</title>

  <v-container>
    <v-row dense>
      <v-col cols="12" xs="12" sm="6" md="5" lg="5" offset-lg="1">
        <h1 class="my-6 ml-1 justify text-primary">
          <router-link to="/">
            <v-btn class="text-yellow-accent-4" variant="text">
              <v-icon size="25">mdi-arrow-left</v-icon>
            </v-btn>
          </router-link>
          Videos
        </h1>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" xs="12" sm="4" lg="3" offset-lg="1">
        <v-hover v-slot="{ isHovering, props }">
          <v-card :elevation="isHovering ? 12 : 1" v-bind="props" class="mb-2">
            <v-card-text>
              <div class="ma-3 justify">
                <h2>Play Settings</h2>
                <v-divider class="my-4 justify"></v-divider>
                <v-select
                  v-model="videoInfo"
                  :items="videoSelectList"
                  item-title="name"
                  item-value="value"
                  label="Select Video"
                ></v-select>
                <v-select
                  v-model="nodeInfo"
                  :items="cdnSelectList"
                  item-title="name"
                  item-value="value"
                  label="Select CDN"
                ></v-select>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn class="ma-3" @click="playVideo">PLAY NOW</v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="12" xs="12" sm="6" lg="7">
        <v-hover v-slot="{ isHovering, props }">
          <v-card :elevation="isHovering ? 12 : 1" v-bind="props" class="mb-2">
            <v-card-text>
              <video
                id="video-player"
                autoplay
                preload
                controls
                style="width: 100%; height: 100%"
                :src="currentVideoUrl"
                poster="https://img-1.llilii.cn/compression/vocaloid/kagamine/63932635_p0.jpg"
              ></video>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
  <UCaptcha ref="captchaRef"></UCaptcha>
  <VuetifySnackbar ref="snackbarRef"></VuetifySnackbar>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { requestApi } from "../plugins/common";
import UCaptcha from "../components/UCaptcha.vue";
import VuetifySnackbar from "../components/VuetifySnackbar.vue";
const videoPlayer = ref();
let captchaRef = ref();
let snackbarRef = ref();
const getCaptcha = function (callback: any) {
  captchaRef.value?.getCaptcha(callback);
};
const snackbar = function (text = "this is a message!", timeout = 3000, color = "black") {
  snackbarRef.value?.show(text, timeout, color);
};

let cdnSelectList = ref([]);
let nodeInfo = ref(null);
let videoSelectList = ref([]);
let videoInfo = ref(null);
let currentVideoUrl = ref("");
const getVideoList = () => {
  fetch("https://static-1.llilii.cn/json/kagamine/videos.json")
    .then((response) => response.json())
    .then((data) => {
      data.play_node.forEach((node) => {
        cdnSelectList.value.push({ name: node.name, value: node });
      });
      data.video_info.forEach((info) => {
        videoSelectList.value.push({ name: info.name, value: info });
      });
    })
    .catch((error) => console.log(error));
};
getVideoList();

const playVideo = () => {
  if (videoInfo.value == null || nodeInfo.value == null) {
    snackbar("Please select the video you want to play and the node you want to use");
    return false;
  }

  if (nodeInfo.value.captcha) {
    getCaptcha(function (token, timestamp) {
      requestApi(
        "/video/sign",
        {
          token: token,
          timestamp: timestamp,
        },
        "post",
        {},
        { path: videoInfo.value.path },
        function (rdata) {
          if (rdata.data.code == 1) {
            currentVideoUrl.value = `${nodeInfo.value.base_url}${videoInfo.value.path}?token=${rdata.data.data.token}&timestamp=${rdata.data.data.timestamp}`;
          } else {
            snackbar(rdata.data.msg);
          }
        },
        function (error) {
          snackbar(error.message);
        }
      );
    });
  } else {
    currentVideoUrl.value = `${nodeInfo.value.base_url}${videoInfo.value.path}`;
  }
};
</script>
