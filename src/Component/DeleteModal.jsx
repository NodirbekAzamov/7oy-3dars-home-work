import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import AxiosClent from './plugins/AxiosClent'

export default function DeleteModal({open, toggle, itemId}) {

    const remove_item =() => {
        AxiosClent.delete(`/users/${itemId}`)
        setTimeout(()=> {
            window.location.reload()
        }, 1500)
    }

  return (
    <Modal isOpen={open} toggle={toggle}>
        <ModalHeader></ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter>
            <button onClick={remove_item} className='btn btn-danger'>Yes</button>
            <button onClick={toggle} className='btn btn-primary' >No</button>
        </ModalFooter>
    </Modal>
  )
}
