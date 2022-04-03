import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const EditUser = () => {
    let [name, setName] = useState();
    let [email, setEmail] = useState();
    let [password, setPassword] = useState('');
    let [age, setAge] = useState();
    let [dob, setDOB] = useState();
    const urlParams = useParams();
    let id = urlParams.id;
    let storedToken = localStorage.getItem('token');
    storedToken = storedToken.replace('"', '');
    storedToken = storedToken.replace('"', '');
    useEffect(() => {
        axios
            .get(`/users/${urlParams.id}`, {
                headers: {
                    token: storedToken,
                },
            })
            .then((res) => {
                console.log(res.data);
                setName(res.data[0].name);
                setEmail(res.data[0].email);
                setPassword(res.data[0].password);
                setAge(res.data[0].age);
                setDOB(res.data[0].dob);
            })
            .catch((e) => console.log(e));
    }, []);
    const updateData = (e) => {
        e.preventDefault();
        let data = { name, email, password, age, dob };
        axios
            .put(`/users/edituser/${id}`, data)
            .then((res) => alert('Saved'))
            .catch((e) => console.log(e));
    };
    return (
        <div>
            <form className='logform' onSubmit={updateData}>
                <label>
                    <h5>Name</h5>
                </label>
                <input
                    type='text'
                    className='form-control'
                    name='name'
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <label>
                    <h5>Email</h5>
                </label>
                <input
                    type='email'
                    className='form-control'
                    name='email'
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <label>
                    <h5>password</h5>
                </label>
                <input
                    type='password'
                    className='form-control'
                    name='password'
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <label>
                    <h5>Age</h5>
                </label>
                <input
                    type='number'
                    max='120'
                    min='0'
                    name='age'
                    className='form-control'
                    value={age}
                    onChange={(e) => {
                        setAge(e.target.value);
                    }}
                />
                <label>
                    <h5>Date Of Birth</h5>
                </label>
                <input
                    required
                    type='date'
                    className='form-control'
                    name='dob'
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                />
                <div className='text-center upSpace'>
                    <button className='btn btn-success'>Save</button>
                </div>
            </form>
        </div>
    );
};
export default EditUser;