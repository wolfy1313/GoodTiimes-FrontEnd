import React from 'react'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Client from '../services/api'
import {PartyDetails} from './PartyDetails'

const UserHome = ({user}) => {
const [userParties, setUserParties] = useState()

console.log(user)
let {user_id} = useParams()

const getUserParties = async () => {
  const res = await Client.get(`api/user/${user_id}`)
  console.log(res.data)
  setUserParties(res.data)
}

useEffect(() => {
  getUserParties()
}, [])

  return (
    <div>UserHome</div>
  )
}

export default UserHome