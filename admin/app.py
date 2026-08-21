import streamlit as st
import json
from pathlib import Path

CONFIG = Path("admin/config.json")

with open(CONFIG,"r",encoding="utf8") as f:
    datos=json.load(f)

st.set_page_config(
    page_title="Panel Invitación",
    layout="wide"
)

st.title("💍 Invitación Digital")

novia=st.text_input(
    "Nombre Novia",
    datos["novia"]
)

novio=st.text_input(
    "Nombre Novio",
    datos["novio"]
)

fecha=st.text_input(
    "Fecha",
    datos["fecha"]
)

hora=st.text_input(
    "Hora",
    datos["hora"]
)

telefono=st.text_input(
    "WhatsApp",
    datos["telefono"]
)

if st.button("Guardar"):

    datos["novia"]=novia
    datos["novio"]=novio
    datos["fecha"]=fecha
    datos["hora"]=hora
    datos["telefono"]=telefono

    with open(CONFIG,"w",encoding="utf8") as f:

        json.dump(
            datos,
            f,
            indent=4,
            ensure_ascii=False
        )

    st.success("Información guardada correctamente.")