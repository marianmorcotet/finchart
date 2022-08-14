import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

export type Resolution = '1' | '5' | '15' | '30' | '60' | 'D' | 'W' | 'M'

export interface ResolutionPickerProps {
  defaultValue: ResolutionLabel
  updateState: Function
}

export default (props: ResolutionPickerProps) => {
  const { defaultValue, updateState } = props
  const [value, setValue] = React.useState<ResolutionLabel>(defaultValue)
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={resolutions}
      value={value}
      onChange={(event, value) => {
        if (
          typeof value !== 'undefined' &&
          typeof value?.label !== 'undefined' &&
          typeof value?.value !== 'undefined'
        ) {
          const newResolution: ResolutionLabel = {
            label: value?.label,
            value: value?.value as Resolution,
          }
          setValue(newResolution)
          updateState(newResolution)
        }
      }}
      //   sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Resolution" />}
    />
  )
}
export interface ResolutionLabel {
  label: string
  value: Resolution
}

const resolutions = [
  { label: '1 minute', value: '1' },
  { label: '5 minutes', value: '5' },
  { label: '15 minutes', value: '15' },
  { label: '30 minutes', value: '30' },
  { label: '1 hour', value: '60' },
  { label: 'day', value: 'D' },
  { label: 'week', value: 'W' },
  { label: 'month', value: 'M' },
]
