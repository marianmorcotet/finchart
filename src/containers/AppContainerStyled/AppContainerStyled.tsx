import { Paper } from '@mui/material'
import { Typography } from '@mui/material'
import { Grid } from '@mui/material'

interface LayoutProps {
  children: any
  title: string
  background: string
}

export default ({ children, title, background }: LayoutProps) => {
  const textColor = background === 'silver' ? 'black' : 'white'
  return (
    <Grid item>
      <Paper
        sx={{
          padding: '20px',
          border: '6px double #fff',
          backgroundColor: { background },
          boxShadow:
            '0 0 0 3px ' + background + ', 1em 1em 3px 0 rgb(0 0 0 / 50%)',
          color: textColor,
        }}
        square
        variant="outlined"
        elevation={3}
      >
        <Grid
          item
          container
          direction="column"
          spacing={1}
          sx={{
            border: '1px groove ' + textColor,
            padding: '15px',
            position: 'relative',
          }}
        >
          <Typography
            sx={{
              position: 'absolute',
              paddingLeft: '0px',
              paddingright: '0px',
              top: '-12px',
              backgroundColor: { background },
              color: textColor,
            }}
          >
            {title}
          </Typography>
          {children}
        </Grid>
      </Paper>
    </Grid>
  )
}
