<template>
  <title>Pictures - KagamineFans</title>
  <v-container>
    <v-row dense>
      <v-col cols="12" xs="12" sm="6" md="5" lg="5" offset-lg="1">
        <h1 class="my-6 ml-1 justify text-primary">
          <router-link to="/">
            <v-btn class="text-yellow-accent-4" variant="text">
              <v-icon size="25">mdi-arrow-left</v-icon>
            </v-btn>
          </router-link>
          Pictures
        </h1>
      </v-col>
    </v-row>

    <v-row v-if="imageList && likeList" style="max-width: 800px; margin: auto" dense>
      <v-col cols="6">
        <div v-for="(item, index) in pictureList">
          <v-hover v-if="index % 2 === 0" v-slot="{ isHovering, props }">
            <v-card :elevation="isHovering ? 12 : 1" v-bind="props" class="mb-2">
              <v-img class="white--text align-end" gradient="to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.4)"
                v-bind:src="`${basePath.compression}/${item.filename}`" cover>
                <v-toolbar color="rgba(0, 0, 0, 0)" theme="dark">
                  <template v-slot:prepend>
                    <a title="Download this image" target="_blank" :href="`${basePath.origin}/${item.filename}`">
                      <v-btn color="white" icon="mdi-download-circle"></v-btn>
                    </a>
                    <div class="hidden-xs" style="display: inline">
                      {{ item.filename }}
                    </div>
                  </template>
                  <template v-slot:append>
                    {{ item.likes
                    }}<v-btn @click="likeImage(item)" color="red" icon="mdi-heart"></v-btn>
                  </template>
                </v-toolbar>
              </v-img>
            </v-card>
          </v-hover>
        </div>
      </v-col>
      <v-col cols="6">
        <div v-for="(item, index) in pictureList">
          <v-hover v-if="index % 2 === 1" v-slot="{ isHovering, props }">
            <v-card :elevation="isHovering ? 12 : 1" v-bind="props" class="mb-2">
              <v-img class="white--text align-end" gradient="to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.4)"
                v-bind:src="`${basePath.compression}/${item.filename}`" cover>
                <v-toolbar color="rgba(0, 0, 0, 0)" theme="dark">
                  <template v-slot:prepend>
                    <a title="Download this image" target="_blank" :href="`${basePath.origin}/${item.filename}`">
                      <v-btn color="white" icon="mdi-download-circle"></v-btn>
                    </a>
                    <div class="hidden-xs" style="display: inline">
                      {{ item.filename }}
                    </div>
                  </template>
                  <template v-slot:append>
                    {{ item.likes
                    }}<v-btn @click="likeImage(item)" color="red" icon="mdi-heart"></v-btn>
                  </template>
                </v-toolbar>
              </v-img>
            </v-card>
          </v-hover>
        </div>
      </v-col>
      <v-col cols="12" align="center" justify="center">
        <v-btn style="margin: 40px" @click="loadImage">Load More</v-btn>
      </v-col>
    </v-row>
    <v-row v-else class="fill-height ma-0" align="center" justify="center">
      <v-progress-circular style="height: 60vh" :size="50" color="amber" indeterminate></v-progress-circular>
    </v-row>
  </v-container>
  <VuetifySnackbar ref="snackbarRef"></VuetifySnackbar>
</template>

<script setup>
import { requestApi, randomNumBoth } from "../plugins/common";
import { ref } from "vue";
import VuetifySnackbar from "../components/VuetifySnackbar.vue";

let pictureList = ref([]);
let imageList = ref(null);
let likeList = ref(null);
let snackbarRef = ref();
let basePath = reactive({ compression: "", origin: "" });
const getImageList = () => {
  fetch("https://img-1.llilii.cn/imglist/kagamine.json")
    .then((response) => response.json())
    .then((data) => {
      imageList.value = data;
      basePath.origin = data.base_url.origin.private;
      basePath.compression = data.base_url.compression.private;
      getImageLikes();
    })
    .catch((error) => console.log(error));
};
const snackbar = function (text = "this is a message!", timeout = 3000, color = "black") {
  snackbarRef.value?.show(text, timeout, color);
};
getImageList();

const getImageLikes = () => {
  requestApi(
    "/likes",
    false,
    "get",
    {},
    {},
    function (rdata) {
      if (rdata.data.code == 1) {
        likeList.value = rdata.data.data;
        loadImage();
      }
    },
    function (error) {
      likeList.value = [];
      loadImage();
      snackbar(error.message);
    }
  );
};

const getLikeName = (name) => {
  return `${name.split(".")[0].split("_")[0]}/${name.split(".")[0].split("_")[1].split("p")[1]
    }`;
};

const loadImage = () => {
  for (let index = 0; index < 10; index++) {
    let imageNum = randomNumBoth(0, imageList.value.filename.length);
    let imageFilename = imageList.value.filename[imageNum];
    pictureList.value.push({
      filename: imageFilename,
      likes: likeList.value[imageFilename.split(".")[0]]
        ? likeList.value[imageFilename.split(".")[0]]
        : 0,
    });
  }
};

const likeImage = (item) => {
  let reqPath = getLikeName(item.filename);
  requestApi(
    `/likes/${reqPath}`,
    false,
    "post",
    {},
    {},
    function (rdata) {
      snackbar(rdata.data.msg);
      if (rdata.data.code == 1) {
        item.likes = rdata.data.data.likes;
      }
    },
    function (error) {
      snackbar(error.message);
    }
  );
};
</script>

<style>
@media screen and (max-width: 768px) {
  .hidden-xs {
    display: none;
  }
}
</style>
