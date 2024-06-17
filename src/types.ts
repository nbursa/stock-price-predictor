export interface Stock {
  _id: string
  name: string
  predictedPrice: number
  actualPrice: number
  accuracy: number
}

export interface PredictionStats {
  accuracy: number
  mostPredictedStock: string
}

export interface TrainData {
  Stock: string
  feature1: number
  feature2: number
  feature3: number
  feature4: number
  target: number
  [key: string]: number | string
}

export interface PredictData {
  Stock: string
  feature1: number
  feature2: number
  feature3: number
  feature4: number
  [key: string]: number | string
}

export interface PastPrediction extends PredictData {
  Prediction: number
  date: string
}
