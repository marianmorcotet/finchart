import React from 'react'
import { ScaleLinear } from 'd3-scale'
import './Candle.css'
import SvgToolTip from '../SvgToolTip/SvgToolTip'
import { customGetDate } from '../../utils'

const MARGIN = 0.5
export interface ApiCandles {
  c: number[]
  h: number[]
  l: number[]
  o: number[]
  t: number[]
  v: number[]
  s?: string
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
  size: number
  cursorY: number
}

export default ({
  candle,
  index,
  width,
  scaleY,
  scaleBody,
  size,
  cursorY,
}: CandleProps) => {
  const { date, close, open, high, low, volume } = candle
  const fill = close > open ? '#4AFA9A' : '#E33F64'
  const x = index * width
  const max = Math.max(open, close)
  const min = Math.min(open, close)
  const maxHover = Math.max(low, high)
  const minHover = Math.min(low, high)

  const rectRef = React.createRef<SVGRectElement>()
  let info = []
  info = customGetDate(date)
  info.push(
    'open: ' + open.toFixed(3),
    'close: ' + close.toFixed(3),
    'low: ' + low.toFixed(3),
    'high: ' + high.toFixed(3),
    'volume: ' + volume.toFixed(3)
  )
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
        className="candle"
        x={x + MARGIN}
        y={scaleY(max)}
        width={width - MARGIN * 2}
        height={scaleBody(max - min)}
        {...{ fill }}
      />
      <rect
        ref={rectRef}
        opacity={0}
        className="candle"
        x={x + MARGIN}
        y={scaleY(maxHover)}
        width={width - MARGIN * 2}
        height={scaleBody(maxHover - minHover)}
      />
      <SvgToolTip
        refComp={rectRef}
        info={info}
        x={x}
        width={width}
        size={size}
        currentY={cursorY}
      />
    </>
  )
}
