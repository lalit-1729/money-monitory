import { Container, Paper, Typography } from '@mui/material'
import React from 'react'

export default function InsufficientBalance() {
  return (
    <React.Fragment>

      {/* <Typography variant="h6" gutterBottom>
        Transaction Declined due to Insufficient Balance
      </Typography> */}

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Transaction Failed due to Insufficient Balance
          </Typography>
        </Paper>
      </Container>


    </React.Fragment>
  )
}
