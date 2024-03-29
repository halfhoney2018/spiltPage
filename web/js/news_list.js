var jsCommonCp = 1;        // 当前所在页
var jsCommonLs = 5;        // 每页显示的数据个数
var jsCommonPageSize;      // 总页数
$(function () {
    loadData();
})
function loadData() {   // 定义数据读取的操作函数
    $.post("split.jsp", {"cp": jsCommonCp, "ls": jsCommonLs}, function (obj) {
        createSplitBar(obj.allRecorders);
    }, "json");
}
function createSplitBar(allRecorders) {    // 专门用于创建分页的操作
    clearBar();    // 清空全部的内容
    calcPageSize(allRecorders);    // 计算总页数
    if (jsCommonPageSize > 1) { // 有很多页
        previousPage() ;
        addBar(1) ;
    }
    var seed = 3 ;  // 设置一个分页种子数
    if (jsCommonCp > seed * 2) {    // 页码很大
        addDetailPage() ;   // 增加省略页
        var startPage = jsCommonCp - seed ;
        for (var x = startPage ; x <= jsCommonCp + seed ; x ++) {
            if (x < jsCommonPageSize) {
                addBar(x) ;
            }
        }
        if (jsCommonCp + seed * 2 < jsCommonPageSize) {
            addDetailPage() ;
        }
    } else {
        for (var x = 2 ; x <= jsCommonCp + seed ; x ++) {
            if (x < jsCommonPageSize) {
                addBar(x) ;
            }
        }
        if (jsCommonCp + seed <= jsCommonPageSize) {
            addDetailPage() ;
        }
    }

    addBar(jsCommonPageSize) ;
    if (jsCommonPageSize > 1) {
        nextPage() ;
    }
}
function addDetailPage() {
    var liObj = $("<li><span>...</span></li>") ;
    $("#pagecontrol").append(liObj) ;
}
function previousPage() {   // 上一页按钮
    var liObj = $("<li></li>");    // 定义li元素
    var aObj = $("<a style='cursor:pointer;'>上一页</a>");
    if (jsCommonCp == 1) {  // 已经是第一页了
        liObj.addClass("disabled") ;
    } else {
        aObj.on("click",function(){
            if (jsCommonCp > 1) {   // 可以有上一页
                jsCommonCp -- ;
                loadData();
            }
        })
    }
    liObj.append(aObj) ;
    $("#pagecontrol").append(liObj) ;
}
function nextPage() {   // 下一页按钮
    var liObj = $("<li></li>");    // 定义li元素
    var aObj = $("<a style='cursor:pointer;'>下一页</a>");
    if (jsCommonCp == jsCommonPageSize) {  // 已经是总页数
        liObj.addClass("disabled") ;
    } else {
        aObj.on("click",function(){
            if (jsCommonCp < jsCommonPageSize) {   // 可以有下一页
                jsCommonCp ++ ;
                loadData();
            }
        })
    }
    liObj.append(aObj) ;
    $("#pagecontrol").append(liObj) ;
}
function clearBar() {   // 清空已有的内容
    $("#pagecontrol li").remove();
}
function addBar(index) { // 专门生成分页控制代码
    var liObj = $("<li></li>");    // 定义li元素
    var aObj = $("<a style='cursor:pointer;'>" + index + "</a>");
    if (jsCommonCp == index) {  // 为当前所在页
        liObj.addClass("active") ;
    } else {
        aObj.on("click",function(){
            jsCommonCp = index ;
            loadData() ;
        })
    }
    liObj.append(aObj) ;
    $("#pagecontrol").append(liObj) ;
}
function calcPageSize(allRecorders) {   // 计算总页数
    if (allRecorders == 0) {    // 没有数据
        jsCommonPageSize = 1;  // 就在第1页上显示
    } else {    // 避免小数点问题
        jsCommonPageSize = parseInt((allRecorders + jsCommonLs - 1) / jsCommonLs);
    }
}