<template>
  <div>
    <div v-if="this.$cookies.get('user') == null">
      <my-head></my-head>
    </div>
    <div v-else="this.$cookies.get('user') != null">
      <my-head1></my-head1>
    </div>
    <template>
      <div class="update-write">
        <router-link to="/write">
          <el-button type="danger" @click="sendDoc()" round>发布文章</el-button>
        </router-link>
      </div>
      <div class="write-from">
        <el-form ref="form" :model="form" label-width="80px" label-position="right">
          <el-form-item label="文章标题" prop="name" class="title-input">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="分类" prop="category" class="category-input">
            <el-select v-model="form.category" placeholder="请选择文章分类" class="category-e-i">
              <el-option v-for="cate in categoryList" :key="cate.categoryId" :label="cate.categoryName"
                         :value="cate.categoryId" @click="getcid($event)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签" prop="tag" class="tag-input">
            <el-select v-model="form.tag" placeholder="请选择文章标签" class="tag-e-i">
              <el-option v-for="t in tagList" :key="t.id" :label="t.name"
                         :value="t.id" :onclick="tid=t.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章描述" prop="name" class="desc-input">
            <el-input v-model="form.des"></el-input>
          </el-form-item>
        </el-form>
        <!--
            @save: 按下 ctrl + s 时触发
            @change: 当值发生改变时 触发
        -->
        <mavon-editor
          @save="saveDoc"
          @change="updateDoc"
          ref="editor"
          v-model="doc"
          class="mk-page">
        </mavon-editor>
      </div>
    </template>
  </div>
</template>

<script>
  import {mavonEditor} from "mavon-editor";
  import "mavon-editor/dist/css/index.css";
  import axios from "axios";
  export default {
    name: "Create",
    components: {mavonEditor},
    data() {
      return {
        doc: "",
        form: {
          title: '',
          des: '',
          category: '',
          tag: ''
        },
        categoryList: [],
        tagList: [],
        article: '',
        tid: ''
      };
    },
    methods: {
      updateDoc(markdown, html) {
        // 此时会自动将 markdown 和 html 传递到这个方法中
        console.log("markdown内容: " + markdown);
        console.log("html内容:" + markdown);
      },
      saveDoc(markdown, html) {
        // 此时会自动将 markdown 和 html 传递到这个方法中
        console.log("markdown内容:" + markdown);
        console.log("html内容:" + html);
      },
      getcid() {
        var target1 = event.target || window.event.srcElement
        //获取对应元素的id值
        alert(111)
        var text1 = target1.getAttribute('src');
        console.log("key----------------"+text1);
      },
      sendDoc() {
        let html = this.$refs.editor.d_render;
        alert(html);
        alert(this.tid)
        axios.post("http://localhost:8080/Create",{
          html: html
        }).then(res => {
          this.article = res.data;
        })
        axios.post("http://localhost:8080/SaveArticle", {
          title: this.form.title,
          categoryId: this.categoryList.categoryId,
          tagId: this.tagList.id,
          des: this.form.des,
          author: this.$cookies.get("user"),
          article: this.article
        }).then(res => {
            if (res.data === "success") {
              this.$message({
                message: '发布成功',
                type: 'success'
              });
            } else {
              this.$message.error('发布失败');
            }
        })
      }
    },
    created() {
      axios.get("http://localhost:8080/Categorys").then(res => {
        console.log("data: " + res.data)
        this.categoryList = res.data;
      })
      axios.get("http://localhost:8080/Tags").then(res => {
        console.log("data: " + res.data)
        this.tagList = res.data;
      })
    },
  }
</script>

<style>
  .update-write {
    position: fixed;
    right: 200px;
    top: 10px;
  }

  .mk-page {
    top: 120px;
    height: 550px;
    width: 80%;
    margin: 0px auto 0px auto;
  }

  .title-input {
    width: 500px;
    position: fixed;
    top: 70px;
    left: 150px;
  }

  .tag-input {
    width: 300px;
    position: fixed;
    top: 70px;
    right: 150px;
  }
  .category-input {
    width: 300px;
    position: fixed;
    top: 70px;
    right: 550px;
  }

  .desc-input {
    width: 80%;
    position: fixed;
    top: 120px;
    left: 150px;
  }

  .tag-e-i {
    width: 200px;
  }
  .category-e-i {
    width: 200px;
  }
</style>
