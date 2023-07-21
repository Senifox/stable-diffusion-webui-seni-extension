import modules.scripts as scripts
import gradio as gr
import os

from modules import shared
from modules import script_callbacks


def on_ui_tabs():
  with gr.Blocks(analytics_enabled=False) as ui_component:
    with gr.Row():
      angle = gr.Slider(
        minimum=0.0,
        maximum=360.0,
        step=1,
        value=0,
        label="Angle"
      )
      checkbox = gr.Checkbox(
        False,
        label="Checkbox"
      )
      # TODO: add more UI components (cf. https://gradio.app/docs/#components)
    return [(ui_component, "Seni Extension", "seni_extension_tab")]

script_callbacks.on_ui_tabs(on_ui_tabs)

def on_ui_settings():
  section = ('seni_extension_settings', "Seni Extension")
  
  # CheckBox for playing an audio file on progress complete
  shared.opts.add_option(
    key = "seni_PlayAudioOnProgressComplete",
    info = shared.OptionInfo
    (
        default = False,
        label = "Play audio when finished.",
        component = gr.Checkbox,
        component_args = {"interactive": True},
        section = section
    )
  )

  # TextBox for the audio file path
  shared.opts.add_option(
    key = "seni_PlayAudioOnProgressCompletePath",
    info = shared.OptionInfo
    (
      default = "http://senifox.de/Sounds/notification.mp3",
      label = "The audio file to play after progress finished.",
      component = gr.Textbox,
      component_args = {"interactive": True},
      section = section
    )
  )

  # Slider for the audio playback volume
  shared.opts.add_option(
    key = "seni_PlayAudioOnProgressCompleteVolume",
    info = shared.OptionInfo
    (
      default = 50,
      label = "The volume.",
      component = gr.Slider,
      component_args = {"minimum": 1, "maximum": 100, "step": 1},
      section = section
    )
  )

  # CheckBox for live preview override when to fetch a preview image
  shared.opts.add_option(
    key = "seni_OverrideProgressBarStandardBehaviourPreview",
    info = shared.OptionInfo
    (
        default = False,
        label = "Override progressbar standard behaviour for when to fetch a preview image.",
        component = gr.Checkbox,
        component_args = {"interactive": True},
        section = section
    )
  )

  # Slider for the progress percentage when to fetch a preview image
  shared.opts.add_option(
    key = "seni_OverrideProgressBarStandardBehaviourPreviewPercentage",
    info = shared.OptionInfo
    (
      default = 10,
      label = "Slider for the progress percentage when to fetch a preview image.",
      component = gr.Slider,
      component_args = {"minimum": 1, "maximum": 100, "step": 1},
      section = section
    )
  )
script_callbacks.on_ui_settings(on_ui_settings)