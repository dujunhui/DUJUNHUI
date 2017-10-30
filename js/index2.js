$(function(){
    navBarMouseEventOn();
    navBarClickEventOn();
})
//主页内容块儿依次显示
var t = new TimelineMax();
var mainList = $("#main li");
t.staggerTo( mainList,0.4,{ opacity:1 },0.05 );
t=null;

//侧栏按钮的动画
var tm = new TimelineMax();
var bars = $('.nav_open div')

tm.to( bars,0.4,{ backgroundColor:'#111',ease:Cubic.easeOut },0)
tm.to('#navBar',0.4,{ backgroundColor:'#fff',ease:Cubic.easeOut },0)
tm.to('.bar1',0.4,{ y:-3 ,ease:Cubic.easeOut},0)
tm.to('.bar3',0.4,{ y:3 ,ease:Cubic.easeOut},0)
tm.stop();

//侧栏展开关闭的动画
var t3 = new TimelineMax();
t3.to( bars,1,         { backgroundColor:'#111',ease:Cubic.easeOut },0)
t3.to('#navBar',0.8,   { width:260,backgroundColor:'#fff',ease:Cubic.easeOut },0)
t3.to('.bar1',1,       { rotation:-45,y:7,ease:Back.easeInOut },0)
t3.to('.bar2',0.8,     { x:100,opacity:0,ease:Back.easeInOut },0)
t3.to('.bar3',1,       { rotation:45 ,y:-5,ease:Back.easeInOut },0)
t3.add('state_1')

t3.to( bars,1,         { backgroundColor:'#fff',ease:Cubic.easeOut },1)
t3.to('#navBar',0.8,   { width:58,backgroundColor:'#111',ease:Cubic.easeOut,onComplete:function(){
    navBarMouseEventOn();
} },1)
t3.to('.bar1',1,   { rotation:0,y:0,ease:Back.easeInOut },1)
t3.to('.bar2',0.8, { x:0,opacity:1,ease:Back.easeInOut },1)
t3.to('.bar3',1,   { rotation:0 ,y:0,ease:Back.easeInOut },1)
t3.add('state_2' )

t3.stop();



// nav移入移出
function navBarMouseEventOn(){
    $('#navBar').on( 'mouseenter', navMouseOver )
    $('#navBar').on( 'mouseleave', navMouseOut )
}
function navBarMouseEventOff(){
    $('#navBar').off( 'mouseenter', navMouseOver )
    $('#navBar').off( 'mouseleave', navMouseOut )
}
function navMouseOver(){ tm.play() }
function navMouseOut(){ tm.reverse() }




// navBar点击 打开nav
function navBarClickEventOn(){
    $('#navBar').on( 'click', navBarClick )
}
function navBarClickEventOff(){
    $('#navBar').off( 'click', navBarClick )
}
function navBarClick(){
    console.log('点击navBar')
    navBarClickEventOff();
    navBarMouseEventOff();
    navBtnClickEventOn();
    t3.tweenTo('state_1');
    return false
}

// ×点击 关闭nav
function navBtnClickEventOn(){
    $('.nav_open').on( 'click', navBarCloseClick )
}
function navBtnClickEventOff(){
    $('.nav_open').off( 'click', navBarCloseClick )
}
function navBarCloseClick(){
    console.log('点击×')
    navBtnClickEventOff();
    navBarClickEventOn();
    t3.tweenTo('state_2');
    return false
}