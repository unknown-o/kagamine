<template>
  <div class="text-center">
    <v-snackbar v-model="snackbar" :timeout="snackbarTimeout" multi-line>
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  setup() {
    let snackbar = ref(false);
    let snackbarTimeout = ref(0);
    let snackbarText = ref("test");
    function show(text: string, timeout = 3000, color = "blue") {
      snackbar.value = true;
      snackbarTimeout.value = timeout;
      snackbarText.value = text;
      return true;
    }
    return { show, snackbar, snackbarTimeout, snackbarText };
  },
};
</script>
