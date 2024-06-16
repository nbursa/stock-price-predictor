export interface Stock {
  _id: string;
  name: string;
  predictedPrice: number;
  actualPrice: number;
  accuracy: number;
}

export interface PredictionStats {
  accuracy: number;
  mostPredictedStock: string;
}
