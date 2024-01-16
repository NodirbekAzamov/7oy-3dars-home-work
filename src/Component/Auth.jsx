import React, { useState } from 'react'
import AxiosClent from './plugins/AxiosClent';
import ModalApp from './ModalApp';
import UserModal from './UserModal';

export default function Auth() {
    const [roles, setRoles] = useState([])
    const [modalVisible, setMadalVisible] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        let username = e.target[0].value
        let password = e.target[1].value
        AxiosClent.post("/admins/login", {
            username: username,
            password: password
        }).then((res) => {
            localStorage.setItem("token", res?.data?.token)
            setRoles(res?.data?.roles);
            if(res.status === 202) {
                 setMadalVisible(true)
            } 

        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className='container'>
            <ModalApp open={modalVisible} toggle={()=>setMadalVisible(false)} roles={roles} />
            <div className="row my-5">
                <div className="col-6 offset-3">
                    <div className="card">
                        <div className="card-body">
                            <form id='form' onSubmit={handleSubmit}>
                                <input type="text" placeholder='username' className='form-control my-2' />
                                <input type="password" placeholder='password' className='form-control' />
                            </form>
                        </div>
                        <div className="card-footer">
                            <button className='btn btn-success' form='form'>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
