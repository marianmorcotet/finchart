import { Grid } from '@mui/material'

interface LayoutProps {
  children: any
}

export default ({ children }: LayoutProps) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      //   spacing={2}
      sx={{ minHeight: '100vh', paddingRight: '30px', paddingLeft: '5px' }}
    >
      {children}
    </Grid>
  )
}
