import React from 'react'
import { ScaleLinear } from 'd3-scale'
import { Tooltip } from 'react-svg-tooltip'
import './Candle.css'
// import { Line, Rect } from "react-native-svg";

const MARGIN = 0.5

export interface ApiCandles {
  c: number[]
  h: number[]
  l: number[]
  o: number[]
  t: number[]
  v: number[]
}

export interface Candle {
  date: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface CandleProps {
  candle: Candle
  index: number
  width: number
  scaleY: ScaleLinear<number, number>
  scaleBody: ScaleLinear<number, number>
}

export default ({ candle, index, width, scaleY, scaleBody }: CandleProps) => {
  const { date, close, open, high, low, volume } = candle
  const fill = close > open ? '#4AFA9A' : '#E33F64'
  const x = index * width
  const max = Math.max(open, close)
  const min = Math.min(open, close)

  const rectRef = React.createRef<SVGRectElement>()
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return (
    <>
      <line
        x1={x + width / 2}
        y1={scaleY(low)}
        x2={x + width / 2}
        y2={scaleY(high)}
        stroke={fill}
        strokeWidth={1}
      />
      <rect
        ref={rectRef}
        className="candle"
        x={x + MARGIN}
        y={scaleY(max)}
        width={width - MARGIN * 2}
        height={scaleBody(max - min)}
        {...{ fill }}
      />
      <Tooltip triggerRef={rectRef}>
        <rect x={10} width={135} height={75} fill="black" fillOpacity={0.3} />

        <text x={15} y={10} fontSize={12} fill="white">
          date:{' '}
          {months[new Date(date).getMonth()] +
            ' ' +
            new Date(date).getUTCDate()}
        </text>
        <text x={15} y={20} fontSize={12} fill="white">
          time: {new Date(date).getUTCHours()}:{new Date(date).getUTCMinutes()}:
          {new Date(date).getUTCSeconds()}
        </text>
        <text x={15} y={30} fontSize={12} fill="white">
          open: {open.toFixed(3)}
        </text>
        <text x={15} y={40} fontSize={12} fill="white">
          close: {close.toFixed(3)}
        </text>
        <text x={15} y={50} fontSize={12} fill="white">
          low: {low.toFixed(3)}
        </text>
        <text x={15} y={60} fontSize={12} fill="white">
          high: {high.toFixed(3)}
        </text>
        <text x={15} y={70} fontSize={12} fill="white">
          volume: {volume.toFixed(3)}
        </text>
      </Tooltip>
    </>
  )
}
