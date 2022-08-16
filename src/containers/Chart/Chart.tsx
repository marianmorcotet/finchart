import React, { useState } from 'react'
import { scaleLinear } from 'd3-scale'

import Candle, {
  ApiCandles as CandleModel,
} from '../../components/Candle/Candle'
import { range } from 'd3'
import SvgAvgLine from '../../components/SvgAvgLine/SvgAvgLine'

export const size = window.innerHeight - 150

interface ChartProps {
  candles: CandleModel
  movingAvg7: boolean
  movingAvg21: boolean
  domain: [number, number]
}

export default ({ candles, movingAvg7, movingAvg21, domain }: ChartProps) => {
  const [cursorY, setCursorY] = useState(0)

  const width = size / candles.o.length
  const scaleY = scaleLinear().domain(domain).range([size, 0])
  const scaleBody = scaleLinear()
    .domain([0, Math.max(...domain) - Math.min(...domain)])
    .range([0, size])

  const onMove = (event: any) => {
    const rect = event.target.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / (rect.right - rect.left)) * size
    const y = ((event.clientY - rect.top) / (rect.bottom - rect.top)) * size

    setCursorY(y)
  }
  const onOut = (event: any) => {
    setCursorY(-20)
  }

  const simpleMovingAverage = (candles: CandleModel, window: number) => {
    if (!candles || candles.c.length < window) {
      return []
    }

    let index = window - 1
    const length = candles.c.length + 1

    const simpleMovingAverages = []

    while (++index < length) {
      const windowSlice = candles.c.slice(index - window, index)
      const sum = windowSlice.reduce((prev: any, curr: any) => prev + curr, 0)
      simpleMovingAverages.push(sum / window)
    }

    return simpleMovingAverages
  }

  return (
    <svg width={size} height={size} onMouseMove={onMove} onMouseLeave={onOut}>
      <rect x={0} y={0} width={size} height={size} fill="#ededed" />
      {range(0, size + 1, size / 5).map((index) => {
        return (
          <>
            <line
              x1={index}
              y1={0}
              x2={index}
              y2={size}
              stroke="black"
              strokeWidth={0.3}
            />
            <line
              x1={0}
              y1={index}
              x2={size}
              y2={index}
              stroke="black"
              strokeWidth={0.3}
            />
          </>
        )
      })}
      {range(0, candles.o.length).map((index) => {
        const candle = {
          date: candles.t[index],
          open: candles.o[index],
          high: candles.h[index],
          low: candles.l[index],
          close: candles.c[index],
          volume: candles.v[index],
        }
        return (
          <Candle
            key={candle.date}
            {...{ candle, index, width, scaleY, scaleBody, size, cursorY }}
          />
        )
      })}
      {range(0, size + 1, size / 5).map((index) => {
        return (
          <>
            <rect
              x={size - 40}
              y={index}
              width={40}
              height={12}
              fill="black"
              fillOpacity={0.3}
            />
            <text x={size - 35} y={index + 9} fontSize={8} fill="white">
              {scaleY.invert(index).toFixed(3)}
            </text>

            {/* <rect
              x={index}
              y={size - 40}
              width={40}
              height={12}
              fill="black"
              fillOpacity={0.3}
            />
            <text x={index + 9} y={size - 35} fontSize={8} fill="white">
              {scaleY.invert(index).toFixed(3)}
            </text> */}
          </>
        )
      })}
      <>
        <line
          x1={0}
          y1={cursorY}
          x2={size}
          y2={cursorY}
          stroke="black"
          strokeWidth={0.3}
        />
        <rect
          x={size - 40}
          y={cursorY}
          width={40}
          height={12}
          fill="black"
          fillOpacity={0.8}
        />
        <text x={size - 35} y={cursorY + 9} fontSize={8} fill="white">
          {scaleY.invert(cursorY).toFixed(3)}
        </text>
      </>
      {movingAvg7 && (
        <SvgAvgLine
          averages={simpleMovingAverage(candles, 7)}
          size={size}
          width={width}
          window={7}
          scaleY={scaleY}
          scaleBody={scaleBody}
        />
      )}
      {movingAvg21 && (
        <SvgAvgLine
          averages={simpleMovingAverage(candles, 21)}
          size={size}
          width={width}
          window={21}
          scaleY={scaleY}
          scaleBody={scaleBody}
        />
      )}
    </svg>
  )
}
