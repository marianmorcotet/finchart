import * as React from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export interface RangeDatePickerProps {
  defaultValue: Date
  label: string
  updateState: Function
}

export default (props: RangeDatePickerProps) => {
  const { defaultValue, label, updateState } = props
  const [value, setValue] = React.useState<Date | null>(defaultValue)

  return typeof props.label !== 'undefined' ? (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={value}
        onChange={(newValue: Date | null) => {
          if (newValue !== null) {
            setValue(newValue)
            updateState(new Date(newValue).valueOf())
          }
        }}
        renderInput={(params) => (
          <TextField sx={{ minWidth: '100%' }} {...params} />
        )}
      />
    </LocalizationProvider>
  ) : (
    <>No label</>
  )
}
