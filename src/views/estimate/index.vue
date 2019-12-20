<template>
  <div class='estimate'>
    <div class='header'>
        <div class='header-top flex'>
            <div>可提现<span class='header-top-money'>{{money}}</span>元</div>
            <div class='towithdraw flex' ><span>去提现</span><img class='header-top-img' src="" /></div>
        </div>
        <div class='header-bottom flex'>
            <div class='header-bottom-item'>
            <div class='header-bottom-item-money'><span>{{money}}</span></div>
            <div class='header-bottom-item-text'><span>今日收益(元)</span></div>
            </div>
            <div class='header-bottom-item middle'>
            <div class='header-bottom-item-money'><span>{{money}}</span></div>
            <div class='header-bottom-item-text'><span>累计收益(元)</span></div>
            </div>
            <span class='header-bottom-item'>
            <div class='header-bottom-item-money'><span>{{money}}</span></div>
            <span class='header-bottom-item-text'><span>账户余额(元)</span></span>
            </span>
        </div>
    </div>
    <div class='earnings flex'>
        <span>收益明细</span>
        <div class='earnings-text flex'>
            <span>结算说明</span><img class='earnings-img' src='' />
        </div>
    </div>
    <div class='chosetime flex'>
        <div class='chosetime-time flex'>
            <div class='flex' @click="select">
              <span class=''>本月</span>
              <img class='chosetime-img' src='' />
            </div>
        </div>
        <div class='chosetime-text'>
          <span>本月累计收益：0元</span>
        </div>
    </div>
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    class="people"
    >
    <div class='people-item flex'>
        <div class='flex'>
            <Image class='people-item-img' src="" />
            <div class='people-item-text'>
            <div class='people-item-text-name'><span>1</span></div> 
            <div class='people-item-text-time'><span>2</span></div> 
            </div>
        </div>
        <div class='people-item-text'>
            <div class='people-item-text-count'><span>+ 3</span></div> 
            <div class='people-item-text-status'><span>4</span></div> 
        </div>
    </div>  
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'estimate',

  data () {
    return {
        list: [],
        loading: false,
        finished: false,
        money:0,
        show: false,
        actions: [
            { name: '选项' },
            { name: '选项' },
            { name: '选项', subname: '描述信息' }
        ]
    }
  },

  methods: {
    select(){
        this.show = true;
    },
    onSelect(item) {
        // 默认情况下，点击选项时不会自动关闭菜单
        // 可以通过 close-on-click-action 属性开启自动关闭
        this.show = false;
    },
    onLoad() {
        // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 80) {
          this.finished = true;
        }
      }, 500);
    },
  }
}
</script>

<style lang='less' scoped>
.estimate{
    .flex{
        display: flex;
        align-items: center;
    }
    .header{
        background-color: #FFDB29;
        padding: 0 25px;
        &-top{
            justify-content: space-between;
            font-size:32px;
            font-weight:bold;
            color:rgba(0,0,0,1);
            line-height:26px;
            padding: 40px 0;
            border-bottom: 1px solid rgba(0,0,0,.1);
            &-money{
                font-family:DINOT;
                font-size: 36px;
            }
            &-img{
                width:6px;
                height:11px;
                margin-left: 8px;
            }
            .towithdraw{
                background:rgba(255,255,255,1);
                border-radius:24px;
                font-size:24px;
                color:rgba(1,1,1,1);
                line-height:26px;
                padding: 10px 15px;
            }
        }
        &-bottom{
            justify-content: space-between;
            padding: 40px 0;
            &-item{
                flex: 1;
                text-align: center;
                &-money{
                    font-size:42px;
                    font-family:DINOT;
                    font-weight:bold;
                    color:rgba(0,0,0,1);
                    padding-bottom: 22px;
                }
                &-text{
                    font-size:26px;
                    font-family:PingFang SC;
                    font-weight:500;
                    color:rgba(0,0,0,1);
                    line-height:26px;
                }
            }
            .middle{
                border-left: 1px solid rgba(0,0,0,.1);
                border-right: 1px solid rgba(0,0,0,.1);
            }
        }
    }
    .earnings{
        font-size:32px;
        font-weight:bold;
        color:rgba(0,0,0,1);
        line-height:26px;
        justify-content: space-between;
        padding: 50px 25px;
        background-color: #ffffff;
        &-text{
            font-size:28px;
            color:rgba(100,166,255,1); 
        }
        &-img{
            width:28px;
            height:28px; 
            margin-left: 10px;
        }
    }
    .chosetime{
        padding: 15px 30px;
        justify-content: space-between;
        background-color: rgba(245,245,245,1);
        &-time{
            background:rgba(255,255,255,1);
            border-radius:60px; 
            padding: 16px 25px;
            font-size:28px;
            color:rgba(0,0,0,1);
            line-height:26px; 
        }
        &-img{
            width:8px;
            height:6px;
            margin-left: 20px;
            line-height: 0;
        }
        &-text{
            font-size:28px;
            color:rgba(102,102,102,1);
            line-height:26px;
        }
    }
    .people{
        background-color: #ffffff;
        padding: 0 30px;
        &-item{
            padding: 34px 0;
            border-bottom: 1px solid rgba(235,238,240,.9);
            justify-content: space-between;
            &-img{
                width:92px;
                height:92px;
                background:rgba(235,235,235,1);
                border:2px solid rgba(0, 0, 0, 0.13);
                border-radius:50%;
                margin-right: 30px;
            }
            &-text{
                &-name{
                    font-size:32px;
                    font-weight:800;
                    color:rgba(0,0,0,1);
                    line-height:26px;
                }
                &-time{
                    font-size:24px;
                    font-weight:500;
                    color:rgba(102,102,102,1);
                    line-height:26px;
                    padding-top: 20px;
                }
                &-count{
                    font-size:36px;
                    font-weight:800;
                    color:rgba(255,171,99,1);
                    line-height:26px;
                }
                &-status{
                    font-size:24px;
                    color:rgba(179,179,179,1);
                    line-height:26px;
                    padding-top: 20px;
                    text-align: right;
                }
            }
        }
        .nopeople{
            text-align: center;
            color: #666;
            padding-top: 60px;
            font-size: 30px;
        }
    }
}
</style>
