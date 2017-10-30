$(function(){
    navBarMouseEventOn();
    navBarClickEventOn();
    mainImgMouseEventOn();
})

//主页内容块儿依次显示
var t = new TimelineMax();
var mainList = $("#main li");
t.staggerTo( mainList,0.4,{ opacity:1 },0.02 );


//侧栏动画
var tm = new TimelineMax();
var bars = $('.nav_open div')

//menu动画
 var menuTm = new TimelineMax();

menuTm.staggerTo( '.menu li' ,0.8,{ opacity:1,top:10,onStart:function(){
    $('.menu').css('display','block')
},onReverseComplete:function(){
    $('.menu').css('display','none')
} },0.2 );
menuTm.stop();

// nav移入移出
function navBarMouseEventOn(){
    $('#navBar').on( 'mouseenter', navBarMouseOver )
    $('#navBar').on( 'mouseleave', navBarMouseOut )
}   //添加事件
function navBarMouseEventOff(){
    $('#navBar').off( 'mouseenter', navBarMouseOver )
    $('#navBar').off( 'mouseleave', navBarMouseOut )
}  //删除事件
function navBarMouseOver(){
    tm.clear();
    tm.to( bars,0.4,{ backgroundColor:'#111',ease:Cubic.easeOut },0)
    tm.to('#navBar',0.4,{ backgroundColor:'#fff',ease:Cubic.easeOut },0)
    tm.to('.bar1',0.4,{ y:-3 ,ease:Cubic.easeOut},0)
    tm.to('.bar3',0.4,{ y:3 ,ease:Cubic.easeOut},0)
}
function navBarMouseOut(){
    tm.clear();
    tm.to( bars,0.4,{ backgroundColor:'#fff',ease:Cubic.easeOut },0)
    tm.to('#navBar',0.4,{ backgroundColor:'#111',ease:Cubic.easeOut },0)
    tm.to('.bar1',0.4,{ y:0 ,ease:Cubic.easeOut},0)
    tm.to('.bar3',0.4,{ y:0 ,ease:Cubic.easeOut},0)
}

// navBar点击 打开nav
function navBarClickEventOn(){
    $('#navBar').on( 'click', navBarClick )
}
function navBarClickEventOff(){
    $('#navBar').off( 'click', navBarClick )
}
function navBarClick(){
    navBarMouseEventOff();
    navBarClickEventOff();
    navBtnClickEventOn();
    shadeClickEventOn();
    menuTm.play();
    tm.clear();
    // tm.set('#main', { perspective:1000 ,transformOrigin:'center right'});
    tm.to('#navBar',0.8,   { width:260,backgroundColor:'#fff',ease:Cubic.easeOut },0)
    tm.to( bars,1,         { backgroundColor:'#111',ease:Cubic.easeOut },0)
    tm.to('.bar1',1,       { rotation:-45,y:7,ease:Back.easeInOut },0)
    tm.to('.bar2',0.8,     { x:100,opacity:0,ease:Back.easeInOut },0)
    tm.to('.bar3',1,       { rotation:45 ,y:-5,ease:Back.easeInOut },0)
    tm.to('#main .listBox',1 ,{ rotationY:-10,ease:Cubic.easeOut },0)
    tm.to('.shade',0.5,{ display:'block',opacity:0.8,zIndex:1,ease:Cubic.easeOut },0)
    return false;
}

// ×点击 关闭nav
function navBtnClickEventOn(){
    $('.nav_open').on( 'click', navBtnClick )
}
function navBtnClickEventOff(){
    $('.nav_open').off( 'click', navBtnClick )
}
function navBtnClick(){
    navBtnClickEventOff();
    menuTm.reverse();
    tm.clear();
    tm.to('#navBar',0.8,   { width:58,backgroundColor:'#111',ease:Cubic.easeOut },0)
    tm.to( bars,1,     { backgroundColor:'#fff',ease:Cubic.easeOut },0)
    tm.to('.bar1',1,   { rotation:0,y:0,ease:Back.easeInOut },0)
    tm.to('.bar2',0.8, { x:0,opacity:1,ease:Back.easeInOut },0)
    tm.to('.bar3',1,   { rotation:0 ,y:0,ease:Back.easeInOut },0)
    tm.to('#main .listBox',1 ,{ rotationY:0,ease:Cubic.easeOut },0)
    tm.to('.shade',1,{ display:'none',opacity:0,zIndex:1,ease:Cubic.easeOut },0)
    tm.add(function(){
        navBarMouseEventOn();
        navBarClickEventOn();
    })
    return false;
}

//遮罩点击
function shadeClickEventOn(){
    $('.shade').on('click',navBtnClick)
}
function shadeClickEventOff(){
    $('.shade').off('click',navBtnClick)
}



//图片鼠标经过
function mainImgMouseEventOn(){
    $('#main li').on('mouseenter',mainImgMouseenter);
    $('#main li').on('mouseleave',mainImgMouseleave);
}
function mainImgMouseenter(){
    $(this).find('.more').stop(true,true).fadeIn(500);
    $(this).find('.shade_img').stop(true,true).fadeOut(500);

    var el = this.querySelectorAll('.lines circle');
    var lineDrawing = anime({
        targets: el,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1000,
        delay: function(el, i) { return i * 150 }
    });
}
function mainImgMouseleave(){
    $(this).find('.more').stop(true,true).fadeOut(500);
    $(this).find('.shade_img').stop(true,true).fadeIn(500);
}