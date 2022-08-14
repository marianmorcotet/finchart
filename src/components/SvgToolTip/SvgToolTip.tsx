import React from 'react'
import { Tooltip } from 'react-svg-tooltip'
import { RefObject } from 'react'

export interface SvgToolTipProps {
  refComp: RefObject<SVGRectElement>
  info: string[]
  x: number
  width: number
  size: number
  currentY: number
}

export default function ({
  refComp,
  info,
  x,
  width,
  size,
  currentY,
}: SvgToolTipProps) {
  const TOOLTIPWIDTH = 145
  const TOOLTIPHEIGHT = 75
  const DISTANCEFROMCURSOR = 15
  const TEXTPADDINGX = 10
  const TEXTPADDINGY = 10
  const tooltipXCoord =
    x + width / 2 + TOOLTIPWIDTH < size ? DISTANCEFROMCURSOR : -TOOLTIPWIDTH
  const tooltipYCoord = currentY + TOOLTIPHEIGHT < size ? 1 : -1
  console.log(refComp)
  return (
    <>
      <Tooltip triggerRef={refComp}>
        <rect
          x={
            x + width / 2 + TOOLTIPWIDTH < size
              ? TEXTPADDINGX
              : -TOOLTIPWIDTH - TEXTPADDINGX
          }
          width={TOOLTIPWIDTH}
          y={tooltipYCoord === -1 ? -TOOLTIPHEIGHT - TEXTPADDINGY : 0}
          height={TOOLTIPHEIGHT}
          fill="black"
          fillOpacity={0.3}
        />
        {info.map((line, index) => {
          return (
            <text
              x={tooltipXCoord}
              y={(index + 1) * 10 * tooltipYCoord}
              fontSize={12}
              fill="white"
            >
              {line}
            </text>
          )
        })}
      </Tooltip>
    </>
  )
}
