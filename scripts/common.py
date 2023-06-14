import gradio as gr
import json
from os import path


def buildTab(tab_name: str, d: dict):
    with gr.Tab(tab_name, elem_id=f"promot-tab-{tab_name}"):
        l = []
        for (k, v) in d.items():
            l.append(k + "-" + v)
        gr.CheckboxGroup(l, show_label=False, elem_classes="promot-group", elem_id=f"promot-group-{tab_name}")
        

def buildTabs(type: str):
    for (k, v) in json_data[type].items():
        buildTab(k, v)

### 获取数据
with open(path.join(path.dirname(path.abspath(__file__)), 'data.json'), encoding='utf-8') as f:
    json_data = json.loads(f.read())


def build_ui():
    with gr.Blocks() as ui:
        gr.Markdown("#### 提示词信息")
        with gr.Row():
            gr.Textbox(label="正面", lines=3, elem_id="positive_word_textbox")
            # positive_button = gr.Button("复制")
        with gr.Row():
            gr.Textbox(label="负面", lines=3, elem_id="positive_word_textbox")

        gr.Markdown("#### 选择提示词信息")

        with gr.Blocks():
            gr.Markdown('##### 选择正面提示词信息')
            buildTabs('positive')
        
        return ui