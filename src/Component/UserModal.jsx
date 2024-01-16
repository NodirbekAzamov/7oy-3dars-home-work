import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import AxiosClent from './plugins/AxiosClent';

export default function UserModal({ open, toggle, itemId, editUser }) {



    const adduser = (e) => {
        e.preventDefault();
        setTimeout(() => {
            window.location.reload();
        }, 1500)


        let payload = {
            name: e.target[0].value,
            surname: e.target[1].value,
            age: +e.target[2].value,
            is_diploma: true,
            address: e.target[4].value,
        }
        if (itemId !== "") {
            AxiosClent.patch(`/users/update/${itemId}`, { ...payload })
        } else {
            AxiosClent.post("/users/add", { ...payload })
                .catch((err) => {
                    console.log(err);
                })
        }

    }

    return (
        <Modal isOpen={open} toggle={toggle}>
            <ModalHeader>
                <h1>User Modal</h1>
            </ModalHeader>
            <ModalBody>
                <form className='form-control' onSubmit={adduser} id="user">
                    <input type="text" placeholder='name' defaultValue={editUser.name} className='form-control my-1' />
                    <input type="text" placeholder='surname' defaultValue={editUser.surname} className='form-control my-1' />
                    <input type="number" placeholder='age' defaultValue={editUser.age} className='form-control my-1' />
                    <input type="text" placeholder='is diploma' defaultValue={editUser.is_diploma} className='form-control my-1' />
                    <input type="text" placeholder='address' defaultValue={editUser.address} className='form-control my-1' />
                </form>
            </ModalBody>
            <ModalFooter>
                <button form='user' type='submit' className='btn btn-success'>add user</button>
            </ModalFooter>
        </Modal>

    )
}
