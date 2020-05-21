export const INTRADAY_INTERVALS = {
  1: {
    label: '1 min',
    value: '1min'
  },
  5: {
    label: '5 min',
    value: '5min'
  },
  15: {
    label: '15 min',
    value: '15min'
  },
  30: {
    label: '30 min',
    value: '30min'
  },
  60: {
    label: '60 min',
    value: '60min'
  }
}
export const STOCK_DATA_INTERVAL_TYPES = {
  Daily: {
    label: 'Daily',
    value: 'TIME_SERIES_DAILY'
  },
  Intraday:
    {
      label: 'Intraday',
      value: 'TIME_SERIES_INTRADAY'
    },
  Weekly:
    {
      label: 'Weekly',
      value: 'TIME_SERIES_WEEKLY'
    },
  Monthly: {
    label: 'Monthly',
    value: 'TIME_SERIES_MONTHLY'
  }
}
export const GRAPH_COMPONENT_TYPE = {
  Plotify: {
    label: 'Plotify',
    value: 'plotify'
  },
  d3: {
    label: 'D3',
    value: 'd3'
  }
}
export const GRAPH_TYPE = {
  Candlesticks: {
    label: 'Candlesticks',
    value: 'candlesticks'
  },
  Line: {
    label: 'Line',
    value: 'line'
  }
}

export const ALPHA_VENTAGE_TRANSLATE = {
  monthly: 'Monthly Time Series',
  daily: 'Time Series (Daily)',
  intraday: (interval) => `Time Series (${interval})`,
  weekly: 'Weekly Time Series',
  getInfo: (data) => data['Meta Data']['1. Information'],
  getSymbol: (data) => data['Meta Data']['2. Symbol'],
  getLastRefreshed: (data) => data['Meta Data']['3. Last Refreshed'],
  getTimezone: (data) => data['Meta Data']['5. Time Zone'] || data['Meta Data']['4. Time Zone'],
  getOpen: (data, key) => +data[key]['1. open'],
  getClose: (data, key) => +data[key]['4. close'],
  getHigh: (data, key) => +data[key]['2. high'],
  getVolume: (data, key) => +data[key]['5. volume'],
  getLow: (data, key) => +data[key]['3. low'],
  getSearchName: (data) => data['2. name'],
  getSearchLocation: (data) => data['4. region'],
  getSearchTimezone: (data) => data['7. timezone'],
  getSearchCurrency: (data) => data['8. currency'],
  getSearchSymbol: (data) => data['1. symbol'],
  getError: (data) => data.data['Error Message'],
  getNote: (data) => data.data.Note,
  searchDefaultError: 'Something went wrong',
  defaultError: 'Something went wrong'
}
