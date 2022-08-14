import React from 'react'
import { ScaleLinear } from 'd3-scale'
export interface SvgAvgLineProps {
  averages: number[]
  size: number
  width: number
  window: number
  scaleY: ScaleLinear<number, number>
  scaleBody: ScaleLinear<number, number>
}

export default ({
  averages,
  size,
  width,
  window,
  scaleY,
  scaleBody,
}: SvgAvgLineProps) => {
  const makePath = (data: number[]) => {
    let x = (0 + window) * width + 0.5
    let y = scaleY(data[0])
    let pathD = ` M  ${x} ${y} `
    pathD += data.map((element: any, index: any) => {
      let x = (index + window) * width + 0.5
      let y = scaleY(element)
      return `L ${x} ${y}  `
    })
    return (
      <path d={pathD} style={{ stroke: 'red', strokeWidth: 1, fill: 'none' }} />
    )
  }
  return makePath(averages)
}
