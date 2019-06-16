$(function () {
    let poke=[];
    let colorArr=['s','h','d','c'];
    let flag={};
    let box=$('.box');

    for (let i=0;i<52;i++) {
        let index=Math.floor(Math.random()*colorArr.length);
        let color=colorArr[index];
        let number=Math.round(Math.random()*12+1);

        while(flag[color+'_'+number]){
            index=Math.floor(Math.random()*colorArr.length);
            color=colorArr[index];
            number=Math.round(Math.random()*12+1);
        }
        poke.push({color,number});
        flag[color+'_'+number]=true;
    }
    /*发牌：i j
    *
    * */
    let index=-1;
    for (let i=0;i<7;i++){
        for (let j=0;j<=i;j++){
            index++;
            let obj=poke[index];
            let lefts=350-50*i+100*j,tops=50*i;
            $('<div>')
                .addClass('poke')
                .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
                .appendTo('.box')//将子元素插入页面
                .data('number',obj.number)
                .attr('id',i+'_'+j)
                .delay(index*100)//延迟
                .animate({left:lefts,top:tops,opacity:1})//位置
        }
    }
    for (;index<52;index++){
        let obj=poke[index];
        $('<div>')
            .addClass('poke')
            .addClass('left')
            .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg)`})
            .data('number',obj.number)
            .attr('id','-2_-2')
            .appendTo('.box')//将子元素插入页面
            .delay(index*100)//延迟
            .animate({left:0,top:480,opacity:1})//位置
    }
   /*
   * 选牌
   * */
        //(i,j)
        //(i+1,j)(i+1.j+1)
    let first=null;
    box.on('click','.poke',function () {
        let _this=$(this);
        let [i,j]=_this.attr('id').split('_');
        let id1=i*1+1+'_'+j*1,id2=i*1+1+'_'+(j*1+1);//i,j是字符串，乘法转换为数字或number（i）或parseInt()
        // console.log(id1, id2);
        if($('#'+id1).length||$('#'+id2).length){
            return
        }

        /*
        * 选中状态active
        * */
        if (_this.hasClass('active')){
            $(this).removeClass('active').animate({top:'+=30px'})
        }else{
            $(this).addClass('active').animate({top:'-=30px'})
        }
        /*
        * 判断
        * */
        if (!first){
            first=_this;
        } else{
            //判断
            let number1=first.data('number'),number2=_this.data('number')
           if (number1+number2===14){
                $('.active').animate({top:0,left:710,opacity:0},function () {
                    $(this).remove();
                    $('.tips').html('消除成功').addClass('alert-success').fadeIn().delay(1000).fadeOut();
                })
           } else{
               $('.active').animate({top:'+=30'},function () {
                   $(this).removeClass('active')
               });
           }
            first=null;
        }
    })
    /*切换*/
    let n=0;
    $('.right').on('click',function () {
            // $('.left:last')//筛选

        $('.left').last().css('zIndex',n++).animate({left:710},function () {
            $(this).removeClass('left').addClass('right')
        })//过滤
    })
    $('.leftBtn').on('click',function () {
        $('.right').last().css('zIndex',n--).animate({left:0},function () {
            $(this).removeClass('right').addClass('left')
        })
    })

});

