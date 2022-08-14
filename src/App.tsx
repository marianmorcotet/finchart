import React, { useEffect, useState } from 'react'
import { Paper } from '@mui/material'
import logo from './logo.svg'
import './App.css'
import Chart, { size } from './containers/Chart/Chart'
import { ApiCandles } from './components/Candle/Candle'
import TickerInput from './components/TickerInput/TickerInput'
import RangeDatePicker from './components/RangeDatePicker/RangeDatePicker'
import ResolutionPicker, {
  Resolution,
  ResolutionLabel,
} from './components/ResolutionPicker/ResolutionPicker'
import { Grid } from '@mui/material'
import TechnicalIndicators from './components/TechnicalIndicators/TechnicalIndicators'
import AppBar from './containers/AppBar/AppBar'

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
  const [candles, setCandles] = useState<ApiCandles>({
    c: [],
    h: [],
    l: [],
    o: [],
    t: [],
    v: [],
  })
  const [domain, setDomain] = useState<[number, number]>([0, 0])
  const [symbol, setSymbol] = useState('AAPL')
  const [startTime, setStartTime] = useState<number>(defaultStartTime.valueOf())
  const [endTime, setEndTime] = useState<number>(defaultEndTime.valueOf())
  const [resolution, setResolution] =
    useState<ResolutionLabel>(defaultResolution)
  // const caliber = sizeW / candles.length

  useEffect(() => {
    let apiUrl = new URL(
      'https://master.d2gx5laofv9j3n.amplifyapp.com/:3000/api/price/'
    )
    apiUrl.searchParams.append('symbol', symbol)
    apiUrl.searchParams.append('resolution', resolution.value.toString())
    apiUrl.searchParams.append(
      'from',
      startTime.toString().slice(0, startTime.toString().length - 3)
    )
    apiUrl.searchParams.append(
      'to',
      endTime.toString().slice(0, endTime.toString().length - 3)
    )
    fetch(apiUrl)
      .then((response) => {
        return response.json()
      })
      .then((data: ApiCandles) => {
        setCandles(data)
        setDomain(getDomain(data))
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

  return (
    <div className="App">
      <Grid container direction="row" spacing={3} columns={2}>
        <Grid sx={{ minHeight: '100%' }} item>
          <Paper
            sx={{ padding: '10px', backgroundColor: 'silver' }}
            variant="outlined"
            elevation={3}
          >
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <TickerInput index={5} />
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
              <Grid item>
                <TechnicalIndicators />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid sx={{ maxHeight: '100hv' }} item>
          {/* <Paper variant="outlined" elevation={-3}> */}
          {candles.c.length > 0 ? (
            <Chart {...{ candles, domain }}></Chart>
          ) : (
            'No data'
          )}
          {/* </Paper> */}
        </Grid>
      </Grid>
    </div>
  )
}

export default App
