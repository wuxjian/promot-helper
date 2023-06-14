import imp
import gradio as gr
import modules.scripts as scripts
from modules import script_callbacks

from common import build_ui


app_name = '提示词'

def on_ui_tabs():
    with gr.Blocks(analytics_enabled=False) as ui_component:
        build_ui()
        return [(ui_component, app_name, app_name)]

script_callbacks.on_ui_tabs(on_ui_tabs)




    