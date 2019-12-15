import router from './router'
import {login} from './api/login'

router.beforeEach(async(to, from, next) => {
  next()
})
router.afterEach(() => {})


login().then(res=>{
  localStorage.setItem('token', res.data.token)
})
