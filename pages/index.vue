<template>
  <title>镜音的小窝</title>
  <v-container>
    <v-row dense>
      <v-col cols="12" xs="12" sm="6" md="5" lg="5" offset-lg="1">
        <h1 class="my-6 ml-1 justify text-primary">KagamineFans</h1>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" xs="12" sm="6" md="5" lg="4" offset-lg="1">
        <v-hover v-slot="{ isHovering, props }">
          <v-card :elevation="isHovering ? 12 : 1" v-bind="props" class="mb-2">
            <v-card-text>
              <h2>Hi, Kagamine's Fans!</h2>
              <v-divider class="mb-4 ma-4 justify"></v-divider>
              <p>
                欢迎来到镜音的小窝！本站由一位Kagamine
                Fans建立！欢迎访问“图片墙”、“留言板”等板块更详细的了解镜音
              </p>
              <p>
                镜音连是一位从后方短短的竖起金发、和以印有低音谱号的校服为主体服装的少年，他声音铿锵有力且富有青春期少年特有的活力
              </p>
              <p>
                镜音铃有着活力四射、俏丽动人的歌喉，带有大蝴蝶结的金发波波头，和以印有高音谱号的校服为主题的服装的少女
              </p>
              <p>
                镜音双子的称法已经被粉丝和部分创作者默认。但是“镜音双子”的说法属于二次设定，官方没有说明两人的关系。因此，铃与连在同人设定中的关系根据同人创作者的意愿决定，既可以被称为兄妹、姐弟，在cp向的作品里也会被当作恋人。
                <strong> 注意：在不同设定下刷其他同人设定是不礼貌的行为哦！ </strong>
              </p>
              <br /><br />
              <v-row dense>
                <v-col cols="7" md="8" lg="9">
                  <h2>好耶，你也是KagamineFans！</h2>
                  <v-divider class="mb-4 ma-4 justify"></v-divider>
                  <p>那快来试试这个网站吧！</p>
                  <p>你可以在这里留言、查看镜音的图片合集、观看镜音的演唱会</p>
                  <p>更多功能正在努力的开发中哦！</p>
                </v-col>
                <v-col cols="5" md="4" lg="3">
                  <v-img
                    src="https://img-1.llilii.cn/compression/vocaloid/kagamine/73611134_p7.jpg"
                  >
                  </v-img>
                </v-col>
              </v-row>
              <br /><br />
              <h2>想要联系作者？</h2>
              <v-divider class="mb-4 ma-4 justify"></v-divider>
              <p>
                Github：<a
                  class="text-accent"
                  target="_blank"
                  href="https://github.com/unknown-o/kagamine"
                  >unknown-o/kagamine</a
                >
              </p>
              <p>
                作者邮箱：<a class="text-accent" target="_blank" href="mailto:i@mr-wu.top"
                  >i@mr-wu.top</a
                >
              </p>
              <p>
                作者博客：<a
                  class="text-accent"
                  target="_blank"
                  href="https://www.wunote.cn"
                  >某咸鱼的笔记</a
                >
              </p>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="12" xs="12" sm="6" md="7" lg="6">
        <v-row dense>
          <v-col cols="12" sm="12" md="6" lg="6">
            <a
              target="_blank"
              ref="nofollow"
              href="https://mzh.moegirl.org.cn/%E9%95%9C%E9%9F%B3%E9%93%83%C2%B7%E8%BF%9E"
            >
              <v-hover v-slot="{ isHovering, props }">
                <v-card :elevation="isHovering ? 12 : 1" v-bind="props" class="mb-2">
                  <v-img
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.4)"
                    src="https://img-1.llilii.cn/compression/vocaloid/kagamine/47787519_p0.jpg"
                    cover
                  >
                    <v-card-title class="text-white">萌娘百科</v-card-title>
                  </v-img>
                </v-card>
              </v-hover>
            </a>
            <v-row dense>
              <v-col cols="6" xs="12">
                <router-link to="messages/">
                  <v-hover v-slot="{ isHovering, props }">
                    <v-card :elevation="isHovering ? 12 : 1" v-bind="props" class="mb-2">
                      <v-img
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.4)"
                        src="https://img-1.llilii.cn/compression/vocaloid/kagamine/53659035_p0.jpg"
                        cover
                      >
                        <v-card-title class="text-white">留言墙</v-card-title>
                      </v-img>
                    </v-card>
                  </v-hover>
                </router-link>
              </v-col>
              <v-col cols="6" xs="12">
                <router-link to="videos/">
                  <v-hover v-slot="{ isHovering, props }">
                    <v-card :elevation="isHovering ? 12 : 1" v-bind="props" class="mb-2">
                      <v-img
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.4)"
                        src="https://img-1.llilii.cn/compression/vocaloid/kagamine/53659035_p1.jpg"
                        cover
                      >
                        <v-card-title class="text-white">视频合集</v-card-title>
                      </v-img>
                    </v-card>
                  </v-hover>
                </router-link>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <router-link to="pictures/">
              <v-hover v-slot="{ isHovering, props }">
                <v-card :elevation="isHovering ? 12 : 1" v-bind="props" class="mb-2">
                  <v-img
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.4)"
                    src="https://img-1.llilii.cn/compression/vocaloid/kagamine/83375625_p0.png"
                    cover
                  >
                    <v-card-title class="text-white">图片墙</v-card-title>
                  </v-img>
                </v-card>
              </v-hover>
            </router-link>
            <v-hover v-slot="{ isHovering, props }">
              <a target="_blank" href="https://static-1.llilii.cn/web-app/kagamine-tap">
                <v-card :elevation="isHovering ? 12 : 1" v-bind="props" class="mb-2">
                  <v-img
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,0.0), rgba(0,0,0,0.4)"
                    src="https://img-1.llilii.cn/compression/vocaloid/kagamine/74444007_p0.jpg"
                    cover
                  >
                    <v-card-title class="text-white">KAGAMINE-TAP</v-card-title>
                  </v-img>
                </v-card>
              </a>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
