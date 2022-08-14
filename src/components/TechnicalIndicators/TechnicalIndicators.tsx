import React, { useEffect } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import { Typography } from '@mui/material'

export interface TechnicalIndicatorsProps {
  set7Moving: Function
  set21Moving: Function
}

export default ({ set7Moving, set21Moving }: TechnicalIndicatorsProps) => {
  const [checked, setChecked] = React.useState([0])

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
      if (value === 0) {
        set7Moving(true)
      } else {
        set21Moving(true)
      }
    } else {
      newChecked.splice(currentIndex, 1)
      if (value === 0) {
        set7Moving(false)
      } else {
        set21Moving(false)
      }
    }
    setChecked(newChecked)
  }
  return (
    <>
      <Typography
        sx={{ textAlign: 'left', paddingLeft: '5px' }}
        variant="overline"
        component="div"
      >
        Technical Indicators:
      </Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {indicators.map((indicator, index) => {
          const labelId = `checkbox-list-label-${index}`

          return (
            <>
              <ListItem key={index} disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(index)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(index) !== -1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={indicators[index]} />
                </ListItemButton>
              </ListItem>
            </>
          )
        })}
      </List>
    </>
  )
}

const indicators = [
  '7 Moving Average',
  '21 Moving Average',
  // '7 EMoving Average',
  // '7 EMoving Average',
]
