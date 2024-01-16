import React from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import AxiosClent from './plugins/AxiosClent';
import { useNavigate } from 'react-router-dom';
export default function ModalApp({ open, toggle, roles }) {
    const navigate = useNavigate()
    const handleRole = (e) => {
        e.preventDefault();
        let role = e.target[0].value
        AxiosClent.post("admins/set-role", {
            role: role
        }).then((res) => {
            if (res.status === 202) {
                if (role === "admin") {
                    navigate("/admin");
                } else if (role === "superadmin") {
                    navigate("/super_admin");
                }
            }
        })
    }

    return (
        <Modal isOpen={open} toggle={toggle}>
            <ModalHeader>
                <h2>Select your role</h2>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleRole} id='role'>
                    <select className='form-control'>
                        <option value="" hidden>Select your role</option>
                        {
                            roles?.map((item, index) => {
                                return <option value={item} key={index} >{item}</option>
                            })
                        }
                    </select>
                </form>
            </ModalBody>
            <ModalFooter>
                <button form='role' type='submit' className='btn btn-primary'>save</button>
            </ModalFooter>
        </Modal>
    )
}
