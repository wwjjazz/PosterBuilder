import "./index.less";
var imgSrc = require("./people.jpg");
var QRCodeSrc = require("./QRCode.png");

var navs = document.querySelectorAll(".tool-nav span");
var toolInner = document.querySelector(".tool-inner ul");
var itemW = 412;
var selectBg = document.querySelector(".select-bg");
var phone = document.querySelector(".phone");
var dels = document.querySelectorAll(".tool-inner .del>input");
var inputText = document.querySelectorAll(".input-text>input");
var editBtn = document.querySelector(".edit-title input");
var generate = document.querySelector(".generate");
var text2 = document.querySelector("#text2");
var text3 = document.querySelector("#text3");
var color = document.querySelector(".color");
var index = 0;
var postionInfo = {};


// 颜色选择器
color.onchange = function (e) {
    text3.value = this.value;
    document.querySelector(".title").parentNode.style.color = this.value;
    postionInfo.title.color = this.value;
    save();
}
function save() {
    localStorage.setItem("postionInfo", JSON.stringify(postionInfo));
}
// nav点击切换
navs.forEach(function (el,i) {
    el.onclick = function () {

        navs.forEach(function (el) {
            el.className = "";
        })
        this.className = "active";
        toolInner.style.left = -itemW*i+"px";

        if(i==1){
            if (!phone.querySelector(".himg")){
                var img1 = new Image();
                img1.src = imgSrc;
                img1.className = "himg";
                img1.dataset.id = i;

                drag(phone,img1,{
                    width:"80px",
                    height:"80px",
                    top:"20px",
                    left:"220px"
                },"wrap",true)

                postionInfo.himg = {
                    width: 80,
                    height: 80,
                    top: 20,
                    left: 220
                };
                save();
            }
            dels[1].removeAttribute("disabled");
        } else if (i == 2) {
            if (!phone.querySelector(".title")) {
                var div = document.createElement("div");
                div.className = "title";
                div.innerHTML = "悦读传媒";
                div.dataset.id = i;

                drag(phone, div, {
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                },"inner",true)

                text2.value = 14;
                text3.value = "#222222";
                color.value = "#222222";
                // console.log(css(phone, "width") ,css(div, "width"))
                postionInfo.title = {
                    fontSize:14,
                    color:"#222",
                    left: (css(phone, "width") - css(div, "width")) / 2 + 4,
                    top: (css(phone, "height") - css(div, "height")) / 2 + 4
                };
                    save();
            }
            dels[2].removeAttribute("disabled");
            editBtn.removeAttribute("disabled");
        } else if (i==3) {
            if (!phone.querySelector(".QR")){
                var img2 = new Image();
                img2.src = QRCodeSrc;
                img2.className = "QR";
                img2.dataset.id = i;

                drag(phone, img2, {
                    width: "90px",
                    height: "90px",
                    top: "394px",
                    left: "210px"
                }, "wrap", true)

                postionInfo.QRCode = {
                    width: 90,
                    height: 90,
                    top: 394,
                    left: 210
                };
                save();
            }
            dels[3].removeAttribute("disabled");
        }
    }
})

// 选择背景图
selectBg.querySelector("#file1").onchange = function (e) {
    var that = this;
    var data = e.target.files[0];
    selectBg.querySelector("input[type=text]").value = data.name;

    var reader = new FileReader();
    var imgFile;
    reader.onload = function (e) {
        imgFile = e.target.result;
        phone.style.backgroundImage = "url(" + imgFile + ")";
        that.value = "";
        that.setAttribute("disabled",true);
        dels[0].removeAttribute("disabled");
        postionInfo.bg = {
            url:imgFile
        };
        save();
    };

    reader.readAsDataURL(data);
}

// 删除按钮
dels[0].onclick = function () {
    selectBg.querySelector("#file1").removeAttribute("disabled");
    selectBg.querySelector("input[type=text]").value = "";
    phone.style.backgroundImage = "";
    this.setAttribute("disabled",true);
    postionInfo.bg.url = "";
    save();
}
dels[1].onclick = function () {
    console.log(11)
    phone.removeChild(phone.querySelector(".himg").parentNode);
    this.setAttribute("disabled", true);
    postionInfo.himg = {};
    save();
}
dels[2].onclick = function () {
    phone.removeChild(phone.querySelector(".title").parentNode);
    this.setAttribute("disabled", true);
    editBtn.setAttribute("disabled", true);
    postionInfo.title = {};
    save();
}
dels[3].onclick = function () {
    phone.removeChild(phone.querySelector(".QR").parentNode);
    this.setAttribute("disabled", true);
    postionInfo.QRCode = {};
    save();
}

// 编辑文本样式
editBtn.onclick = function () {
    for (let i = 0; i < inputText.length; i++) {
        if(!inputText[i].value.trim()){
            alert("请填写完整信息");
            return;
        }
    }
    var div = document.querySelector(".title");
    div.parentNode.style.fontSize = inputText[0].value+"px";
    div.parentNode.style.color = inputText[1].value;
    postionInfo.title.fontSize = inputText[0].value;
    postionInfo.title.color = inputText[1].value;
    save();
    // inputText.forEach(function (el) {
    //     el.value = "";
    // })
}

// 生成位置信息对象
generate.onclick = function () {
    var data = localStorage.getItem("postionInfo");
    console.log(data);
    console.log(postionInfo)
}

// parent 拖拽元素的父容器
// child 拖拽元素的内容
// option 拖拽元素的初始样式
// type 拖拽元素的内容呈现方式：wrap(内部跟随外部宽高)/inner(容器宽高由内部元素决定)
// locked 是否锁定等比缩放
function drag(parent,child,option,type,locked) {
    var wrap = document.createElement("div");
    wrap.className = "drag-wrap";
    wrap.dataset.inclass = child.className;
    for(var key in option){
        wrap.style[key] = option[key];
    }
    var arr = locked ? ["tl", "tr", "bl", "br"] : ["tl", "tm", "tr", "ml", "mr", "bl", "bm", "br"];
    arr.forEach(function (el) {
        var div = document.createElement("div");
        div.className = "point "+el;
        div.dataset.id = child.dataset.id;
        div.dataset.pa = el;
        wrap.appendChild(div);
    })
    
    wrap.appendChild(child);
    parent.appendChild(wrap);

    wrap.addEventListener("mousedown",function (e) {

        var elClassName = e.target.className;
        
        // 提升层级
        index++;
        this.style.zIndex = index;

        // 切换nav的激活状态
        navs.forEach(function (el,i) {
            if (i == e.target.dataset.id){
                navs[i].className = "active";
                toolInner.style.left = -itemW * i + "px";
            }else{
                navs[i].className = "";
            }
        })
        
        // 阻止图片拖出
        if (e.target.tagName==="IMG"){
            e.preventDefault();
        }
        
        // 当前鼠标位置
        var startPoint = {
            x: e.clientX,
            y: e.clientY
        }

        // 当前元素的位置
        var startEl = {
            l: wrap.offsetLeft,
            t: wrap.offsetTop,
            w: css(wrap,"width"),
            h: css(wrap,"height"),
            fs: css(wrap, "font-size")
        }

        console.log(startPoint,startEl)

        // 判断点中的是否为拖快
        if (elClassName.includes("point")){
            change(e.target.dataset.pa);
        }else{
            if (e.target.parentNode.className.includes("active") && e.target.parentNode.className.includes("drag-wrap")) {
                e.target.parentNode.className = "drag-wrap";
            } else if (e.target.parentNode.className.includes("drag-wrap")){
                Array.prototype.slice.call(e.target.parentNode.parentNode.children).forEach(function (el) {
                    el.className = "drag-wrap";
                })
                e.target.parentNode.className = "drag-wrap active";
            }
            
            document.addEventListener("mousemove", dragMove);
            document.addEventListener("mouseup", dragEnd);
        }
        function dragMove(e) {
            var phoneW = css(phone, "width");
            var phoneH = css(phone, "height");
            var wrapW = css(wrap, "width");
            var wrapH = css(wrap, "height");
            // var wrapRect = wrap.getBoundingClientRect();
            var dis = {
                x: e.clientX - startPoint.x,
                y: e.clientY - startPoint.y
            }
            var now = {
                l: startEl.l + dis.x,
                t: startEl.t + dis.y
            };
            if (now.l < 0) {
                now.l = 0;
            } else if (now.l > phoneW - wrapW) {
                now.l = phoneW - wrapW;
            }
            if (now.t < 0) {
                now.t = 0;
            } else if (now.t > phoneH - wrapH) {
                now.t = phoneH - wrapH;
            }
            if (Math.abs(dis.x) > 5 || Math.abs(dis.y) > 5) {
                wrap.style.transform = "";
                wrap.style.left = now.l + "px";
                wrap.style.top = now.t + "px";

                if(e.target.className=="QR"){
                    postionInfo.QRCode.left = now.l;
                    postionInfo.QRCode.top = now.t;
                } else if (e.target.className == "himg") {
                    postionInfo.himg.left = now.l;
                    postionInfo.himg.top = now.t;
                } else if (e.target.className == "title") {
                    postionInfo.title.left = now.l;
                    postionInfo.title.top = now.t;
                } 
            }
        }
        function dragEnd(e) {
            document.removeEventListener("mousemove", dragMove);
            document.removeEventListener("mouseup", dragEnd);
            save();
        }
        function change(pa) {
            console.log(pa)
            document.addEventListener("mousemove", tt);
            document.addEventListener("mouseup", changeEnd);
            function tt(e) {
                changeMove(e,pa)
            }
            
            function changeMove(e, pa) {
                var op = {};
                var wrapRect = wrap.getBoundingClientRect();
                var dis = {
                    x: e.clientX - startPoint.x,
                    y: e.clientY - startPoint.y
                }

                // 是否等比缩放
                if (locked) {
                    switch (pa) {
                        case "tl":
                            op = {
                                width: startEl.w-dis.x,
                                height: startEl.h-dis.x,
                                left: startEl.l+dis.x,
                                top: startEl.t+dis.x
                            };
                            break;
                        case "tr":
                            op = {
                                width: startEl.w + dis.x,
                                height: startEl.h+dis.x,
                                left: startEl.l,
                                top: startEl.t-dis.x
                            };
                            break;
                        case "bl":
                            op = {
                                width: startEl.w -dis.x,
                                height: startEl.h-dis.x,
                                left: startEl.l+dis.x,
                                top: startEl.t
                            };
                            break;
                        default:
                            op = {
                                width: startEl.w + dis.x,
                                height: startEl.h + dis.x,
                                left: startEl.l,
                                top: startEl.t
                            };
                            break;
                    }
                }else{
                    switch (pa) {
                        case "tl":
                            op = {
                                width: startEl.w - dis.x,
                                height: startEl.h - dis.y,
                                top: startEl.t + dis.y,
                                left: startEl.l + dis.x
                            }
                            break;
                        case "tm":
                            op = {
                                height: startEl.h - dis.y,
                                width:startEl.w,
                                left:startEl.l,
                                top: startEl.t + dis.y
                            }
                            break;
                        case "tr":
                            op = {
                                top: startEl.t + dis.y,
                                width: startEl.w + dis.x,
                                left:startEl.l,
                                height: startEl.h - dis.y
                            }
                            break;
                        case "ml":
                            op = {
                                width: startEl.w - dis.x,
                                left: startEl.l + dis.x,
                                top: startEl.t,
                                height: startEl.h
                            }
                            break;
                        case "mr":
                            op = {
                                width: startEl.w + dis.x,
                                left: startEl.l,
                                top: startEl.t,
                                height: startEl.h
                            }
                            break;
                        case "bl":
                            op = {
                                width: startEl.w - dis.x,
                                height: startEl.h + dis.y,
                                left: startEl.l + dis.x,
                                top: startEl.t
                            }
                            break;
                        case "bm":
                            op = {
                                height: startEl.h + dis.y,
                                top: startEl.t,
                                left: startEl.l,
                                width: startEl.w
                            }
                            break;
                        default:
                            op = {
                                width: startEl.w + dis.x,
                                height: startEl.h + dis.y,
                                left: startEl.l,
                                top: startEl.t
                            }
                            break;
                    }
                }
                
                if (op.width >= 0 && op.height >= 0 || op.height >= 0 && !op.width || op.width >= 0 && !op.height) {
                    if (type == "wrap") {

                        if (e.target.parentNode.dataset&&e.target.parentNode.dataset.inclass == "QR") {
                            
                            if (op.left) {
                                postionInfo.QRCode.left = op.left;
                            }
                            if (op.top) {
                                postionInfo.QRCode.top = op.top;
                            }
                            if (op.width) {
                                postionInfo.QRCode.width = op.width;
                            }
                            if (op.height) {
                                postionInfo.QRCode.height = op.height;
                            }
                        } else if (e.target.parentNode.dataset&&e.target.parentNode.dataset.inclass == "himg") {
                            if (op.left) {
                                postionInfo.himg.left = op.left;
                            }
                            if (op.top) {
                                postionInfo.himg.top = op.top;
                            }
                            if (op.width) {
                                postionInfo.himg.width = op.width;
                            }
                            if (op.height) {
                                postionInfo.himg.height = op.height;
                            }
                        }
                        console.log(op)
                        for(var k in op){
                            wrap.style[k] = op[k]+"px";
                        }
                    } else if (type == "inner") {
                        console.log(2, op)
                        if (!op.width) {
                            return false;
                        }
                        
                        var key = op.width / startEl.w * startEl.fs;
                        wrap.style.fontSize = parseInt(key) + "px";
                        wrap.style.transform = "";
                        wrap.style.left = op.left + "px";
                        wrap.style.top = op.top + "px";
                        
                        text2.value = parseInt(key);
                        postionInfo.title.fontSize = parseInt(key);
                        postionInfo.title.left = css(wrap, "left");
                        postionInfo.title.top = css(wrap,"top");
                    }
                }
            }
            function changeEnd(e) {
                console.log(2)
                document.removeEventListener("mousemove", tt);
                document.removeEventListener("mouseup", changeEnd);
                save();
            }  
        }
    })    
}

// 设置/获取元素CSS样式
function css(el, attr, val) {
    if (arguments.length > 2) {
        if (attr == "opacity") {
            el.style[attr] = val;
            el.style.filter = "alpha(opacity = " + val * 100 + ")";
        } else {
            el.style[attr] = val + "px";
        }
    } else {
        return el.currentStyle ? parseFloat(el.currentStyle[attr]) : parseFloat(getComputedStyle(el)[attr]);
    }
}