import gradio as gr
import json
from os import path


def buildTab(tab_name: str, d: dict):
    with gr.Tab(tab_name, elem_id=f"promot-tab-{tab_name}"):
        l = []
        for (k, v) in d.items():
            l.append(k + "-" + v)
        gr.CheckboxGroup(l, show_label=False, elem_classes="promot-group", elem_id=f"promot-group-{tab_name}")
        

def buildTabs(type: str, label: str):
    with gr.Accordion(label, open=True, elem_id=f"{type}_accordion"):
        for (k, v) in json_data[type].items():
            buildTab(k, v)

### 获取数据
with open(path.join(path.dirname(path.abspath(__file__)), 'data.json'), encoding='utf-8') as f:
    json_data = json.loads(f.read())


def build_ui():
    with gr.Blocks() as ui:
        gr.Markdown("#### 提示词信息")
        with gr.Column():
            gr.Textbox(label="正面", lines=3, elem_id="positive_word_textbox")
            with gr.Row():
                gr.Button("发送到文生图", elem_id='positive-send-txt2img')
                gr.Button("发送到图生图", elem_id='positive-send-img2img')
                gr.Button("清空", elem_id='positive-clear')
        with gr.Column():
            gr.Textbox(label="负面", lines=3, elem_id="negative_word_textbox")
            with gr.Row():
                gr.Button("发送到文生图", elem_id='negative-send-txt2img')
                gr.Button("发送到图生图", elem_id='negative-send-img2img')
                gr.Button("清空", elem_id='negative-clear')

        with gr.Blocks():
            buildTabs('positive', '正面提示词')
        
        with gr.Blocks():
            buildTabs('negative', '负面提示词')

        return ui