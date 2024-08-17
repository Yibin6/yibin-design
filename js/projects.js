// 获取变量 ------------------------------------------------------

// hero选择按钮
const hero_btn = document.querySelectorAll(".hero__list .btn");

// 所有项目
const project = document.querySelectorAll(".project");

// 所有ID项目
const project_ID = document.querySelectorAll(".project--ID");

// 所有UI项目
const project_UI = document.querySelectorAll(".project--UI");

// --------------------------------------------------------------





// hero选择按钮 点击切换样式 --------------------------------------------

// 监听hero选择按钮点击
for (let i = 0; i < hero_btn.length; i++) {
    hero_btn[i].addEventListener("click", () => {
        setHeroBtnStyle(i);
        projectDisplay(i);
    })
}

// 设置hero选择按钮样式
function setHeroBtnStyle(value) {
    for (let j = 0; j < hero_btn.length; j++) {
        hero_btn[j].className = "btn btn--primary-outline";
    }
    hero_btn[value].classList.toggle("btn--primary-outline");
    hero_btn[value].classList.add("btn--primary", "active");
}

// 设置project grid显示内容
function projectDisplay(value) {
    if (value === 0) {
        allProjectShow();
    } else if (value === 1) {
        allProjectShow();
        for (let k = 0; k < project_UI.length; k++) {
            project_UI[k].classList.remove("fade-in");
            project_UI[k].classList.add("fade-out");
            setTimeout(() => { project_UI[k].classList.add("hidden") }, 300);
        }
    } else if (value === 2) {
        allProjectShow();
        for (let k = 0; k < project_ID.length; k++) {
            project_ID[k].classList.remove("fade-in");
            project_ID[k].classList.add("fade-out");
            setTimeout(() => { project_ID[k].classList.add("hidden") }, 300);
        }
    }
}

function allProjectShow() {
    for (let k = 0; k < project.length; k++) {
        project[k].classList.remove("hidden", "fade-out");
        project[k].classList.add("fade-in");
    }
}

// --------------------------------------------------------------