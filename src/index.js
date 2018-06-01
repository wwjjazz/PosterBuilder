import "./index.less";
var imgSrc = require("./people.jpg");
var QRCodeSrc = require("./QRCode.png");

var navs = document.querySelectorAll(".tool-nav li");
var toolInner = document.querySelector(".tool-inner ul");
var itemW = 412;
var selectBg = document.querySelector(".select-bg");
var phone = document.querySelector(".phone");
var dels = document.querySelectorAll(".tool-inner .del>input");
var inputText = document.querySelectorAll(".input-text>input");
var editBtn = document.querySelector(".edit-title input");
var generate = document.querySelector(".generate");
var index = 0;
var postionInfo = {};

console.log(phone)

navs.forEach(function (el,i) {
    el.onclick = function () {
        console.log(el)
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
                drag(phone,img1,{
                    width:"80px",
                    height:"80px",
                    top:"20px",
                    left:"220px"
                })
                postionInfo.himg = {
                    width: 80,
                    height: 80,
                    top: 20,
                    left: 220
                };
                localStorage.setItem("postionInfo", JSON.stringify(postionInfo))
            }
            dels[1].removeAttribute("disabled");
        } else if (i == 2) {
            if (!phone.querySelector(".title")) {
                var div = document.createElement("div");
                div.className = "title";
                div.innerHTML = "悦读传媒";
                drag(phone, div, {
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                })
                console.log(getStyle(div, "width"));
                console.log(getStyle(phone,"width"));
                postionInfo.title = {
                    fontSize:14,
                    color:"#222",
                    left: (parseFloat(getStyle(phone, "width")) - parseFloat(getStyle(div, "width")))/2 + 4,
                    top: (parseFloat(getStyle(phone, "height")) - parseFloat(getStyle(div, "height"))) / 2 + 4
                };
                localStorage.setItem("postionInfo", JSON.stringify(postionInfo))
            }
            dels[2].removeAttribute("disabled");
            editBtn.removeAttribute("disabled");
        } else if (i==3) {
            if (!phone.querySelector(".QR")){
                var img2 = new Image();
                img2.src = QRCodeSrc;
                img2.className = "QR";
                drag(phone, img2, {
                    width: "90px",
                    height: "90px",
                    top: "394px",
                    left: "210px"
                })
                postionInfo.QRCode = {
                    width: 90,
                    height: 90,
                    top: 394,
                    left: 210
                };
                localStorage.setItem("postionInfo", JSON.stringify(postionInfo))
            }
            dels[3].removeAttribute("disabled");
        }
    }
})

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
        localStorage.setItem("postionInfo", JSON.stringify(postionInfo))
    };

    reader.readAsDataURL(data);
}

dels[0].onclick = function () {
    selectBg.querySelector("#file1").removeAttribute("disabled");
    selectBg.querySelector("input[type=text]").value = "";
    phone.style.backgroundImage = "";
    this.setAttribute("disabled",true);
    var data = JSON.parse(localStorage.getItem("postionInfo"));
    console.log(data)
    data.bg.url = "";
    localStorage.setItem("postionInfo",JSON.stringify(data))
}
dels[1].onclick = function () {
    console.log(11)
    phone.removeChild(phone.querySelector(".himg").parentNode);
    this.setAttribute("disabled", true);
    var data = JSON.parse(localStorage.getItem("postionInfo"));
    console.log(data)
    data.himg = {};
    localStorage.setItem("postionInfo", JSON.stringify(data))
}
dels[2].onclick = function () {
    phone.removeChild(phone.querySelector(".title").parentNode);
    this.setAttribute("disabled", true);
    editBtn.setAttribute("disabled", true);
    var data = JSON.parse(localStorage.getItem("postionInfo"));
    console.log(data)
    data.title = {};
    localStorage.setItem("postionInfo", JSON.stringify(data))
}
dels[3].onclick = function () {
    phone.removeChild(phone.querySelector(".QR").parentNode);
    this.setAttribute("disabled", true);
    var data = JSON.parse(localStorage.getItem("postionInfo"));
    console.log(data)
    data.QRCode = {};
    localStorage.setItem("postionInfo", JSON.stringify(data))
}
editBtn.onclick = function () {
    for (let i = 0; i < inputText.length; i++) {
        if(!inputText[i].value.trim()){
            alert("请填写完整信息");
            return;
        }
    }
    var div = document.querySelector(".title");
    div.style.fontSize = inputText[0].value+"px";
    div.style.color = inputText[1].value;
    // inputText.forEach(function (el) {
    //     el.value = "";
    // })
}
generate.onclick = function () {
    var data = localStorage.getItem("postionInfo");
    console.log(data);
}

function drag(parent,child,option) {
    var wrap = document.createElement("div");
    wrap.className = "drag-wrap";
    for(var key in option){
        wrap.style[key] = option[key];
    }
    var points={};
    for (let i = 0; i <8; i++) {
        points["item"+i] = document.createElement("div");
        points["item" + i].className = "point";
        switch (i) {
            case 0:
                points["item" + i].className += " tl";
                break;
            case 1:
                points["item" + i].className += " tm";
                break;
            case 2:
                points["item" + i].className += " tr";
                break;
            case 3:
                points["item" + i].className += " ml";
                break;
            case 4:
                points["item" + i].className += " mr";
                break;
            case 5:
                points["item" + i].className += " bl";
                break;
            case 6:
                points["item" + i].className += " bm";
                break;
            default:
                points["item" + i].className += " br";
                break;
        }
    }
    for(var el in points){
        wrap.appendChild(points[el])
    }
    console.log(points)
    wrap.style.border = "2px solid blue";
    wrap.appendChild(child);
    parent.appendChild(wrap);
    wrap.addEventListener("mousedown",function (e) {
        console.log(e);
        index++;
        this.style.zIndex = index;
        if (e.target.tagName==="IMG"){
            e.preventDefault();
        }
        var startPoint = {
            x: e.clientX,
            y: e.clientY
        }
        var startEl = {
            x: wrap.offsetLeft,
            y: wrap.offsetTop,
            w: parseFloat(wrap.style.width) || parseFloat(getStyle(wrap,"width")),
            h: parseFloat(wrap.style.height) || parseFloat(getStyle(wrap,"height")),
            fs: parseFloat(getStyle(wrap, "font-size"))
        }
        if (e.target.className.includes("point")){
            switch (e.target.className) {
                case "point tl":
                    change("tl");
                    break;
                case "point tm":
                    change("tm");
                    break;
                case "point tr":
                    change("tr");
                    break;
                case "point ml":
                    change("ml");
                    break;
                case "point mr":
                    change("mr");
                    break;
                case "point bl":
                    change("bl");
                    break;
                case "point bm":
                    change("bm");
                    break;
                default:
                    change("br");
                    break;
            }
        }else{
            document.addEventListener("mousemove", dragMove);
            document.addEventListener("mouseup", dragEnd);
        }
        function dragMove(e) {
            var phoneRect = phone.getBoundingClientRect();
            var wrapRect = wrap.getBoundingClientRect();
            var dis = {
                x: e.clientX - startPoint.x,
                y: e.clientY - startPoint.y
            }
            var now = {
                x: startEl.x + dis.x,
                y: startEl.y + dis.y
            };
            if (now.x < 0) {
                now.x = 0;
            } else if (now.x > phoneRect.width - wrapRect.width) {
                now.x = phoneRect.width - wrapRect.width;
            }
            if (now.y < 0) {
                now.y = 0;
            } else if (now.y > phoneRect.height - wrapRect.height) {
                now.y = phoneRect.height - wrapRect.height;
            }
            if (Math.abs(dis.x) > 5 || Math.abs(dis.y) > 5) {
                wrap.style.transform = "";
                wrap.style.left = now.x + "px";
                wrap.style.top = now.y + "px";
            }
        }
        function dragEnd(e) {
            document.removeEventListener("mousemove", dragMove);
            document.removeEventListener("mouseup", dragEnd);
        }
        function change(key) {
            document.addEventListener("mousemove", tt);
            document.addEventListener("mouseup", changeEnd);
            function tt(e) {
                changeMove(key,e);
            }
            function changeMove(key,e) {
                console.log(key)
                var wrapRect = wrap.getBoundingClientRect();
                var dis = {
                    x: e.clientX - startPoint.x,
                    y: e.clientY - startPoint.y
                }
                var op = {};
                switch (key) {
                    case "tl":
                        op = {
                            w: startEl.w - dis.x,
                            h: startEl.h - dis.y,
                            t: startEl.y + dis.y,
                            l: startEl.x + dis.x
                        }
                        break;
                    case "tm":
                        op = {
                            h: startEl.h - dis.y,
                            t: startEl.y + dis.y,
                        }
                        break;
                    case "tr":
                        op = {
                            t: startEl.y + dis.y,
                            w: startEl.w + dis.x,
                            h: startEl.h - dis.y
                        }
                        break;
                    case "ml":
                        op = {
                            w: startEl.w - dis.x,
                            l: startEl.x + dis.x
                        }
                        break;
                    case "mr":
                        op = {
                            w: startEl.w + dis.x
                        }
                        break;
                    case "bl":
                        op = {
                            w: startEl.w - dis.x,
                            h: startEl.h + dis.y,
                            l: startEl.x + dis.x
                        }
                        break;
                    case "bm":
                        op = {
                            h: startEl.h + dis.y
                        }
                        break;
                    default:
                        op = {
                            w: startEl.w + dis.x,
                            h: startEl.h + dis.y
                        }
                        break;
                }
                console.log(op)
                if(op.w>0&&op.h>0||op.h>0&&!op.w||op.w>0&&!op.h){
                    console.log(dis)
                    wrap.style.width = op.w + "px";
                    wrap.style.height = op.h + "px";
                    wrap.style.top = op.t + "px";
                    wrap.style.left = op.l + "px";
                    wrap.style.fontSize = parseInt(op.w / startEl.w * startEl.fs)+"px";
                }
            }
            function changeEnd(e) {
                document.removeEventListener("mousemove", tt);
                document.removeEventListener("mouseup", changeEnd);
            }
        }
        
    })    
}
function getStyle(node, attr) {
    if (typeof getComputedStyle != 'undefined') {
        var value = getComputedStyle(node, null).getPropertyValue(attr);
        return attr == 'opacity' ? value * 100 : value; //兼容不透明度，如果是不透明度，则返回整数方便计算
    } else if (typeof node.currentStyle != 'undefined') {
        if (attr == 'opacity') { //兼容不透明度
            return Number(node.currentStyle.getAttribute('filter').match(/(?:opacity[=:])(\d+)/)[1]);
        } else {
            return node.currentStyle.getAttribute(attr);
        }
    }
}