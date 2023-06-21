// 是否已经初始化
var APP_NAME = '提示词'
var POSITIVE = 'positive'
var NEGATIVE = 'negative'

var hasInit = false

var positiveWords = []

var positiveTextarea // 正面的textarea

var positiveCheckBoxs // 正面checkBox

var positiveClearbutton // 正面清空btn


window.onload = function () {
    console.log(`[${APP_NAME}]加载...`)
    var promotoHelperTimer = setInterval(() => {
        if (hasInit) {
            clearInterval(promotoHelperTimer)
            return
        }
        doInit()
    }, 1500);
};

function doInit() {
    if (hasInit) {
        return
    }
    var tabs = gradioApp().querySelectorAll('#tabs button')
    if (!tabs || tabs.length == 0) {
        return
    }
    positiveCheckBoxs = gradioApp().querySelectorAll('#promot_accordion .tabitem fieldset input')
    if (!positiveCheckBoxs || positiveCheckBoxs.length == 0) {
        return
    }

    positiveTextarea = gradioApp().querySelectorAll('#positive_word_textbox textarea')[0]

    positiveClearbutton = gradioApp().getElementById('positive-clear')
    txt2img = gradioApp().getElementById('promot-txt2img')
    img2img = gradioApp().getElementById('promot-img2img')
    txt2img.addEventListener('click', function(){
        gradioApp().querySelectorAll('#header .ant-menu-overflow-item')[0].click()
        gradioApp().querySelectorAll('#txt2img_prompt textarea')[0].value = positiveTextarea.value
    })
    img2img.addEventListener('click', function(){
        gradioApp().querySelectorAll('#header .ant-menu-overflow-item')[1].click()
        gradioApp().querySelectorAll('#img2img_prompt textarea')[0].value = positiveTextarea.value
    })
    // 清空按钮注册事件
    positiveClearbutton.addEventListener('click', clearButtonClickCallback())

    // checkbox注册事件
    positiveCheckBoxs.forEach(checkBoxChageCallback())
    hasInit = true
    console.log(`[${APP_NAME}]加载 完成...`)
}


function checkBoxChageCallback() {
    return function (checkbox) {
        checkbox.addEventListener('change', function () {
            var span = checkbox.parentNode.children[1]
            var text = span.innerHTML;
            text = text.substring(text.indexOf('-') + 1);
            if (checkbox.checked) {
                positiveWords.push(text)
            } else {
                var index = positiveWords.indexOf(text)
                if (index > -1) {
                    positiveWords.splice(index, 1)
                }
            }
            positiveTextarea.value = positiveWords.join(', ')
        })
    }
}

function clearButtonClickCallback() {
    return function () {
        positiveWords = []
        positiveTextarea.value = ''
        positiveCheckBoxs.forEach(function (checkbox) {
            if (checkbox.checked) {
                checkbox.checked = false
            }
        })
    }
}