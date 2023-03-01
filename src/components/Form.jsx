/** @format */

import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { addContact } from '../api/contacts'

// const addContact = async (data) => {
//   const response = await fetch('https://localhost:4000/contacts', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//   return response.json()
// }

export default function FormComponent() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  // const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const addContactMutation = useMutation({
    mutationFn: addContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
    },
  })

  const { isLoading, isError, isSuccess, mutate, error } = addContactMutation

  const handleSubmit = (e) => {
    e.preventDefault()
    // isLoading(true)
    mutate({
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for='firstName'>First Name</Label>
        <Input
          id='firstName'
          name='firstName'
          placeholder='First name'
          type='text'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Label for='firstName'>Last Name</Label>
        <Input
          id='lastName'
          name='lastName'
          placeholder='Last name'
          type='text'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Label for='examplephonenumber'>Phone Number</Label>
        <Input
          id='examplePhonenumber'
          name='phoneNumber'
          placeholder='Phone number'
          type='text'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </FormGroup>

      <Button
        color='primary'
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Add'}
      </Button>
    </Form>
  )
}
