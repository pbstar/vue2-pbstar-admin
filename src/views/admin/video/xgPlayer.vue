<template>
  <div>
    <div class="box">
      <h3>西瓜播放器官网：https://v2.h5player.bytedance.com/gettingStarted/</h3>
      <div ref="playerDom" class="player"></div>
      <div class="btnBox">
        <el-button type="primary" @click="toChangeLastPlayTime"
          >从第10秒开始播放</el-button
        >
        <el-button type="primary" @click="toChangeIsPlayerPause">{{
          this.isPlayerPause ? "视频继续" : "视频暂停"
        }}</el-button>
        <el-button type="primary" @click="toChangeIsDanmuPause">{{
          this.isDanmuPause ? "弹幕继续" : "弹幕暂停"
        }}</el-button>
        <el-button type="primary" @click="toSendDanmu"
          >发送一条新弹幕</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Player from "xgplayer";
export default {
  name: "adminVideoXgPlayer",
  data() {
    return {
      player: "",
      playerConfig: {
        lastPlayTime: 0,
        lastPlayTimeHideDelay: 0,
        danmuList: [
          {
            duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
            id: "1", //弹幕id，需唯一
            start: 2000, //弹幕出现时间，毫秒
            txt: "长弹幕长弹1幕长弹幕长弹幕长1弹幕长弹幕长弹1幕长弹幕长弹幕长弹幕",
          },
          {
            duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
            id: "2", //弹幕id，需唯一
            start: 3000, //弹幕出现时间，毫秒
            txt: "长弹幕长2弹幕长弹幕长2弹幕长弹幕长弹2幕长弹幕长弹幕长弹幕长弹幕",
          },
          {
            duration: 15000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
            id: "3", //弹幕id，需唯一
            start: 4000, //弹幕出现时间，毫秒
            txt: "长弹幕3长弹幕长3弹幕长3弹幕长弹幕3长弹幕长弹幕长弹幕长弹幕长弹幕",
          },
        ],
        autoplay: false,
      },
      isDanmuPause: true,
      currentTime: 0,
      isPlayerPause: true,
    };
  },
  mounted() {
    this.toCreatePlayer();
  },
  beforeDestroy() {
    if (this.player) {
      this.player.destroy();
    }
  },
  methods: {
    toCreatePlayer() {
      if (this.player) {
        this.player.destroy();
      }
      this.player = new Player({
        el: this.$refs.playerDom,
        url: "http://oss.mcweb.club/video/xgplayer.mp4",
        poster: "http://oss.mcweb.club/img/xgplayer.jpg",
        volume: 0.6,
        width: 600,
        height: 337.5,
        playbackRate: [0.5, 0.75, 1, 1.5, 3, 5],
        defaultPlaybackRate: 1,
        lastPlayTime: this.playerConfig.lastPlayTime,
        lastPlayTimeHideDelay: this.playerConfig.lastPlayTimeHideDelay,
        danmu: {
          comments: this.playerConfig.danmuList,
        },
        autoplay: this.playerConfig.autoplay,
      });
      this.player.on("timeupdate", (e) => {
        this.currentTime = Number(e.currentTime.toFixed(2));
      });
      this.player.on("play", (e) => {
        if (this.isDanmuPause) this.isDanmuPause = false;
        if (this.isPlayerPause) this.isPlayerPause = false;
      });
      this.player.on("pause", (e) => {
        if (!this.isDanmuPause) this.isDanmuPause = true;
        if (!this.isPlayerPause) this.isPlayerPause = true;
      });
    },
    toChangeLastPlayTime() {
      this.playerConfig.lastPlayTime = 10;
      this.playerConfig.lastPlayTimeHideDelay = 3;
      this.playerConfig.autoplay = true;
      this.toCreatePlayer();
      this.player.play();
    },
    toChangeIsDanmuPause() {
      this.isDanmuPause = !this.isDanmuPause;
      if (this.isDanmuPause) {
        this.player.danmu.pause();
      } else {
        this.player.danmu.play();
      }
    },
    toSendDanmu() {
      this.player.danmu.sendComment({
        duration: 15000,
        id: this.playerConfig.danmuList.length + 1,
        start: this.currentTime * 1000,
        txt: "新的弹幕内容" + (this.playerConfig.danmuList.length + 1),
      });
    },
    toChangeIsPlayerPause() {
      if (this.isPlayerPause) {
        this.player.play();
      } else {
        this.player.pause();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  background-color: #fff;
  margin: 10px;
  padding: 10px;
  min-height: calc(100% - 20px);
  .player {
    margin: 10px 0;
  }
}
</style>