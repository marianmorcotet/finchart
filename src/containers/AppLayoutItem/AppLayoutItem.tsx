import { Grid } from '@mui/material'

interface LayoutProps {
  children: any
  xs?: number
}

export default ({ children, xs }: LayoutProps) => {
  return (
    <Grid
      item
      xs={xs}
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      {children}
    </Grid>
  )
}
