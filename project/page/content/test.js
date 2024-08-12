    //转载请标注版权 Swiper中文网 www.swiper.com.cn
    lock = false;
	bgColor = ["rgb(179, 189, 196)","rgb(180, 183, 166)","rgb(140, 152, 187)"]; //背景色
    var mySwiper = new Swiper('.swiper-container',{
		   speed: 1300,
		   allowTouchMove: false,//禁止触摸滑动
		   parallax : true,  //文字位移视差
		   on:{
		     transitionStart: function(){
				 lock = true;//锁住按钮
			 	 slides = this.slides
				 imgBox = slides.eq(this.previousIndex).find('.img-box') //图片包装器
				 imgPrev = slides.eq(this.previousIndex).find('img')  //当前图片
				 imgActive = slides.eq(this.activeIndex).find('img')  //下一张图片
				 derection = this.activeIndex-this.previousIndex
				 this.$el.css("background-color",bgColor[this.activeIndex]);//背景颜色动画
				 
                 imgBox.transform('matrix(0.6, 0, 0, 0.6, 0, 0)');
				 imgPrev.transition(1000).transform('matrix(1.2, 0, 0, 1.2, 0, 0)');//图片缩放视差
				 this.slides.eq(this.previousIndex).find('h3').transition(1000).css('color','rgba(255,255,255,0)');//文字透明动画
				 
				 imgPrev.transitionEnd(function () {
				   imgActive.transition(1300).transform('translate3d(0, 0, 0) matrix(1.2, 0, 0, 1.2, 0, 0)');//图片位移视差
                   imgPrev.transition(1300).transform('translate3d('+60*derection+'%, 0, 0)  matrix(1.2, 0, 0, 1.2, 0, 0)');
                 });
             },
			 transitionEnd: function(){
                 this.slides.eq(this.activeIndex).find('.img-box').transform(' matrix(1, 0, 0, 1, 0, 0)');
				 imgActive = this.slides.eq(this.activeIndex).find('img')
				 imgActive.transition(1000).transform(' matrix(1, 0, 0, 1, 0, 0)');
				 this.slides.eq(this.activeIndex).find('h3').transition(1000).css('color','rgba(255,255,255,1)');
				 
				 imgActive.transitionEnd(function () {
				   lock = false
                 });
				 //第一个和最后一个，禁止按钮
				 if(this.activeIndex == 0){
					 this.$el.find('.button-prev').addClass('disabled');
				 }else{
					 this.$el.find('.button-prev').removeClass('disabled');
				 }
				 
				 if(this.activeIndex == this.slides.length - 1){
					 this.$el.find('.button-next').addClass('disabled');
				 }else{
					 this.$el.find('.button-next').removeClass('disabled');
				 }
             },
			 init:function(){
				 this.emit('transitionEnd');//在初始化时触发一次transitionEnd事件
		  	 },
		  
		  }
		});
		
	//不使用自带的按钮组件，使用lock控制按钮锁定时间
	mySwiper.$el.find('.button-next').on('click',function(){
		  if(!lock){
		    mySwiper.slideNext();
		  }
		})
	mySwiper.$el.find('.button-prev').on('click',function(){
		  if(!lock){
		    mySwiper.slidePrev();
		  }
		})	
        let items = document.querySelectorAll('.aside_item')
        const item_top = document.querySelector('.aside_item_top')
        // 返回顶部
        item_top.addEventListener('click', function (){
            document.documentElement.scrollTop = 0
        })
        // 用for循环实现跳转
        // let content = document.querySelectorAll('.content')
        // for(let i = 0;i < items.length; i++) {
        //     items[i].addEventListener('click', function (){
        //         let nul = document.querySelector('.aside_item.active')
        //         if(nul != null) {
        //             nul.classList.remove('active')
        //         }
        //         this.classList.add('active')
        //         document.documentElement.scrollTop = content[i+1].offsetTop
        //     })
        // }

        // 用自定义属性实现跳转
        const list = document.querySelector('.aside')
        list.addEventListener('click', function (e){
            let nul = document.querySelector('.aside_item.active')
                if(nul != null) {
                    nul.classList.remove('active')
                }
            if(e.target.tagName === 'DIV') {
                // console.log(e.target);
                let top = document.querySelector(`.content .${e.target.dataset.name}`)
                e.target.classList.add('active')
                document.documentElement.scrollTop = top.offsetTop
            }
        })

        // 页面滚动事件

        window.addEventListener('scroll', function(){
            let nul = document.querySelector('.aside_item.active')
                if(nul) {
                    nul.classList.remove('active')
                }
            // if(document.documentElement.scrollTop )
        })

        // 日期
        const date = new Date()
        let year = document.querySelector('.year')

        date.innerHTML = 
        setInterval(function (){

        },1000)
        // console.log(date);


