# 🌾 AgroEdaphix

**Precision Edaphic Soil Profiling & Agronomic Crop Compatibility Engine**

AgroEdaphix is a precision agriculture platform that utilizes machine learning and agronomic edaphic algorithms to recommend optimal crops, analyze nutrient deficits, and generate custom commercial fertilizer prescriptions based on soil physicochemical parameters.

---

## ⚡ Key Capabilities

- **🧪 Edaphic Machine Learning Prediction**: Evaluates multidimensional soil chemistry vectors (Nitrogen, Phosphorus, Potassium, and pH reaction) against a comprehensive database of 22 agricultural crop profiles.
- **📊 Soil Nutrient Deficit & Gap Analysis**: Visualizes physiological uptake bounds ($N$, $P$, $K$, $\text{pH}$) and quantifies precise elemental deficits ($\text{kg/ha}$) relative to crop-specific requirements.
- **💊 Commercial Fertilizer Prescription Engine**: Automatically calculates exact quantities for standard commercial inputs (Urea $46\%\,\text{N}$, DAP $18\text{-}46\text{-}0$, MOP $60\%\,\text{K}_2\text{O}$, Agricultural Limestone / Gypsum) with multi-unit plot scaling ($\text{Hectares}$, $\text{Acres}$, $\text{m}^2$) and 50 kg bag estimations.
- **🔍 Agronomic Matrix & Comparator**: Side-by-side comparative analysis of multiple crop candidates across soil chemistry tolerances, temperature, rainfall, and relative humidity.
- **📜 Laboratory-Grade Advisory Certificates**: Generates formal, print-ready agronomic reports and CSV test log exports with local persistence.

---

## 🔬 Edaphic & Input Parameters

| Parameter | Symbol | Unit | Typical Range | Agronomic Significance |
|---|---|---|---|---|
| **Available Nitrogen** | $\text{N}$ | $\text{kg/ha}$ | $0 - 140$ | Vegetative growth, chlorophyll synthesis, and protein formation |
| **Available Phosphorus** | $\text{P}$ | $\text{kg/ha}$ | $5 - 145$ | Root elongation, early plant vigor, and flowering/fruiting |
| **Available Potassium** | $\text{K}$ | $\text{kg/ha}$ | $5 - 205$ | Osmotic regulation, disease resistance, and enzymatic activation |
| **Soil Reaction** | $\text{pH}$ | $-\log[\text{H}^+]$ | $3.5 - 9.5$ | Nutrient bioavailability, cation exchange, and microbial activity |

---

## 🛠️ Architecture & Tech Stack

- **Frontend & UI**: React 18, TypeScript, Tailwind CSS v4, Motion
- **Build System**: Vite 6
- **Icons & Visuals**: Lucide React
- **Analytical Models**: Deterministic Weighted Normalized Euclidean Distance Vector Matcher & Multi-nutrient Balance Solver

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or bun

### Installation

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Launch the local development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`.

### Production Build

Compile and bundle for production:
```bash
npm run build
```

---

## 📄 License

MIT
