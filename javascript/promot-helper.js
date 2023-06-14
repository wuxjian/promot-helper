console.log('promoto helper 加载')

var init = false
var positiveWords = []

var positiveDom

window.onload = function() {
    setTimeout(() => {
        debugger
        var tabs = gradioApp().querySelectorAll('#header .ant-menu-overflow-item')
        tabs.forEach(function(tab){
            tab.addEventListener('click', function(){
                if (tab.firstChild.innerHTML.trim() == '提示词扩展' && !init) {
                    var checkBoxs = gradioApp().querySelectorAll('.tabitem fieldset input')
                    if (!checkBoxs) {
                        return
                    }
                    debugger
                    positiveDom = gradioApp().querySelectorAll('#positive_word_textbox label textarea')[0]
                    
                    checkBoxs.forEach(function(checkbox){ 
                        checkbox.addEventListener('change', function(){
                            var span =  checkbox.parentNode.children[1]
                            var text = span.innerHTML;
                            text = text.substring(text.indexOf('-') + 1);
                            if (checkbox.checked) {
                                positiveWords.push(text)
                                
                            } else {
                                var index = positiveWords.indexOf(text)
                                if (index > -1) {
                                    positiveWords.splice(index,1)
                                }
                            }
                            positiveDom.value = positiveWords.join(', ')
                        })
                    })
                    init = true
                }
            })
        });
    }, 20000);

    


    
};