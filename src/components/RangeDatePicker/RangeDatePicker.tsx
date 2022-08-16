import * as React from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Popper } from '@mui/material'

export interface RangeDatePickerProps {
  defaultValue: Date
  label: string
  updateState: Function
}

const CustomPopper = (props: any) => {
  return <Popper {...props} />
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
            let newDate = new Date(newValue)
            newDate.setUTCHours(0, 0, 0, 0)
            setValue(newDate)
            updateState(newDate.valueOf())
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
