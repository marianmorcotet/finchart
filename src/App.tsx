import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import './App.css'
import Chart, { size } from './containers/Chart/Chart'
import { ApiCandles } from './components/Candle/Candle'
import TickerInput, { ApiSymbol } from './components/TickerInput/TickerInput'
import RangeDatePicker from './components/RangeDatePicker/RangeDatePicker'
import ResolutionPicker, {
  ResolutionLabel,
} from './components/ResolutionPicker/ResolutionPicker'
import { Grid } from '@mui/material'
import TechnicalIndicators from './components/TechnicalIndicators/TechnicalIndicators'
import AppLayout from './containers/AppLayout/AppLayout'
import AppLayoutItem from './containers/AppLayoutItem/AppLayoutItem'
import AppContainerStyled from './containers/AppContainerStyled/AppContainerStyled'
import ListInformation from './components/ListInformation/ListInformation'

const theme = createTheme({
  typography: {
    fontFamily: ['System', 'monospace'].join(','),
  },
})

const getDomain = (candles: ApiCandles): [number, number] => {
  return [Math.min(...candles.l), Math.max(...candles.h)]
}

const sliceCandles = (
  candles: ApiCandles,
  from: number,
  to: number
): ApiCandles => {
  return {
    c: candles.c.slice(from, to),
    h: candles.h.slice(from, to),
    l: candles.l.slice(from, to),
    o: candles.o.slice(from, to),
    t: candles.t.slice(from, to),
    v: candles.v.slice(from, to),
  }
}

function App() {
  const defaultEndTime: Date = new Date()
  let intermediateDate = new Date()
  intermediateDate.setMonth(
    intermediateDate.getMonth() > 0 ? intermediateDate.getMonth() - 1 : 11
  )
  const defaultStartTime: Date = intermediateDate
  const defaultResolution: ResolutionLabel = { label: 'day', value: 'D' }
  const defaultCandles: ApiCandles = {
    c: [],
    h: [],
    l: [],
    o: [],
    t: [],
    v: [],
  }
  const [candles, setCandles] = useState<ApiCandles>(defaultCandles)
  const [domain, setDomain] = useState<[number, number]>([0, 0])
  const [symbol, setSymbol] = useState<ApiSymbol>()
  const [startTime, setStartTime] = useState<number>(defaultStartTime.valueOf())
  const [endTime, setEndTime] = useState<number>(defaultEndTime.valueOf())
  const [resolution, setResolution] =
    useState<ResolutionLabel>(defaultResolution)
  const [movingAvg7, setMovingAvg7] = useState<boolean>(true)
  const [movingAvg21, setMovingAvg21] = useState<boolean>(false)
  // const caliber = sizeW / candles.length
  useEffect(() => {
    let apiUrl =
      'https://finnhub.io/api/v1/stock/candle?' +
      'symbol=' +
      symbol?.symbol +
      '&resolution=' +
      resolution.value.toString() +
      '&from=' +
      Math.floor(startTime / 1000).toString() +
      '&to=' +
      Math.floor(endTime / 1000).toString() +
      '&token=cbpnk6iad3ieg7fat8jg'

    fetch(apiUrl)
      .then((response) => {
        return response.json()
      })
      .then((data: ApiCandles) => {
        if (data.s !== 'no_data') {
          setCandles(data)
          setDomain(getDomain(data))
        } else {
          setCandles(defaultCandles)
        }
      })
  }, [symbol, startTime, endTime, resolution])

  const setStartTimeState = (newTimestamp: number) => {
    setStartTime(newTimestamp)
  }
  const setEndTimeState = (newTimestamp: number) => {
    setEndTime(newTimestamp)
  }
  const setResolutionState = (newResolution: ResolutionLabel) => {
    setResolution(newResolution)
  }
  const setSymbolState = (newSymbol: ApiSymbol) => {
    setSymbol(newSymbol)
  }
  const set7Moving = (val: boolean) => {
    setMovingAvg7(val)
  }
  const set21Moving = (val: boolean) => {
    setMovingAvg21(val)
  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppLayout>
          <AppLayoutItem xs={3}>
            <AppContainerStyled title="Chart actions" background="silver">
              <Grid item>
                <TickerInput updateState={setSymbolState} />
              </Grid>
              <Grid item>
                <RangeDatePicker
                  defaultValue={defaultStartTime}
                  label="Start period"
                  updateState={setStartTimeState}
                />
              </Grid>
              <Grid item>
                <RangeDatePicker
                  defaultValue={defaultEndTime}
                  label="End period"
                  updateState={setEndTimeState}
                />
              </Grid>
              <Grid item>
                <ResolutionPicker
                  defaultValue={defaultResolution}
                  updateState={setResolutionState}
                />
              </Grid>
            </AppContainerStyled>
            <AppContainerStyled
              title="Technical Indicators"
              background="silver"
            >
              <TechnicalIndicators
                set7Moving={set7Moving}
                set21Moving={set21Moving}
              />
            </AppContainerStyled>
          </AppLayoutItem>

          <AppLayoutItem xs={6}>
            <AppContainerStyled title="Chart" background="silver">
              {candles.c.length > 0 ? (
                <Chart
                  {...{ candles, movingAvg7, movingAvg21, domain }}
                ></Chart>
              ) : (
                'No data'
              )}
            </AppContainerStyled>
          </AppLayoutItem>
          <AppLayoutItem xs={3}>
            <AppContainerStyled title="Company" background="#3465a4">
              {symbol && <ListInformation data={symbol}></ListInformation>}
            </AppContainerStyled>
          </AppLayoutItem>
        </AppLayout>
      </ThemeProvider>
    </div>
  )
}

export default App
