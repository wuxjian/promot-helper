// 是否已经初始化
var APP_NAME = '提示词'
var POSITIVE = 'positive'
var NEGATIVE = 'negative'

var hasInit = false

var positiveWords = []
var negativeWords = []

var positiveTextarea // 正面的textarea
var negativeTextarea // 负面的textarea

var positiveCheckBoxs // 正面checkBox
var negativeCheckBoxs // 负面checkBox

var positiveClearbutton // 正面清空btn
var negativeClearbutton // 负面清空btn


window.onload = function() {
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
    var tabs = gradioApp().querySelectorAll('#header .ant-menu-overflow-item')
    if (!tabs || tabs.length == 0) {
        return
    }
    tabs.forEach(function(tab){
        tab.addEventListener('click', function(){
            if (tab.firstChild.innerHTML.trim() == APP_NAME && !hasInit) {
                positiveCheckBoxs = gradioApp().querySelectorAll('#positive_accordion .tabitem fieldset input')
                negativeCheckBoxs = gradioApp().querySelectorAll('#negative_accordion .tabitem fieldset input')
                if (!positiveCheckBoxs || positiveCheckBoxs.length == 0) {
                    return
                }

                positiveTextarea = gradioApp().querySelectorAll('#positive_word_textbox label textarea')[0]
                negativeTextarea = gradioApp().querySelectorAll('#negative_word_textbox label textarea')[0]

                positiveClearbutton = gradioApp().getElementById('positive-clear')
                negativeClearbutton = gradioApp().getElementById('negative-clear')
                // 清空按钮注册事件
                positiveClearbutton.click(clearButtonClickCallback(POSITIVE))
                negativeClearbutton.click(clearButtonClickCallback(NEGATIVE))
                
                // checkbox注册事件
                positiveCheckBoxs.forEach(checkBoxChageCallback(POSITIVE))
                negativeCheckBoxs.forEach(checkBoxChageCallback(NEGATIVE))
                
                
            }
        });
        hasInit = true
        console.log(`[${APP_NAME}]加载 完成...`)
    });
}


function checkBoxChageCallback(type) {
    var arr = positiveWords
    var textarea = positiveTextarea
    if (type == NEGATIVE) {
        arr = negativeWords
        textarea = negativeTextarea
    }
    return function(checkbox) {
        checkbox.addEventListener('change', function(){
            var span =  checkbox.parentNode.children[1]
            var text = span.innerHTML;
            text = text.substring(text.indexOf('-') + 1);
            if (checkbox.checked) {
                arr.push(text)
            } else {
                var index = arr.indexOf(text)
                if (index > -1) {
                    arr.splice(index,1)
                }
            }
            textarea.value = arr.join(', ')
        })
    }
}

function clearButtonClickCallback(type) {
    var arr = positiveWords
    var textarea = positiveTextarea
    var checkBoxs = positiveCheckBoxs
    if (type == NEGATIVE) {
        arr = negativeWords
        textarea = negativeTextarea
        checkBoxs = negativeCheckBoxs
    }
    return function() {
        arr = []
        textarea.value = ''
        checkBoxs.forEach(function(checkbox){
            if (checkbox.checked) {
                checkbox.checked = false
            }
        })
    }
}