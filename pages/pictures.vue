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

    <v-row v-if="imageList" style="max-width: 800px; margin: auto" dense>
      <v-col cols="6">
        <div v-for="(picture, index) in pictureList">
          <a
            v-if="index % 2 === 0"
            target="_blank"
            :href="`${basePath.origin}/${picture}`"
          >
            <v-hover v-slot="{ isHovering, props }">
              <v-card :elevation="isHovering ? 12 : 1" v-bind="props" class="mb-2">
                <v-img
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.4)"
                  v-bind:src="`${basePath.compression}/${picture}`"
                  cover
                >
                  <v-card-title class="text-white">{{ picture }}</v-card-title>
                </v-img>
              </v-card>
            </v-hover>
          </a>
        </div>
      </v-col>
      <v-col cols="6">
        <div v-for="(picture, index) in pictureList">
          <a
            v-if="index % 2 === 1"
            target="_blank"
            :href="`${basePath.origin}/${picture}`"
          >
            <v-hover v-slot="{ isHovering, props }">
              <v-card :elevation="isHovering ? 12 : 1" v-bind="props" class="mb-2">
                <v-img
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.4)"
                  v-bind:src="`${basePath.compression}/${picture}`"
                  cover
                >
                  <v-card-title class="text-white">{{ picture }}</v-card-title>
                </v-img>
              </v-card>
            </v-hover>
          </a>
        </div>
      </v-col>
      <v-col cols="12" align="center" justify="center">
        <v-btn @click="loadImage">Load More</v-btn>
      </v-col>
    </v-row>
    <v-row v-else class="fill-height ma-0" align="center" justify="center">
      <v-progress-circular
        style="height: 60vh"
        :size="50"
        color="amber"
        indeterminate
      ></v-progress-circular>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { requestApi, randomNumBoth } from "../plugins/common";
import { ref } from "vue";

let pictureList = ref([]);
let imageList = ref(null);
let basePath = reactive({ compression: "", origin: "" });
const getImageList = () => {
  fetch("https://img-1.llilii.cn/imglist/kagamine.json")
    .then((response) => response.json())
    .then((data) => {
      imageList.value = data;
      basePath.origin = data.base_url.origin.private;
      basePath.compression = data.base_url.compression.private;
    })
    .catch((error) => console.log(error));
};
getImageList();

const loadImage = () => {
  for (let index = 0; index < 10; index++) {
    let imageNum = randomNumBoth(0, imageList.value.filename.length);
    let imageFilename = imageList.value.filename[imageNum];
    pictureList.value.push(imageFilename);
  }
};
</script>
