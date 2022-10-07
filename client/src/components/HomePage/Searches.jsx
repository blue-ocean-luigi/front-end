import React, { useState, useEffect } from 'react';
import SearchCard from './SearchCard';
import { Grid } from '@chakra-ui/react';

function Searches(props) {

  return (
    <div>
      {props.data.map((search, index) => {
        let name, id, type
        let picture = search.picture
        if (picture === null) {
          picture = 'https://cdn.vox-cdn.com/thumbor/-naXoT1PTZa-nEbqdI5hsbHsIjo=/0x0:1215x717/1520x1013/filters:focal(662x145:856x339):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/52782137/Ahri_Splash_4.0.jpg'
        }

        if (search.user_id !== undefined) {
          name = search.firstname + ' ' + search.lastname
          id = search.user_id
          type = 'users'
        }
        else {
          name = search.name
          id = search.group_id
          type = 'groups'
        }

        return <SearchCard key={index} id={id} name={name} picture={picture} type={type}/>
      })}
    </div>
  )

}

export default Searches;