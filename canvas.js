$(function(){
    var box=$(".box");
    var copy=$(".copy");
    var canvas=$("canvas");
    var cobj=canvas[0].getContext("2d");

    //$(".parent li").click(function(){
    //    //if(obj.temp){
    //    //    obj.history.push(this.cobj.getImageData(0,0,canvas[0].width,canvas[0].height));
    //    //    obj.temp=null;
    //    //}
    //    $(".selectarea").css({
    //        display:"none"
    //    })
    //})

    canvas.attr({
        width:copy.width(),
        height:copy.height()
    })

    //$(".hasson").hover(function(){
    //    $(this).find(".son").finish();
    //    $(this).find(".son").fadeIn(200);
    //},function(){
    //    $(this).find(".son").fadeOut(200);
    //})

    var obj=new shape(copy[0],canvas[0],cobj,$(".xp"),$(".selectarea"));
    //$(".youqi").click(function(){
    //    $(".color li").click(function(){
    //        var yanse=$(this).attr("id");
    //        $(".copy").click(function(){
    //            $(this).css({
    //                background:yanse
    //            })
    //        })
    //    })
    //})
    //$(".youqi").click(function(){
    //    $(".color input").change(function(){
    //        var yanse=$(this).val();
    //        $(".copy").click(function(){
    //            $(this).css({
    //                background:yanse
    //            })
    //        })
    //    })
    //})
    $(".hasson:eq(4)").find(".son li").click(function(){
        obj.lineWidth=$(this).attr("num");
        obj.draw();
    })
    $(".hasson:eq(3)").find(".son li").click(function(){
        obj.type=$(this).attr("type");
        obj.draw();
    })
    $(".hasson:eq(1)").find(".son li:eq(0)").click(function(){
        obj.pen();
    })
    $(".hasson:eq(2)").find(".son li").click(function(){
        obj.shapes = $(this).attr("data-role");
        obj.draw();
    })
    $(".color input").change(function(){
        obj.borderColor=$(this).val();
        obj.bgcolor=$(this).val();
        obj.draw();
    })
    $(".color li").click(function(){
        obj.borderColor=$(this).attr("id");
        obj.bgcolor=$(this).attr("id");
        obj.draw();
    })
    //橡皮
    $(".xiangpi").click(function(){
        var w=50;
        var h=50;
        obj.xp($(".xp"),w,h);
    })
    $(".file button").click(function(){
        var index=$(this).index(".file button");
        if(index==0){
            if(obj.history.length>0){
                var yes=window.confirm("是否要保存");
                if(yes){
                    location.href=(canvas[0].toDataURL().replace("data:image/png","data:stream/octet"))
                }
            }
            obj.history=[];
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
        }
        if(index==1){
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
            if(obj.history.length==0){
                alert("no");
                return;
            }
            var data=obj.history.pop();
            cobj.putImageData(data,0,0);
        }else if(index==2){
            location.href=(canvas[0].toDataURL().replace("data:image/png","data:stream/octet"))
        }
    })
    $(".select").click(function(){

        obj.select($(".selectarea"));
    })

})