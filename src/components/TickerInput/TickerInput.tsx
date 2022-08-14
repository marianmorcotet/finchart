import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'

interface ApiSymbol {
  currency: string
  description: string
  displaySymbol: string
  figi: string
  mic: string
  symbol: string
  type: string
}

interface TickerInput {
  index: number
}

export default ({ index }: TickerInput) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<ApiSymbol[]>([])
  const [loading, setLoading] = useState(false)

  //   useEffect(() => {
  //     if (options.length === 0 && !loading) {
  //       setLoading(true)
  //       fetch('http://localhost:4001/api/stockSymbols/US')
  //         .then((response) => {
  //           return response.json()
  //         })
  //         .then((data: ApiSymbol[]) => {
  //           console.log('Symbols ', data)
  //           setLoading(false)
  //         })
  //     }
  //   }, [])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      isOptionEqualToValue={(option, value) => option.symbol === value.symbol}
      getOptionLabel={(option) => option.symbol}
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
