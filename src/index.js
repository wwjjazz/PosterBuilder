import "./index.less";

var navs = document.querySelectorAll(".tool-nav li");
var toolInner = document.querySelector(".tool-inner ul");
var itemW = 412;
var selectBg = document.querySelector(".select-bg");
var selectHimg = document.querySelector(".select-himg");
var selectQRCode = document.querySelector(".select-QRCode");
var phone = document.querySelector(".phone");
var dels = document.querySelectorAll(".tool-inner .del>input");
var inputText = document.querySelectorAll(".input-text>input");
var addBtn = document.querySelector(".add-title input");
var editBtn = document.querySelector(".edit-title input");

console.log(phone)

navs.forEach(function (el,i) {
    el.onclick = function () {
        console.log(el)
        navs.forEach(function (el) {
            el.className = "";
        })
        this.className = "active";
        toolInner.style.left = -itemW*i+"px";
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
    };

    reader.readAsDataURL(data);
}
selectHimg.querySelector("#file2").onchange = function (e) {
    console.log(1112)
    var that = this;
    var data = e.target.files[0];
    selectHimg.querySelector("input[type=text]").value = data.name;

    var reader = new FileReader();
    var imgFile;
    reader.onload = function (e) {
        imgFile = e.target.result;
        var img = new Image();
        img.src = imgFile;
        img.style.cssText+="width:80px;height:80px;border:2px solid blue;right:20px;top:20px;";
        img.className = "himg";
        phone.appendChild(img);
        that.value = "";
        that.setAttribute("disabled", true);
        dels[1].removeAttribute("disabled");
    };

    reader.readAsDataURL(data);
}
selectQRCode.querySelector("#file4").onchange = function (e) {
    console.log(111)
    var that = this;
    var data = e.target.files[0];
    selectQRCode.querySelector("input[type=text]").value = data.name;

    var reader = new FileReader();
    var imgFile;
    reader.onload = function (e) {
        imgFile = e.target.result;
        var img = new Image();
        img.src = imgFile;
        img.style.cssText += "width:90px;height:90px;border:2px solid red;right:20px;bottom:20px;";
        img.className = "QR";
        phone.appendChild(img);
        that.value = "";
        that.setAttribute("disabled", true);
        dels[3].removeAttribute("disabled");
    };

    reader.readAsDataURL(data);
}

dels[0].onclick = function () {
    selectBg.querySelector("#file1").removeAttribute("disabled");
    selectBg.querySelector("input[type=text]").value = "";
    phone.style.backgroundImage = "";
    this.setAttribute("disabled",true);
}
dels[1].onclick = function () {
    selectHimg.querySelector("#file2").removeAttribute("disabled");
    selectHimg.querySelector("input[type=text]").value = "";
    phone.removeChild(phone.querySelector(".himg"));
    this.setAttribute("disabled", true);
}
dels[2].onclick = function () {
    phone.removeChild(phone.querySelector(".title"));
    this.setAttribute("disabled", true);
    editBtn.setAttribute("disabled", true);
    addBtn.removeAttribute("disabled");
}
dels[3].onclick = function () {
    selectQRCode.querySelector("#file4").removeAttribute("disabled");
    selectQRCode.querySelector("input[type=text]").value = "";
    phone.removeChild(phone.querySelector(".QR"));
    this.setAttribute("disabled", true);
}
addBtn.onclick = function () {
    for (let i = 0; i < inputText.length; i++) {
        if(!inputText[i].value.trim()){
            alert("请填写完整信息");
            return;
        }
    }
    var div = document.createElement("div");
    div.className = "title";
    div.innerHTML = inputText[0].value;
    div.style.fontSize = inputText[1].value+"px";
    div.style.color = inputText[2].value;
    div.style.cssText += "padding:4px;border:2px solid red;left:50%;top:50%;transform: translate(-50%, -50%);";
    phone.appendChild(div);
    this.setAttribute("disabled",true);
    editBtn.removeAttribute("disabled");
    dels[2].removeAttribute("disabled");
    inputText.forEach(function (el) {
        el.value = "";
    })
}