import * as React from 'react';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import axios from 'axios';
import Scopes from '../Scopes';

export default function Permissions({ ...props }) {
  const data = props.permissions;
  const auth =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfcGxhdGZvcm1faWQiOiI3ZDRhNGMzOC1kZDg0LTQ5MDItYjc0NC0wNDg4YjgwYTRjMDEiLCJjbGllbnRfdHlwZV9pZCI6IjVhMzgxOGE5LTkwZjAtNDRlOS1hMDUzLTNiZTBiYTFlMmMwMSIsImRhdGEiOiJhZGRpdGlvbmFsIGpzb24gZGF0YSIsImV4cCI6MTY1NzgzODM4OCwiaWF0IjoxNjU3ODA5NTg4LCJpZCI6ImFkYjEwMTg4LTdmM2QtNGFiOC1iNDgzLTMzMzQ5YzNmMTJkMSIsImlwIjoiYWRkaXRpb25hbCBqc29uIGRhdGEiLCJwcm9qZWN0X2lkIjoiZTA0NzY2YmMtMzIyOC00Y2Q5LWJkMjItMDllM2ZhMjdhNmJlIiwicm9sZV9pZCI6ImExY2ExMzAxLTRkYTktNDI0ZC1hOWUyLTU3OGFlNmRjZGUwMSIsInVzZXJfaWQiOiI0YjJmN2RiNi1hYTQ3LTRkNmQtYTQzYi0wZmExMjA4MDg0MWYifQ.YV-MsZw5Kwbnv_F6ALvG7Kx3RW_m30YdfCDU1FFlRFk';
  const handleClick = (data) => <Scopes data={data} />;
  const drop = (data) => {
    alert('You are droping');
    var config = {
      method: 'delete',
      url: `https://v3.soliqservis.uz:3443/api/permission/${data.id}`,
      headers: {
        Authorization: auth,
        Accept: 'application/json',
        'platform-id': '7d4a4c38-dd84-4902-b744-0488b80a4c01',
        'Content-Type': 'application/json',
      },
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const edit = (data) => {
    let person = prompt('You are editing:', `${data.name}`);
    if (person != null) {
      let model = {
        client_platform_id: data.client_platform_id,
        id: data.id,
        name: person,
        parent_id: data.parent_id,
      };
      var config = {
        method: 'put',
        url: 'https://v3.soliqservis.uz:3443/api/permission',
        headers: {
          Authorization: auth,
          Accept: 'application/json',
          'platform-id': '7d4a4c38-dd84-4902-b744-0488b80a4c01',
          'Content-Type': 'application/json',
        },
        data: model,
      };
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const add = (data) => {
    let person = prompt(`You are adding to ${data.name} component`, '');
    if (person != null) {
      let model = {
        client_platform_id: data.client_platform_id,
        name: person,
        parent_id: data.parent_id,
      };
      var config = {
        method: 'post',
        url: 'https://v3.soliqservis.uz:3443/api/permission',
        headers: {
          Authorization: auth,
          Accept: 'application/json',
          'platform-id': '7d4a4c38-dd84-4902-b744-0488b80a4c01',
          'Content-Type': 'application/json',
        },
        data: model,
      };
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        flexGrow: 1,
        maxWidth: '100%',
        background: 'aliceblue',
      }}>
      <TreeView
        aria-label="disabled items"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        defaultParentIcon={<DeleteIcon />}
        multiSelect>
        {data.map((item) => (
          <TreeItem
            onClick={() => handleClick(item)}
            key={item.id}
            nodeId={item.id}
            label={
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: 9999,
                }}>
                <Box>{item.name}</Box>
                <Box>
                  <IconButton aria-label="delete" onClick={() => drop(item)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="edit" onClick={() => edit(item)}>
                    <ModeIcon />
                  </IconButton>
                  <IconButton aria-label="add" onClick={() => add(item)}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
            }>
            {item.children
              ? item.children.map((item) => (
                  <TreeItem
                    key={item.id}
                    nodeId={item.id}
                    label={
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Box>{item.name}</Box>
                        <Box>
                          <IconButton
                            aria-label="delete"
                            onClick={() => drop(item)}>
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            aria-label="edit"
                            onClick={() => edit(item)}>
                            <ModeIcon />
                          </IconButton>
                          <IconButton
                            aria-label="add"
                            onClick={() => add(item)}>
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    }
                    onClick={() => handleClick(item)}>
                    {item.children
                      ? item.children.map((item) => (
                          <TreeItem
                            onClick={() => handleClick(item)}
                            nodeId={item.id}
                            key={item.id}
                            label={
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                <Box>{item.name}</Box>
                                <Box>
                                  <IconButton
                                    aria-label="delete"
                                    onClick={() => drop(item)}>
                                    <DeleteIcon />
                                  </IconButton>
                                  <IconButton
                                    aria-label="edit"
                                    onClick={() => edit(item)}>
                                    <ModeIcon />
                                  </IconButton>
                                  <IconButton
                                    aria-label="add"
                                    onClick={() => add(item)}>
                                    <AddIcon />
                                  </IconButton>
                                </Box>
                              </Box>
                            }>
                            {item.children
                              ? item.children.map((item) => (
                                  <TreeItem
                                    onClick={() => handleClick(item)}
                                    nodeId={item.id}
                                    key={item.id}
                                    label={
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                        }}>
                                        <Box>{item.name}</Box>
                                        <Box>
                                          <IconButton
                                            aria-label="delete"
                                            onClick={() => drop(item)}>
                                            <DeleteIcon />
                                          </IconButton>
                                          <IconButton
                                            aria-label="edit"
                                            onClick={() => edit(item)}>
                                            <ModeIcon />
                                          </IconButton>
                                          <IconButton
                                            aria-label="add"
                                            onClick={() => add(item)}>
                                            <AddIcon />
                                          </IconButton>
                                        </Box>
                                      </Box>
                                    }>
                                    {item.children
                                      ? item.children.map((i) => (
                                          <TreeItem
                                            key={i.id}
                                            onClick={() => handleClick(i)}
                                            nodeId={i.id}
                                            label={
                                              <Box
                                                sx={{
                                                  display: 'flex',
                                                  justifyContent:
                                                    'space-between',
                                                  alignItems: 'center',
                                                }}>
                                                <Box>{i.name}</Box>
                                                <Box>
                                                  <IconButton
                                                    aria-label="delete"
                                                    onClick={() => drop(i)}>
                                                    <DeleteIcon />
                                                  </IconButton>
                                                  <IconButton
                                                    aria-label="edit"
                                                    onClick={() => edit(i)}>
                                                    <ModeIcon />
                                                  </IconButton>
                                                  <IconButton
                                                    aria-label="add"
                                                    onClick={() => add(i)}>
                                                    <AddIcon />
                                                  </IconButton>
                                                </Box>
                                              </Box>
                                            }
                                          />
                                        ))
                                      : ''}
                                  </TreeItem>
                                ))
                              : ''}
                          </TreeItem>
                        ))
                      : ''}
                  </TreeItem>
                ))
              : ''}
          </TreeItem>
        ))}
      </TreeView>
    </Box>
  );
}
