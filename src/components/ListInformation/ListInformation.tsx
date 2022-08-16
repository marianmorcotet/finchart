import React from 'react'
import { List, ListItem, ListItemText } from '@mui/material'
import { ApiSymbol } from '../TickerInput/TickerInput'

export interface ListInformationProps {
  data: ApiSymbol
}

export default (props: ListInformationProps) => {
  let info = JSON.stringify(props.data)
  const regex = /{|}|"/g
  info = info.replace(regex, '')
  let infoLines = info.split(',')
  return (
    <List>
      {infoLines.map((element, index) => {
        return (
          <ListItem key={index}>
            <ListItemText primary={element} />
          </ListItem>
        )
      })}
    </List>
  )
}
