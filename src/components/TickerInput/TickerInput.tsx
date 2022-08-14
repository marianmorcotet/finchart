import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'

export interface ApiSymbol {
  currency: string
  description: string
  displaySymbol: string
  figi: string
  mic: string
  symbol: string
  type: string
}

interface TickerInputProps {
  updateState: Function
}

interface State {
  inputValue: string
  getOptionLabel: Function
}

export default ({ updateState }: TickerInputProps) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<ApiSymbol[]>([])
  const [value, setValue] = useState<ApiSymbol | null>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open && options.length === 0 && !loading) {
      setLoading(true)
      let apiUrl =
        'https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cbpnk6iad3ieg7fat8jg'
      fetch(apiUrl)
        .then((response) => {
          return response.json()
        })
        .then((data: ApiSymbol[]) => {
          setOptions(data)
          setLoading(false)
        })
    }
  }, [open])
  return (
    <Autocomplete
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      isOptionEqualToValue={(option, value) => {
        return option.displaySymbol === value.displaySymbol
      }}
      value={value}
      onChange={(event, value) => {
        // setValue(event)
        console.log('EVENT', event, value)
        updateState(value)
      }}
      getOptionLabel={(option) => option.displaySymbol}
      filterOptions={(options: ApiSymbol[], state: State) => {
        let newOptions: ApiSymbol[] = []

        options.forEach((option: ApiSymbol) => {
          if (
            option.displaySymbol
              .toLocaleLowerCase()
              .includes(state.inputValue.toLocaleLowerCase())
          ) {
            newOptions.push(option)
          }
        })
        return newOptions
      }}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Symbol"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}
