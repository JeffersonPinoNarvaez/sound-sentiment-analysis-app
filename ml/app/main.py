from fastapi import FastAPI, UploadFile, File
import whisper
from transformers import MarianMTModel, MarianTokenizer, pipeline, AutoTokenizer, AutoModelForSequenceClassification
import uvicorn
import numpy as np
import pandas as pd
import torch
import os

app = FastAPI()

# Cargar el modelo y el tokenizador
output_dir = os.path.join(os.path.dirname(__file__), "model_save")
loaded_tokenizer = AutoTokenizer.from_pretrained(output_dir)
loaded_model = AutoModelForSequenceClassification.from_pretrained(output_dir)

# Cargar los modelos preentrenados
whisper_model = whisper.load_model("small")
translation_model = MarianMTModel.from_pretrained("Helsinki-NLP/opus-mt-es-en")
translation_tokenizer = MarianTokenizer.from_pretrained("Helsinki-NLP/opus-mt-es-en")
#sentiment_analysis = pipeline('sentiment-analysis', model='distilbert-base-uncased-finetuned-sst-2-english')

@app.post("/analyze/")
async def transcribe_translate(file: UploadFile = File(...)):
    # Guardar el archivo subido
    with open("temp_audio_file.mp3", "wb") as buffer:
        buffer.write(file.file.read())

    # Transcribir el audio en español
    result_es = whisper_model.transcribe("temp_audio_file.mp3", language='es')
    transcription_es = result_es['text']

    # Traducir el texto al inglés
    translated = translation_model.generate(**translation_tokenizer(transcription_es, return_tensors="pt", padding=True))
    translation_en = [translation_tokenizer.decode(t, skip_special_tokens=True) for t in translated]

    # Tokenizar la frase de prueba
    test_phrases = [translation_en[0]]
    inputs = loaded_tokenizer(test_phrases, padding=True, truncation=True, return_tensors="pt")

    # Mover los inputs al dispositivo adecuado
    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    loaded_model.to(device)
    inputs = {k: v.to(device) for k, v in inputs.items()}

    # Hacer predicciones
    with torch.no_grad():
        outputs = loaded_model(**inputs)
        predictions = outputs.logits.argmax(dim=-1)

    # Mapeo de los índices de las etiquetas a las clases de sentimiento
    label_map = {0: "Negativa", 1: "Algo negativa", 2: "Neutral", 3: "Algo positiva", 4: "Positiva"}
    sentiment_label = label_map[predictions.item()]

    #return {"transcription_es": transcription_es, "translation_en": translation_en[0]}
    # Analizar el sentimiento del texto traducido
    #sentiment_result = sentiment_analysis(translation_en)[0]

    return {
        "transcription_es": transcription_es,
        # "translation_en": translation_en,
        "sentiment": sentiment_label
    }

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=4000)