<template>
  <div class="page">
    <el-header>
      <div>
        head
        <div class="login-register">
          <router-link to="/login">登录</router-link>/
          <router-link to="/register">注册</router-link>
        </div>
      </div>
    </el-header>
    <div class="blogs-advertising">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in itemList" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div>
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;" class="open-close">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo catagory" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-menu-item v-for="cate in categoryList" :key="cate" :index="cate.index">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ cate.category }}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="article">
      <template>
        <div class="infinite-list-wrapper" style="overflow:auto">
          <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled">
            <li v-for="i in count" class="list-item">{{ i }}</li>
          </ul>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: true,
        itemList: ["广告位招租","广告位招租","广告位招租","广告位招租","广告位招租","广告位招租"],
        categoryList:[{
          category: "分类一",
          index: 1
        },{
          category: "分类二",
          index: 2
        },{
          category: "分类三",
          index: 3
        },{
          category: "分类四",
          index: 4
        }],
        count: 10,
        loading: false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      load () {
        this.loading = true
        setTimeout(() => {
          this.count += 2
          this.loading = false
        }, 2000)
      }
    },
    computed: {
      noMore () {
        return this.count >= 20
      },
      disabled () {
        return this.loading || this.noMore
      }
    }
  }
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .open-close {
    position: fixed;
    top: 70px;
    left: 5px;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
  }
  .catagory {
    position: fixed;
    top:110px;
  }
  .login-register {
    position: fixed;
    top: 0px;
    right: 10px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .blogs-advertising {
    width: 60%;
    position: fixed;
    left: 300px;
    top:90px;
  }
  .article {
    position: fixed;
    top:350px;
    left: 300px;
  }
  .page {
    height: 100%;
  }
</style>
