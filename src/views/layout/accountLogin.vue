<template>
  <div class="accountLogin">
    <el-dialog title="账号登录" width="400px" :visible.sync="loginShow" :before-close="_close"
               :close-on-click-modal="false">
      <div class="list">
        <div class="cell-normal">
          <div class="cell-left">
            <img class="w-20" src="../../assets/phone.png" alt="">
          </div>
          <div class="cell-main">
            <input class="cell-input" type="number" v-model="mobile" placeholder="手机号码" autofocus="true">
          </div>
          <div class="cell-right">
            <img class="w-15" src="../../assets/del.png" alt="" @click="delPhone">
          </div>
        </div>
        <div class="cell-normal">
          <div class="cell-left">
            <img class="w-20" src="../../assets/lock.png" alt="">
          </div>
          <div class="cell-main">
            <input class="cell-input" type="password" v-model="password" placeholder="密码"
                   v-if="!passwordShow">
            <input class="cell-input" type="text" v-model="password" placeholder="密码" v-if="passwordShow">
          </div>
          <div class="cell-right">
            <div class="flex-row">
              <img class="w-15 h-15" src="../../assets/eye.png" alt="" v-if="!passwordShow"
                   @click="passwordShowOrNot">
              <img class="w-15 h-15" src="../../assets/eyeClose.png" alt="" v-if="passwordShow"
                   @click="passwordShowOrNot">
              <img class="w-15 h-15 m-l-10" src="../../assets/del.png" alt="" @click="delPassword">
            </div>
          </div>
        </div>
      </div>
      <button class="btn" @click="login(mobile,password)">登录</button>
      <div class="toRegOrRes">
        <span @click="_toReg">立即注册</span> / <span @click="_toRes">重置密码</span>
      </div>
    </el-dialog>
    <el-dialog title="账号注册" width="400px" :visible.sync="regShow" :before-close="_close" :close-on-click-modal="false">
      <div class="list">
        <div class="cell-normal">
          <div class="cell-left">
            <img class="w-20" src="../../assets/phone.png" alt="">
          </div>
          <div class="cell-main">
            <input class="cell-input" type="number" v-model="mobile" placeholder="请输入手机号码" autofocus="true">
          </div>
          <div class="cell-right">
            <img class="w-15" src="../../assets/del.png" alt="" @click="delPhone">
          </div>
        </div>
        <div class="cell-normal">
          <div class="cell-left">
            <img class="w-20" src="../../assets/code.png" alt="">
          </div>
          <div class="cell-main">
            <input class="cell-input" type="number" v-model="captcheCode" placeholder="请输入验证码">
          </div>
          <div class="p-r-10">
            <div class="code" @click="sendCode(1,mobile)">{{text}}</div>
          </div>
        </div>
        <div class="cell-normal">
          <div class="cell-left">
            <img class="w-20" src="../../assets/lock.png" alt="">
          </div>
          <div class="cell-main">
            <input class="cell-input" type="password" v-model="password" placeholder="请输入密码(至少六位)"
                   v-if="!passwordShow">
            <input class="cell-input" type="text" v-model="password" placeholder="请输入密码(至少六位)"
                   v-if="passwordShow">
          </div>
          <div class="cell-right">
            <div class="flex-row">
              <img class="w-15 h-15" src="../../assets/eye.png" alt="" v-if="!passwordShow"
                   @click="passwordShowOrNot">
              <img class="w-15 h-15" src="../../assets/eyeClose.png" alt="" v-if="passwordShow"
                   @click="passwordShowOrNot">
              <img class="w-15 h-15 m-l-10" src="../../assets/del.png" alt="" @click="delPassword">
            </div>
          </div>
        </div>
        <div class="cell-normal">
          <div class="w-40"></div>
          <div class="cell-main">
            <input class="cell-input" type="text" v-model="companyName" placeholder="请输入企业名称">
          </div>
        </div>
        <div class="cell-normal">
          <div class="w-40"></div>
          <div class="cell-main">
            <input class="cell-input" type="text" v-model="realName" placeholder="请输入联系人">
          </div>
        </div>
      </div>
      <button class="btn" @click="reg">注册并登录</button>
      <div class="toRegOrRes">
        已有账号，请直接 <span @click="_toLogin">登录</span>
      </div>
    </el-dialog>
    <el-dialog title="重置密码" width="400px" :visible.sync="resShow" :before-close="_close" :close-on-click-modal="false">
      <div class="list">
        <div class="cell-normal">
          <div class="cell-left">
            <img class="w-20" src="../../assets/phone.png" alt="">
          </div>
          <div class="cell-main">
            <input class="cell-input" type="number" v-model="mobile" placeholder="请输入手机号码" autofocus="true">
          </div>
          <div class="cell-right">
            <img class="w-15" src="../../assets/del.png" alt="" @click="delPhone">
          </div>
        </div>
        <div class="cell-normal">
          <div class="cell-left">
            <img class="w-20" src="../../assets/code.png" alt="">
          </div>
          <div class="cell-main">
            <input class="cell-input" type="number" v-model="captcheCode" placeholder="请输入验证码">
          </div>
          <div class="p-r-10">
            <div class="code" @click="sendCode(3,mobile)">{{text}}</div>
          </div>
        </div>
        <div class="cell-normal">
          <div class="cell-left">
            <img class="w-20" src="../../assets/lock.png" alt="">
          </div>
          <div class="cell-main">
            <input class="cell-input" type="password" v-model="password" placeholder="请输入密码(至少六位)"
                   v-if="!passwordShow">
            <input class="cell-input" type="text" v-model="password" placeholder="请输入密码(至少六位)"
                   v-if="passwordShow">
          </div>
          <div class="cell-right">
            <div class="flex-row">
              <img class="w-15 h-15" src="../../assets/eye.png" alt=""
                   v-show="!passwordShow" @click="passwordShowOrNot">
              <img class="w-15 h-15" src="../../assets/eyeClose.png" alt=""
                   v-show="passwordShow" @click="passwordShowOrNot">
              <img class="w-15 h-15 m-l-10" src="../../assets/del.png" alt="" @click="delPassword">
            </div>
          </div>
        </div>
      </div>
      <button class="btn" @click="reset">提交</button>
    </el-dialog>
  </div>
</template>

<script>
  import {login, reg, reset} from '@/api/login'
  import {validatPhone} from '@/utils/validate'
  import axios from 'axios'
  import {baseUrl} from '@/utils/fetch'
  import {Message} from 'element-ui'
  import Qs from 'qs'
  export default {
    name: 'accountLogin',
    data(){
      return {
        mobile: '',
        password: '',
        passwordShow: false,
        captcheCode: '',
        companyName: '',
        realName: '',
        text: '获取'
      }
    },
    props: {
      loginShow: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      regShow: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      resShow: {
        type: Boolean,
        default: function () {
          return false
        }
      },
    },
    created(){

    },
    methods: {
      _close: function () {
        this.$emit('close');
      },
      _toLogin: function () {
        this.$emit('toLogin');
      },
      _toReg: function () {
        this.$emit('toReg');
      },
      _toRes: function () {
        this.$emit('toRes');
      },
      sendCode(type, mobile) {
        /*获取验证码*/
        if (!mobile) {
          alert("请输入手机号");
          return
        }
        if (!validatPhone(mobile)) {
          alert("请输入正确的手机号");
        }
        var c = 59;
        this.text = "60s";
        var _this = this;
        var t = setInterval(function () {
          _this.text = c + "s";
          if (c == 0) {
            clearInterval(t);
            c = 60;
            _this.text = '获取';
          }
          c--;
        }, 1000);
        axios.post(baseUrl + '/api/captcha/sendSMS', Qs.stringify({
          mobile: mobile,
          type: +type
        })).then(function (res) {
          if (res.status == 200) {
            if (res.data.statusCode != 200) {
              Message({
                message: res.data.message,
                type: 'error',
                duration: 3 * 1000
              })
              clearInterval(t);
              c = 60;
              _this.text = '获取';
            }
          } else {
            Message({
              message: res.statusText,
              type: 'error',
              duration: 3 * 1000
            })
            clearInterval(t);
            c = 60;
            _this.text = '获取';
          }
        }).catch(function (error) {
          Message({
            message: error.message,
            type: 'error',
            duration: 3 * 1000
          })
          clearInterval(t);
          c = 60;
          _this.text = '获取';
        })

      },
      delPhone(){
        this.mobile = '';
      },
      delPassword(){
        this.password = '';
      },
      passwordShowOrNot(){
        this.passwordShow = !this.passwordShow;
      },
      login(){
        var _this = this;
        return login(this.mobile, this.password, function () {
          _this._close();
        })
      },
      reg(){
        var _this = this;
        return reg({
          mobile: this.mobile,
          password: this.password,
          captcheCode: this.captcheCode,
          companyName: this.companyName,
          realName: this.realName
        }, function () {
          _this._close();
        })
      },
      reset(){
        var _this = this;
        return reset(this.mobile, this.password, this.captcheCode, function () {
          _this._close();
        })
      }
    }

  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .btn {
    width: 100%;
    height: 0.35rem;
    background: #1b284f;
    color: #fff;
    border: none;
    border-radius: 0.05rem;
    margin-top: 0.4rem;
  }

  .toRegOrRes {
    margin: 0.2rem 0 0.05rem;
    text-align: right;
    color: #999999;
    span {
      color: #1b284f;
      cursor: pointer;
    }
  }

  .code {
    height: 100%;
    line-height: 0.25rem;
    color: #1b284f;
    cursor: pointer;
    border: 1px dashed #1b284f;
    -webkit-border-radius: 0.03rem;
    -moz-border-radius: 0.03rem;
    border-radius: 0.03rem;
    padding: 0 0.1rem;
  }
</style>
