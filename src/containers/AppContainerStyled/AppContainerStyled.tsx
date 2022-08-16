import { Paper } from '@mui/material'
import { Typography } from '@mui/material'
import { Grid } from '@mui/material'

interface LayoutProps {
  children: any
  title: string
  background?: any
}

export default ({ children, title, background }: LayoutProps) => {
  return (
    <Grid item>
      <Paper
        sx={{
          padding: '20px',
          border: '6px double #fff',
          backgroundColor: { background },
          boxShadow:
            '0 0 0 3px ' + background + ', 1em 1em 3px 0 rgb(0 0 0 / 50%)',
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
            border: '1px groove black',
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
              color: 'black',
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
