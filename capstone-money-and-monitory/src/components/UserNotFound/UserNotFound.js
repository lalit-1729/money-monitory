import React from 'react'
import { Container, Paper, Typography } from '@mui/material'

export default function UserNotFound() {
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Account Number is invalid.
          </Typography>
        </Paper>
      </Container>
  )
}
