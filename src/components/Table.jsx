/** @format */

import React from 'react'
import { Table, Button } from 'reactstrap'
import {
  useQuery,
  useMutation,
} from '@tanstack/react-query'
import { getContacts } from '../api/contacts'
import axios from 'axios'

const API_URL = 'http://localhost:4000/contacts'

export default function TableComponent() {
  // const { isLoading, isSuccess, error, data } = useQuery({
  //   queryKey: ['contacts'],
  //   queryFn: getContacts,
  // })

  // const queryClient = useQueryClient()

  const { data, isError, error, isFetching, isLoading } = useQuery(
    ['contacts'],
    getContacts
  )

  const deleteContact = useMutation((id) => {
    return axios.delete(`${API_URL}/${id}`)
  })

  // const { data, isError, isFetching, isLoading, isSuccess } = query

  // const deleteContact = async (id) => {
  //   const response = await fetch(API_URL + id, {
  //     method: 'DELETE',
  //   })
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok')
  //   }
  //   return response.json()
  // }

  // const { mutate } = useMutation(deleteContact)

  // const handleDelete = (id) => {
  //   mutate(id, {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries('contacts')
  //     },
  //   })
  // }

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error: {isError.message}</div>

  return (
    <>
      <div>{isFetching && 'Background Updating...'}</div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((contact, index) => (
            <tr key={contact.id}>
              <th scope='row'>{index + 1}</th>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.phoneNumber}</td>
              <td>
                <Button
                  type='button'
                  color='danger'
                  onClick={() => {
                    console.log(contact.id)
                    deleteContact.mutate(contact.id)
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
