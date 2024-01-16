import React, { useEffect, useState } from 'react'
import AxiosClent from './plugins/AxiosClent'
import UserModal from './UserModal'
import DeleteModal from './DeleteModal'

export default function SuperAdminPage({ }) {
    const [users, setUsers] = useState([])
    const [modal, setModal] = useState(false)
    const [itemId, setItemId] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)
    const [editUser, setEditUser] = useState({})

    useEffect(() => {
        AxiosClent.get("/users").then(res => {
            setUsers(res.data.users);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const handleModal = (e) => {
        e.preventDefault();
        setModal(true)
    }

    const remove = (id) => {
        setDeleteModal(true)
        setItemId(id)
    }

    const addEdit = (id) => {
        setItemId(id)
        setModal(true)
        AxiosClent.get(`/users/${id}`).then((res) => {
            setEditUser(res.data.user)
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className='contaner'>
            <UserModal open={modal} toggle={() => setModal(false)} itemId={itemId} editUser={editUser}/>
            <DeleteModal open={deleteModal} toggle={() => setDeleteModal(false)} itemId={itemId} />
            <div className="row">
                <div className="col-3 offset-2">
                    <button onClick={handleModal} className='btn btn-primary my-2'>add user</button>
                </div>
            </div>
            <div className="row">
                <div className="col-8 offset-2">
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>T/R</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Age</th>
                                <th>is_diploma</th>
                                <th>address</th>
                                <th>edit</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.surname}</td>
                                        <td>{item.age}</td>
                                        <td>{item.is_diploma ? "true" : "false"}</td>
                                        <td>{item.address}</td>
                                        <td><button onClick={() => addEdit(item._id)} className='btn btn-info'>edit</button></td>
                                        <td><button onClick={() => remove(item._id)} className='btn btn-danger'>delete</button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
