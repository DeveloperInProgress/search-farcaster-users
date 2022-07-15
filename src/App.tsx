import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios, { AxiosInstance } from 'axios';
import { User } from './types';

const App = () => {
  
  const [myOptions, setMyOptions] = useState([] as string[])
  const [search, setSearch] = useState('')
  
  const getDataFromAPI = async () => {
    console.log("Options Fetched from API")

    var data = JSON.stringify({
      query: `{
      users(where: {username_starts_with_nocase: "${search}"}) {
        id
        username
        host
      }
    }`,
      variables: {}
    });
    
    var config = {
      method: 'post',
      url: 'https://api.thegraph.com/subgraphs/name/developerinprogress/farcaster-users',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setMyOptions((response.data.data.users as User[]).map(user => user.username))
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  return (
    <div style={{ marginLeft: '40%', marginTop: '60px' }}>
      <Autocomplete
        style={{ width: 500 }}
        freeSolo
        autoComplete
        autoHighlight
        options={myOptions}
        renderInput={(params: any) => (
          <TextField {...params}
            onChange={(e) => {setSearch(e.target.value); getDataFromAPI();}}
            variant="outlined"
            label="Search Box"
          />
        )}
      />
    </div>
  );
}
  
export default App