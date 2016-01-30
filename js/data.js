$(function(){
    $(document).on("mousedown",function(e){
            var obj= e.target;
            var ox= e.offsetX;
            var oy= e.offsetY;
            $(document).on("mousemove",function(e){
                var px= e.pageX;
                var py= e.pageY;
                $(obj).trigger("drag",{left:px-ox,top:py-oy})
            })
            $(document).on("mouseup",function(){
                $(document).off("mouseup");
                $(document).off("mousemove");
            })
    })
    //输入框的动画
    //按钮
    var add=$(".add");
    //输入框
    var form=$("form");
    var formClose=$(".formclose");
    var flag=true;
    add.click(function(){
        if(flag){
            form.attr({"data-role":"animate-show"}).css("display","block");
            flag=false;
        }else{
            form.attr({"data-role":"animate-hide"}).css("display","none");
            flag=true;
        }
    })
    formClose.click(function(){
        form.attr({"data-role":"animate-hide"}).css("display","none");
        flag=true;
    })

//    表单的验证
    $(".submitbutton").click(function(){
        var textv=form.find(".biaoti").val();
        var conv=form.find(".neirong").val();
        var timev=form.find("#time").val();

        if(textv==""){
            alert("标题不能为空");

            return;
        }
        if(timev==""){
            alert("时间必选");
            return;
        }
        //存储信息
        var oldv=localStorage.message==null?[]:JSON.parse(localStorage.message);
        var obj={title:textv,con:conv,time:timev,id:new Date().getTime()};
        oldv.push(obj);
        var str=JSON.stringify(oldv);
        localStorage.message=str;
        form.find(".biaoti").val("");
        form.find(".neirong").val("");
        form.find("#time").val("");

    //    显示信息
        var copy=$(".con:first").clone().appendTo("body").fadeIn(100).css({
            left:($(window).width()-$(".con").outerWidth())*Math.random(),
            top:($(window).height()-$(".con").outerHeight())*Math.random(),
            display:"block"
        }).attr("data-role","animate-sd").attr("id",obj.id);
        copy.find(".title-con").html(textv);
        copy.find(".con-con").html(conv);
        copy.find(".time-con").html(timev);
    })
        //显示保存内容
        var messages=localStorage.message==null?[]:JSON.parse(localStorage.message);
        for(var i=0;i<messages.length;i++){
            copy=$(".con:first").clone().appendTo("body").css({
                left:($(window).width()-$(".con").outerWidth())*Math.random(),
                top:($(window).height()-$(".con").outerHeight())*Math.random(),
                display:"block"
            }).attr("id",messages[i].id);
            copy.find(".title-con").html(messages[i].title);
            copy.find(".con-con").html(messages[i].con);
            copy.find(".time-con").html(messages[i].time);
        }

        //拖拽时间
        $(document).delegate(".con","drag",function(e,data){
            $(this).css({
                left:data.left,
                top:data.top
            })
        })
        $(document).delegate(".con","mousedown",function(e,data){
            $(".con").css({zIndex:0})
            $(this).css({zIndex:1})
            e.preventDefault();
        })
        $(document).delegate(".close1","click",function(){
            var id=$(this).parent().attr("id");
            var arr=JSON.parse(localStorage.message);
            for(var i=0;i<arr.length;i++){
                if(arr[i].id==id){
                    arr.splice(i,1);
                    localStorage.message=JSON.stringify(arr);
                    break;
                }
            }
            $(this).parent().remove();
        })
})