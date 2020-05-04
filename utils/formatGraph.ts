type DataType = {
  日付: Date
  小計: number
}

export type GraphDataType = {
  label: string
  transition: number
  transition_ma: number
  cumulative: number
}

/**
 * Format for *Chart component
 *
 * @param data - Raw data
 */
export default (data: DataType[]) => {
  const graphData: GraphDataType[] = []
  const today = new Date()
  let patSum = 0
  let ma_delay1 = 0
  let ma_delay2 = 0
  let ma_delay3 = 0
  let ma_delay4 = 0
  let ma_delay5 = 0
  let ma_delay6 = 0
  let transition_ma = 0

  data
    .filter(d => new Date(d['日付']) < today)
    .forEach(d => {
      const date = new Date(d['日付'])
      const subTotal = d['小計']
      if (!isNaN(subTotal)) {
        patSum += subTotal
        transition_ma = (subTotal + ma_delay1 + ma_delay2 + ma_delay3 + ma_delay4 + ma_delay5 + ma_delay6) / 7
        ma_delay6 = ma_delay5
        ma_delay5 = ma_delay4
        ma_delay4 = ma_delay3
        ma_delay3 = ma_delay2
        ma_delay2 = ma_delay1
        ma_delay1 = subTotal
        graphData.push({
          label: `${date.getMonth() + 1}/${date.getDate()}`,
          transition: subTotal,
          transition_ma: transition_ma,
          cumulative: patSum
        })
      }
    })
  return graphData
}
