"use client"

import { useState } from "react"
import { Eye, Code, Brain, BarChart3, Cpu, Filter } from "lucide-react"

const categories = [
  { id: "all", name: "Todos", icon: Filter },
  { id: "vision", name: "Visão Computacional", icon: Eye },
  { id: "nlp", name: "NLP", icon: Brain },
  { id: "timeseries", name: "Séries Temporais", icon: BarChart3 },
  { id: "custom", name: "Modelos Customizados", icon: Cpu },
]

const products = [
  {
    id: 1,
    title: "Detector de Objetos YOLO",
    description: "Implementação otimizada do YOLO v8 para detecção em tempo real",
    category: "vision",
    price: "Grátis",
    code: `import torch
from ultralytics import YOLO

# Carregar modelo pré-treinado
model = YOLO('yolov8n.pt')

# Fazer predição
results = model('image.jpg')

# Processar resultados
for r in results:
    boxes = r.boxes
    for box in boxes:
        print(f"Classe: {box.cls}, Confiança: {box.conf}")`,
    icon: Eye,
  },
  {
    id: 2,
    title: "Análise de Sentimentos BERT",
    description: "Modelo BERT fine-tuned para análise de sentimentos em português",
    category: "nlp",
    price: "Pro",
    code: `from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

# Carregar modelo e tokenizer
tokenizer = AutoTokenizer.from_pretrained('neuralmind/bert-base-portuguese-cased')
model = AutoModelForSequenceClassification.from_pretrained('sentiment-model')

# Analisar sentimento
def analyze_sentiment(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    outputs = model(**inputs)
    predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
    return predictions`,
    icon: Brain,
  },
  {
    id: 3,
    title: "Previsão de Vendas LSTM",
    description: "Rede neural LSTM para previsão de séries temporais de vendas",
    category: "timeseries",
    price: "Premium",
    code: `import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout

# Construir modelo LSTM
model = Sequential([
    LSTM(50, return_sequences=True, input_shape=(60, 1)),
    Dropout(0.2),
    LSTM(50, return_sequences=True),
    Dropout(0.2),
    LSTM(50),
    Dropout(0.2),
    Dense(1)
])

model.compile(optimizer='adam', loss='mean_squared_error')`,
    icon: BarChart3,
  },
  {
    id: 4,
    title: "Classificador de Imagens Custom",
    description: "Template para criar classificadores personalizados com transfer learning",
    category: "custom",
    price: "Pro",
    code: `import tensorflow as tf
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D

# Base model
base_model = ResNet50(weights='imagenet', include_top=False)

# Adicionar camadas customizadas
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(1024, activation='relu')(x)
predictions = Dense(num_classes, activation='softmax')(x)

model = tf.keras.Model(inputs=base_model.input, outputs=predictions)`,
    icon: Cpu,
  },
]

export default function ProductGrid({ onViewCode }: { onViewCode: (code: any) => void }) {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProducts =
    activeCategory === "all" ? products : products.filter((product) => product.category === activeCategory)

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-orbitron mb-4 text-white">Biblioteca de Códigos Neurais</h2>
          <p className="text-xl text-gray-300">Snippets prontos para produção, testados e otimizados</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-neon-blue text-black shadow-lg shadow-neon-blue/30"
                    : "bg-indigo/20 text-indigo hover:bg-indigo/30 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            )
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const Icon = product.icon
            return (
              <div
                key={product.id}
                className="group bg-charcoal rounded-xl p-6 border border-indigo/20 hover:border-cyber-purple transition-all duration-300 hover:shadow-lg hover:shadow-cyber-purple/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="h-8 w-8 text-cyber-purple" />
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      product.price === "Grátis"
                        ? "bg-green-500/20 text-green-400"
                        : product.price === "Pro"
                          ? "bg-neon-blue/20 text-neon-blue"
                          : "bg-cyber-purple/20 text-cyber-purple"
                    }`}
                  >
                    {product.price}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
                <p className="text-gray-300 mb-6">{product.description}</p>

                <button
                  onClick={() => onViewCode(product)}
                  className="w-full bg-indigo/20 text-indigo py-3 rounded-lg font-semibold hover:bg-neon-blue hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-2"
                >
                  <Code className="h-5 w-5" />
                  <span>Visualizar Código</span>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
