import $ from './jquery-3.7.1';
import './jquery.i18n.properties';
window.$ = window.jQuery = $;

// 获取变量 ------------------------------------------------------

// 获取当前时间
const date = new Date();
const year = date.getFullYear();

// 获取url路径
const pathname = window.location.pathname;

// logo和语言设置模块 用于滚动隐藏
const logo = document.querySelector(".nav__yibin");
const lang = document.querySelector(".nav__lang");

// 经验年份
const experience = document.querySelectorAll(".experience");

// 当前年份
const current_year = document.querySelectorAll(".current-year");

// nav bar
const nav = document.querySelector(".nav");

// nav按钮
const nav_btn = document.querySelectorAll(".nav__list .btn");

// nav list item
const navList_item = document.querySelectorAll(".nav__list .nav__item");

// contact按钮
const navContact_btn = document.querySelector("#contact-btn");

// contact模块
const contact = document.querySelector(".contact");

// contact子元素
const contact_child = document.querySelectorAll(".contact .fade-out");

// contact关闭按钮
const contact_close = document.querySelector(".contact__close");

// footer里面所有contact按钮
const footerContact_btn = document.querySelectorAll(".footer__section a");

// toggler checkbox
const toggler = document.querySelector("#toggler");

// block description
const description = document.querySelectorAll(".block--description");

// --------------------------------------------------------------





// 设置年份自动更新 ------------------------------------------------

// 遍历experience 自动更新经验
for (let item of experience)
    item.innerHTML = year - 2014;

// 遍历current_year 自动更新当前年份
for (let item of current_year)
    item.innerHTML = year;

// --------------------------------------------------------------





// Nav按钮 点击切换样式 --------------------------------------------

// 监听Nav按钮点击
for (let i = 0; i < nav_btn.length; i++) {
    nav_btn[i].addEventListener("click", () => {
        setNavBtnStyle(i);
        // contact页面 显示/隐藏
        contactSelector(i == nav_btn.length - 1)
    })
}

// 设置Nav按钮样式
function setNavBtnStyle(value) {
    for (let j = 0; j < navList_item.length; j++) {
        navList_item[j].className = "nav__item";
    }
    navList_item[value].classList.add("nav__item", "active");
}

// --------------------------------------------------------------





// Contact页面 显示/隐藏-------------------------------------------

// 判断是否显示Contact页面 -> true即显示，否则隐藏
function contactSelector(boolean) {
    if (boolean) {
        // 显示contact页面时 关闭mobile nav
        if (toggler.checked) toggler.click();

        contact.classList.remove("zero-width");
        for (let i = 0; i < contact_child.length; i++) {
            contact_child[i].classList.remove("fade-out");
            contact_child[i].classList.add("fade-in");
        }
    }
    else {
        contact.classList.add("zero-width");
        for (let i = 0; i < contact_child.length; i++) {
            contact_child[i].classList.remove("fade-in");
            contact_child[i].classList.add("fade-out");
        }
    }
}

// contact页面 关闭按钮逻辑
contact_close.addEventListener("click", () => {
    contactSelector(false);
    if (pathname == "/" || pathname == "/index.html") {
        setNavBtnStyle(0);
    } else {
        setNavBtnStyle(1);
    }
});

// 点击空白区域关闭页面
$(document).mouseup(function (e) {
    var _con = $('.contact');
    if (!_con.is(e.target) && _con.has(e.target).length === 0) {
        contact_close.click();
    }
});

// footer的所有contact按钮 和 nav的contact按钮 绑定
for (let i = 0; i < footerContact_btn.length; i++) {
    footerContact_btn[i].addEventListener("click", (e) => { navContact_btn.click() });
}

// --------------------------------------------------------------





// 设置语言 ------------------------------------------------------

const language_EN = document.getElementById("en-US");
const language_ZH = document.getElementById("zh-CN");

// 判断是否为中文 设置语言 参数保存本地
function languageSelector(type) {
    if (type == 'zh_CN') {
        language_EN.dataset.selected = false;
        language_ZH.dataset.selected = true;
        localStorage.setItem("language", "zh_CN");
        loadProperties('zh');
    } else {
        language_EN.dataset.selected = true;
        language_ZH.dataset.selected = false;
        localStorage.setItem("language", "en_US");
        loadProperties('en');
    }
}

// 监控按钮点击
language_EN.addEventListener("click", () => languageSelector('en_US'));
language_ZH.addEventListener("click", () => languageSelector('zh_CN'));

// --------------------------------------------------------------





// 滚动隐藏logo和语言设置模块 ---------------------------------------

// toTop 第一个模块离页面可视区域上边的距离 
function hideNav(toTop) {
    if (toTop < -100) {
        logo.classList.replace("fade-in", "fade-out");
        lang.classList.replace("fade-in", "fade-out");
    } else {
        logo.classList.replace("fade-out", "fade-in");
        lang.classList.replace("fade-out", "fade-in");
    }
}

// --------------------------------------------------------------





// 黑色产品页 nav与nav--white切换 ---------------------------------------

function navSwitch() {
    const descToTop = description[0].getBoundingClientRect().top;

    if (descToTop < 0) {
        nav.classList.replace("nav--white", "nav--switch");
    } else {
        nav.classList.replace("nav--switch", "nav--white");
    }
}

// --------------------------------------------------------------





// jquery ready -------------------------------------------------

jQuery(document).ready(function () {
    const storageLanguage = localStorage.language;
    const browserLanguage = navigator.language; //获取浏览器的语言

    // 页面打开 判断是否有本地储存的语言参数 
    if (storageLanguage != null) {
        languageSelector(storageLanguage);
    } else {
        languageSelector(browserLanguage);
    }
});

// --------------------------------------------------------------





// window onscroll ----------------------------------------------

window.onscroll = function () {

    // 通过判断url长度判断是什么页面 大于2为产品页
    if (pathname.split('/').length > 2) {
        // 获取bannerToTop离页面可视区域上边的距离 
        const bannerToTop = document.querySelector(".block--banner").getBoundingClientRect().top;
        hideNav(bannerToTop);

        if (nav.classList.length > 1) navSwitch();
    } else {
        // 获取hero离页面可视区域上边的距离 
        const heroToTop = document.querySelector(".block--hero").getBoundingClientRect().top;
        hideNav(heroToTop);
    }
}

// --------------------------------------------------------------





// jquery.i18n 功能接口 ------------------------------------------

function loadProperties(type) {
    jQuery.i18n.properties({
        name: 'strings', // 资源文件名称
        path: '/i18n/', // 资源文件所在目录路径
        mode: 'map', // 模式：变量或 Map
        language: type, // 对应的语言 -> name + type = 文件名
        cache: false,
        encoding: 'UTF-8',
        callback: function () { // 回调方法  
            $("[data-lang]").each(function () {
                $(this).html($.i18n.prop($(this).data("lang")));
            });
        }
    });
}

// --------------------------------------------------------------