import router from './router'
import {login} from './api/login'
import {getUserInfo} from './api/my'

router.beforeEach(async(to, from, next) => {
  next()
})
router.afterEach(() => {})

  // login().then(res=>{
  //   console.log(res)
  //   localStorage.setItem('token',res.data.token)
  // })
  if(window.location.href.indexOf("token=")>-1){
    localStorage.setItem('token',window.location.href.split("token=")[1].split("&")[0])
    getUserInfo().then(res=>{
      console.log('用户信息',res.data.id)
      localStorage.setItem('userId',res.data.id)
    })
  }
  if(window.location.href.indexOf("platformId=")>-1){
    localStorage.setItem('platformId',window.location.href.split("platformId=")[1].split("&")[0])
  }
  if(window.location.href.indexOf("parentId=")>-1){
    localStorage.setItem('parentId',window.location.href.split("parentId=")[1].split("&")[0])
  }


