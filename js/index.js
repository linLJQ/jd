/**
 * Created by Administrator on 2016/8/9.
 */

window.onload=function(){
    search();
    scrollPic();
    secondKill();
};

/*头部搜索*/
var search=function(){
    var search=document.getElementsByClassName('jd_header_box')[0];/*搜索对象*/
    var banner=document.getElementsByClassName('jd_banner')[0];/*banner对象*/
    var height=banner.offsetHeight;/*高度*/
    window.onscroll=function(){
        var top=document.body.scrollTop;
        /*当滚动高度大于banner的高度时候颜色不变*/
        if(top>height){
            search.style.background="rgba(201,21,35,0.85)";
        }else{
            var op=top/height*0.85;
            search.style.background="rgba(201,21,35,"+op+")";
        }
    }
};
/*秒杀倒计时*/
var secondKill=function(){
    /*复盒子*/
    var parentTime=document.getElementsByClassName('sk_time')[0];
    /*span时间*/
    var timeList=parentTime.getElementsByClassName('num');
    /*console.log(timeList.length);*/
    var times=8*60*60;
    var timer=setInterval(function(){
        if(times>0){
            times--;
            var h=Math.floor(times/(60*60));
            var m=Math.floor(times/60%60);
            var s=times%60;
            //console.log(h+'-'+m+'-'+s);
            timeList[0].innerHTML=h>=10?Math.floor(h/10):0;
            timeList[1].innerHTML=h%10;

            timeList[2].innerHTML=m>=10?Math.floor(m/10):0;
            timeList[3].innerHTML=m%10;

            timeList[4].innerHTML=s>=10?Math.floor(s/10):0;
            timeList[5].innerHTML=s%10;
        }
    },1000);
    if(times<=0){
        clearInterval(timer);
    }

};

/*轮播图*/
var scrollPic=function(){
    var banner=document.getElementsByClassName('jd_banner')[0];// banner
    var width=banner.offsetWidth;//图片的宽度
    var imgBox=document.getElementsByTagName('ul')[0];//图片盒子
    var pointBox=document.getElementsByTagName('ol')[0];//点盒子
    var pointList=pointBox.getElementsByTagName('li');//点数组

    var index=1;
    var timer;

    /*添加过渡效果*/
    var addTransition=function(){
        imgBox.style.transition="all 0.3s ease 0s";
        imgBox.style.webkitTransition="all 0.3s ease 0s";
    };
    /*清除过渡效果：滑动的时候如果没清除，就会跟着手指走*/
    var removeTransition=function(){
        imgBox.style.transition="none";
        imgBox.style.webkitTransition="none";
    };
    //改变位子
    var setTransform=function(t){
        imgBox.style.transform='translateX('+t+'px)';
        imgBox.style.webkitTransform='translateX('+t+'px)';
    };

    timer=setInterval(function(){
        index++;
        addTransition();
        setTransform(-index*width);
    },3000);
    imgBox.addEventListener('transitionEnd',function(){
        if(index>=9){
            index=1;
        }else if(index<=0){
            index=8;
        }
        removeTransition();
        setTransform(-index*width);
    },false);
    imgBox.addEventListener('webkitTransitionEnd',function(){
        if(index>=9){
            index=1;
        }else if(index<=0){
            index=8;
        }
        removeTransition();
        setTransform(-index*width);
        setPoint();
    },false);

    /*2.点随之滚动起来     （改变当前点元素的样式）*/
    var setPoint = function(){
        /*把所有点的样式清除*/
        for(var i = 0 ; i < pointList.length ; i ++){
            pointList[i].className = " ";/*把所有点的样式清除*/
        }
        pointList[index-1].className = "now";
    };

    /*触摸开始事件*/
    imgBox.addEventListener('touchstart',function(e){
        /*记录开始的位置*/
        startX= e.touches[0].clientX;
    });
    /*触摸滑动事件*/
    imgBox.addEventListener('touchmove',function(e){
        clearInterval(timer);
        /*清除默认的滚动事件*/
        e.preventDefault();
        /*记录结束的距离*/
        endX= e.touches[0].clientX;
        /*记录移动的距离*/
        moveX=startX-endX;
        /*清除定时器*/
        removeTransition();
        setTransform(-index*width-moveX);
    });
    /*触摸结束事件*/
    imgBox.addEventListener('touchend',function(e){
        /*如果移动的距离大于三分之一，并且是移动过的*/
        if(Math.abs(moveX)>(1/3*width)&&endX!=0){
            /*向左*/
            if(moveX>0){
                index++;
            }
            /*向右*/
            else{
                index--;
            }
            /*改变位置*/
            setTransform(-index*width);
        }
        /*回到原来的位置*/
        addTransition();
        setTransform(-index*width);

        /*初始化*/
        startX=0;
        endX=0;
        /*严谨的处理定时器*/
        clearInterval(timer);
        timer=setInterval(function(){
            index++;
            addTransition();
            setTransform(-index*width);
        },3000);
    });
};