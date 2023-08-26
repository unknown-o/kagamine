<template>
  <title>MessageBoard - KagamineFans</title>
  <v-container>
    <v-row dense>
      <v-col cols="12" xs="12" sm="6" md="5" lg="5" offset-lg="1">
        <h1 class="my-6 ml-1 justify text-primary">
          <router-link to="/">
            <v-btn class="text-yellow-accent-4" variant="text">
              <v-icon size="25">mdi-arrow-left</v-icon>
            </v-btn>
          </router-link>
          MessageBoard
        </h1>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" xs="12" sm="4" lg="3" offset-lg="1">
        <v-hover v-slot="{ isHovering, props }">
          <v-card :elevation="isHovering ? 12 : 1" v-bind="props" class="mb-2">
            <v-card-text>
              <div class="ma-3 justify">
                <h2>提交留言</h2>
                <v-divider class="my-4 justify"></v-divider>
                <v-text-field
                  label="Your Nickname..."
                  v-model="submitForm.nickname"
                  required
                ></v-text-field>
                <v-text-field
                  label="Your E-mail..."
                  v-model="submitForm.email"
                  required
                ></v-text-field>
                <v-textarea
                  outlined
                  name="input-7-4"
                  v-model="submitForm.message"
                  label="You Want To Say..."
                >
                </v-textarea>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn class="ma-3" @click="send">发射！</v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>

        <v-hover v-slot="{ isHovering, props }">
          <v-card :elevation="isHovering ? 12 : 1" v-bind="props" class="mb-2">
            <v-card-text>
              <div class="ma-3 justify">
                <h2>显示设置</h2>
                <v-divider class="my-4 justify"></v-divider>
                <v-select
                  v-model="sortValue"
                  :items="sortText"
                  label="排序方式"
                ></v-select>
              </div>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="12" xs="12" sm="8" lg="7">
        <v-row
          v-if="messageList.length == 0"
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            :size="50"
            color="amber"
            indeterminate
          ></v-progress-circular>
        </v-row>
        <div v-for="item in messageList">
          <v-hover v-slot="{ isHovering, props }">
            <v-card :elevation="isHovering ? 12 : 1" v-bind="props" class="mb-2">
              <v-card-title>{{ item.nickname }}</v-card-title>
              <v-card-subtitle>{{ formatDate(item.timestamp * 1000) }}</v-card-subtitle>
              <v-card-text>
                {{ item.message }}
              </v-card-text>
              <v-card-actions class="justify-end">
                <p v-if="item.status < 1">未经审核的</p>
                <v-btn
                  size="small"
                  :data-message-id="item.id"
                  @click="like"
                  class="text-red"
                  variant="text"
                  icon="mdi-heart"
                ></v-btn>
                <p style="font-size: 1px">{{ item.likes }}</p>
                <v-btn
                  size="small"
                  :data-message-id="item.id"
                  @click="report"
                  class="text-yellow-accent-4"
                  variant="text"
                  icon="mdi-alert"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <UCaptcha ref="captchaRef"></UCaptcha>
  <VuetifySnackbar ref="snackbarRef"></VuetifySnackbar>
</template>

<script lang="ts" setup>
import { requestApi, formatDate } from "../plugins/common";
import { ref, reactive, watch } from "vue";
import UCaptcha from "../components/UCaptcha.vue";
import VuetifySnackbar from "../components/VuetifySnackbar.vue";
let captchaRef = ref();
let snackbarRef = ref();
const getCaptcha = function (callback: any) {
  captchaRef.value?.getCaptcha(callback);
};
const snackbar = function (text = "this is a message!", timeout = 3000, color = "black") {
  snackbarRef.value?.show(text, timeout, color);
};
let messageList = ref([]);
let submitForm = reactive({
  nickname: "",
  email: "",
  message: "",
});
let sortValue = ref("Likes");
const sortText = ref(["Likes", "Send Time", "Random"]);
const sortItem = { Likes: "likes", "Send Time": "time", Random: "random" };
watch(
  () => sortValue.value,
  (newValue) => {
    getMessages(sortItem[newValue], 20, 0);
  }
);

const getMessages = (sort = "likes", limit = 20, offset = 0, showUnaudited = false) => {
  messageList.value = [];
  requestApi(
    "/messages",
    false,
    "get",
    {
      sort: sort,
      limit: limit,
      offset: offset,
      show_unaudited: showUnaudited,
    },
    {},
    function (rdata) {
      if (rdata.data.code == 1) {
        messageList.value = rdata.data.data;
      } else {
        snackbar(rdata.data.msg);
      }
    },
    function (error) {
      snackbar(error.message);
    }
  );
};
getMessages();

const send = () => {
  getCaptcha(function (token, timestamp) {
    requestApi(
      "/messages",
      {
        token: token,
        timestamp: timestamp,
      },
      "post",
      {},
      {
        nickname: submitForm.nickname,
        email: submitForm.email,
        message: submitForm.message,
      },
      function (rdata) {
        snackbar(rdata.data.msg);
      },
      function (error) {
        snackbar(rdata.data.message);
      }
    );
  });
};

const like = (e) => {
  let messageId = e.currentTarget.dataset.messageId;
  getCaptcha((token, timestamp) => {
    requestApi(
      `/messages/like/${messageId}`,
      {
        token: token,
        timestamp: timestamp,
      },
      "post",
      {},
      {},
      function (rdata) {
        if (rdata.data.code == 1) {
          let messagesNew = [];
          messageList.value.forEach((element) => {
            if (element.id == messageId) {
              element.likes = rdata.data.data.likes;
            }
            messagesNew.push(element);
          });
          messageList.value = messagesNew;
        }
        snackbar(rdata.data.msg);
      },
      function (error) {
        snackbar(rdata.data.message);
      }
    );
  });
};

const report = (e) => {
  let messageId = e.currentTarget.dataset.messageId;
  getCaptcha(function (token, timestamp) {
    requestApi(
      "/messages/report/" + messageId,
      {
        token: token,
        timestamp: timestamp,
      },
      "post",
      {},
      {},
      function (rdata) {
        snackbar(rdata.data.msg);
      },
      function (error) {
        snackbar(rdata.data.message);
      }
    );
  });
};
</script>
