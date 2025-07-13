This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Dynamic Packaging Visualizer: Stats & ML Model Usage

### How Stats Are Calculated

The 3D Truck Packaging Visualizer provides real-time statistics to help users understand the efficiency and cost-effectiveness of their packaging strategy. Here’s how each stat is computed:

- **Total Containers:**
  - The number of boxes successfully arranged in the truck bed.
- **Packaging Cost (Uniform):**
  - Assumes every box is packaged with the same (maximum) strength, regardless of its position in the stack. Calculated as:
    - `Uniform Cost = totalBoxes * baseCost * (1 + 0.2 * maxLayer)`
    - Where `baseCost` is a fixed cost per box, and `maxLayer` is the highest layer index in the stack.
- **Packaging Cost (Dynamic):**
  - Adjusts packaging strength based on the box’s layer (bottom, middle, top). Lower layers require stronger packaging due to higher pressure. Calculated as:
    - `Dynamic Cost = sum(baseCost * (1 + 0.2 * layerIndex) for each box)`
- **% Packaging Saved:**
  - The percentage reduction in packaging cost when using dynamic (pressure-aware) packaging compared to uniform packaging.
    - `Packaging Saved = ((Uniform Cost - Dynamic Cost) / Uniform Cost) * 100%`
- **Space Utilization:**
  - The percentage of the truck bed’s volume occupied by the arranged boxes.
    - `Space Utilization = (Total Box Volume / Truck Bed Volume) * 100%`

### ML Model Usage (Current & Planned)

#### Current Implementation
- The current demo uses a rule-based 3D bin-packing algorithm (greedy, layer-by-layer) to arrange boxes in the truck bed. No ML model is used for packing in this version; all stats are computed from the arrangement.

#### Planned ML Model Integrations
- **1. Packing Optimization (Future):**
  - **Model:** Deep Reinforcement Learning (DRL) or Graph Neural Network (GNN)
  - **Purpose:** To learn optimal packing strategies that maximize space utilization and minimize packaging cost, outperforming greedy heuristics.
  - **How Used:** The model will take box dimensions, weights, and truck constraints as input and output the optimal placement sequence.
- **2. Packaging Strength Prediction:**
  - **Model:** Regression model (e.g., XGBoost, Random Forest, or Neural Network)
  - **Purpose:** To predict the required packaging strength for each box based on its position, weight, and the boxes above it.
  - **How Used:** The model will recommend the minimum packaging material needed for each box, reducing waste and cost.
- **3. Damage Risk Estimation:**
  - **Model:** Classification model (e.g., Logistic Regression, SVM, or Neural Network)
  - **Purpose:** To estimate the probability of box damage based on stacking order, box type, and packaging used.
  - **How Used:** The model will flag high-risk arrangements and suggest improvements.

#### Demo Video Notes
- The current stats are calculated using deterministic formulas and a greedy packing algorithm.
- ML models will be integrated in future versions to provide smarter, data-driven recommendations and real-time optimization.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
