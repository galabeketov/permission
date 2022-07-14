import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Permissions from '../../components/Permission/Permissions';
import Scopes from '../../components/Permission/Scopes';
function Permission() {
  const [permission, setPermission] = useState([]);
  var config = {
    method: 'get',
    url: 'https://v3.soliqservis.uz:3443/api/permission/tree',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfcGxhdGZvcm1faWQiOiI3ZDRhNGMzOC1kZDg0LTQ5MDItYjc0NC0wNDg4YjgwYTRjMDEiLCJjbGllbnRfdHlwZV9pZCI6IjVhMzgxOGE5LTkwZjAtNDRlOS1hMDUzLTNiZTBiYTFlMmMwMSIsImRhdGEiOiJhZGRpdGlvbmFsIGpzb24gZGF0YSIsImV4cCI6MTY1NzgzODM4OCwiaWF0IjoxNjU3ODA5NTg4LCJpZCI6ImFkYjEwMTg4LTdmM2QtNGFiOC1iNDgzLTMzMzQ5YzNmMTJkMSIsImlwIjoiYWRkaXRpb25hbCBqc29uIGRhdGEiLCJwcm9qZWN0X2lkIjoiZTA0NzY2YmMtMzIyOC00Y2Q5LWJkMjItMDllM2ZhMjdhNmJlIiwicm9sZV9pZCI6ImExY2ExMzAxLTRkYTktNDI0ZC1hOWUyLTU3OGFlNmRjZGUwMSIsInVzZXJfaWQiOiI0YjJmN2RiNi1hYTQ3LTRkNmQtYTQzYi0wZmExMjA4MDg0MWYifQ.YV-MsZw5Kwbnv_F6ALvG7Kx3RW_m30YdfCDU1FFlRFk',
      Accept: 'application/json',
      'platform-id': '7d4a4c38-dd84-4902-b744-0488b80a4c01',
    },
  };

  useEffect(() => {
    axios(config)
      .then(function (response) {
        setPermission(response.data.data.children);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Permissions permissions={permission} />
            </Grid>
            <Grid item xs={6}>
              <Scopes />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Permission;
