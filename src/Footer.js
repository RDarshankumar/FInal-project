import React from 'react';
import { Container, Grid, Typography, Link, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#f3f3f3', padding: '20px 0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About
            </Typography>
            <Link href="#" variant="body2" color="textSecondary">
              About LinkedIn
            </Link><br />
            <Link href="#" variant="body2" color="textSecondary">
              Careers
            </Link><br />
            <Link href="#" variant="body2" color="textSecondary">
              Community Guidelines
            </Link><br />
            <Link href="#" variant="body2" color="textSecondary">
              Privacy Policy
            </Link><br />
            <Link href="#" variant="body2" color="textSecondary">
              Terms of Service
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Help Center
            </Typography>
            <Link href="#" variant="body2" color="textSecondary">
              Help Topics
            </Link><br />
            <Link href="#" variant="body2" color="textSecondary">
              Safety Center
            </Link><br />
            <Link href="#" variant="body2" color="textSecondary">
              Support
            </Link><br />
            <Link href="#" variant="body2" color="textSecondary">
              Accessibility
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Link href="#" variant="body2" color="textSecondary">
              Facebook
            </Link><br />
            <Link href="#" variant="body2" color="textSecondary">
              Twitter
            </Link><br />
            <Link href="#" variant="body2" color="textSecondary">
              Instagram
            </Link><br />
            <Link href="#" variant="body2" color="textSecondary">
              YouTube
            </Link>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ textAlign: 'center', padding: '10px', backgroundColor: '#e3e3e3' }}>
        <Typography variant="body2" color="textSecondary">
          © 2024 Linkup Pro. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
