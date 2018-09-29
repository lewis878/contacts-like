<template>
  <div id="app">
    <h1>歌手列表</h1>
    <ul>
      <li v-for="group in singerList" class="list-group" ref="list-group">
        <h2 class="title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-item">
            <img :src="item.avatar" alt="" class="avatar" width="50" height="50">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="shortcut-list" @click="onShortcutClick">
      <li v-for="(item,index) in shortcutList"
          class="item"
          :class="{active: currentIndex === index}"
          :data-index="index"
      >{{item}}
      </li>
    </ul>
    <div class="fix-top" v-show="fixTop" ref="fix-top">{{fixTop}}</div>
  </div>
</template>

<script>
  import getData from './api/getData'
  import Velocity from 'velocity-animate'

  const TITLE_HEIGHT = 30

  class Singer {
    constructor({mid, name}) {
      this.mid = mid
      this.name = name
      this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${mid}.jpg?max_age=2592000`
    }
  }

  export default {
    name: 'App',
    data() {
      return {
        singerList: [],
        currentIndex: -1,
        pageYOffset: -1,
        flag: false,
        diff: -1
      }
    },
    computed: {
      shortcutList() {
        return this.singerList.map((item) => {
          return item.title.slice(0, 1)
        })
      },
      fixTop() {
        return this.singerList[this.currentIndex] ? this.singerList[this.currentIndex].title : ''
      }

    },
    created() {
      this._getData()
    },
    updated() {
      // console.log(this.$refs['list-group']);
      this.offsetList = this.$refs['list-group'].map((item) => {
        return item.offsetTop
      })
      window.onscroll = () => {
        if (this.flag) {
          return;
        }
        this.pageYOffset = window.pageYOffset || document.documentElement.offsetTop
      }

    },
    methods: {
      _getData() {
        getData().then((res) => {
          this.singerList = this._normalizeSinger(res.data.list)
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: '热门',
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < 10) {
            map.hot.items.push(new Singer({
              mid: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }

          let key = item.Findex;
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            mid: item.Fsinger_mid,
            name: item.Fsinger_name
          }))

        })

        let hot = []
        let rest = []
        for (let key in map) {
          let item = map[key];
          if (key === 'hot') {
            hot.push(item)
          } else if (key.match(/[a-zA-Z]/)) {
            rest.push(item)
          }
        }
        // 对rest排序（升序）
        rest.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))

        return hot.concat(rest)
      },
      _scrollTo() {
        let target = this.$refs['list-group'][this.currentIndex]
        let me = this
        Velocity(target, 'scroll', {
          begin() {
            me.flag = true
          },
          complete() {
            me.flag = false
          }
        })
      },
      onShortcutClick(e) {
        if (e.target.classList.contains('item')) {
          let index = parseInt(e.target.getAttribute('data-index'))
          this.currentIndex = index
          this._scrollTo()
        }
      }
    },
    watch: {
      pageYOffset(val) {
        if (val < this.offsetList[0]) {
          this.currentIndex = -1
          this.diff = -1
        }
        for (let i = 0; i < this.offsetList.length - 1; i++) {
          let offset1 = this.offsetList[i];
          let offset2 = this.offsetList[i + 1];
          if (val >= offset1 && val < offset2) {
            this.currentIndex = i
            this.diff = offset2 - val
          }
        }
        if (val >= this.offsetList[this.offsetList.length - 1]) {
          this.currentIndex = this.offsetList.length - 1
          this.diff = -1
        }
      },
      diff(val) {
        if (val > 0 && val <= TITLE_HEIGHT) {
          this.$refs['fix-top'].style.top = val - TITLE_HEIGHT + 'px'
          return
        }
        this.$refs['fix-top'].style.top = '0px'
      }
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
  $border-color: #e8e8e8;
  #app {
    > h1 {
      height: 44px;
      line-height: 44px;
      background-color: forestgreen;
      text-align: center;
      font-size: 20px;
      color: #fff;
      font-weight: 700;
    }
    .list-group {
      .title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        background: $border-color;
        font-size: 16px;
      }
      .list-item {
        display: flex;
        align-items: center;
        padding: 10px 0;
        margin: 0 20px;
        border-bottom: 1px solid $border-color;
        .avatar {
          border-radius: 50%;
        }
        .name {
          margin-left: 20px;
        }
      }
    }
    .shortcut-list {
      position: fixed;
      right: 2px;
      top: 50%;
      transform: translateY(-50%);
      .item {
        padding: 3px;
        text-align: center;
        line-height: 1;
        font-size: 14px;
        border-radius: 50%;
        &.active {
          background: forestgreen;
          color: #fff;
        }
      }
    }
    .fix-top {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      background: $border-color;
      font-size: 16px;
    }
  }
</style>
