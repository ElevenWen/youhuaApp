<template>
	<div id="timer" v-if="timeData">
		<span class="hour">{{hour}}</span>:<span class="minute">{{minute}}</span>:<span class="second">{{second}}</span>
	</div>
</template>

<script>
	export default{
	    props:{
	        timeData:{
	            type: Number, //到期时间
	          },
	          calbackFn:{
		            type: Function
	          }
      },

    created(){
    this.reflash()
    },
    activated(){
      this.reflash()

    },
		data(){
	    return{
        hour: null,
        minute: null,
        second: null
      }
    },
		methods: {

      reflash(){
       // this.$emit('childMethod','childParam'); 一

        this.countDownTimer = setInterval(()=>{
          //获取服务器当前时间戳

          var nowTime = new Date().getTime()
          //到期时间与当前时间的时间差
          // var nMS = new Date(this.timeData-nowTime);
          var nMS = this.timeData-nowTime;
		
      //  //console.log(nMS, '什么')
      // //console.log(this.timeData-nowTime,'什么鬼')
		   
		   
		   
          if(nMS <= 0){
             this.hour = "00"
             this.minute = "00"
             this.second = "00"
            clearInterval(this.countDownTimer)
            this.countDownTimer = null

            //this.calbackFn()  二

            return
          }

          this.hour = Math.floor(nMS / 1000 / 60 / 60 )//时
          this.minute = Math.floor(nMS / 1000 / 60 % 60)//分
          this.second = Math.floor(nMS /1000 % 60)  //秒
//          this.minute = nMS.getMinutes();//分
//          this.second = nMS.getSeconds();//秒
          // //console.log(this.hour,'时')
          // //console.log(this.minute,'分')
          // //console.log(this.second,'秒')
          if(this.hour<10) this.hour="0"+this.hour;
          if(this.minute<10) this.minute="0"+this.minute;
          if(this.second<10) this.second="0"+this.second;

          if (this.hour==0&&this.minute==0&&this.second==0) {
            clearInterval(this.countDownTimer);
          }

        },1000)
      }

		},
    deactivated:function () {
      clearInterval(this.countDownTimer)
      this.countDownTimer = null
    },
		destroyed(){
			window.onscroll = null;
      clearInterval(this.countDownTimer)
			this.countDownTimer = null
		}
	}
</script>

<style lang="less"  scoped>
  // @rem:46.875rem;
	
  // #timer{
  //   width: 200/@rem;
  //   height: 30/@rem;
  //   & > span{
  //     background: #000000;
  //     color: #ffffff;
  //     padding: 0 12/@rem;
  //     border-radius: 3px;
  //   }
  // }
  #timer{
    width: 2.7027027027027026rem;
    height: 0.40540540540540543rem;
    & > span{
        background: #000000;
        color: #ffffff;
        padding: 0 0.16216216216216217rem;
        border-radius: 0.08108108108108109rem;
    }
  }

</style>
