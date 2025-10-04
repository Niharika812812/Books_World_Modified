import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const [msg,setMsg] = useState('');
  const nav = useNavigate();
  const submit = async (e)=>{
    e.preventDefault();
    try{
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      nav('/');
    }catch(err){ setMsg(err.response?.data?.message || 'Error'); }
  };
  return (
    <div className="col-md-6 offset-md-3">
      <h3>Login</h3>
      {msg && <div className="alert alert-danger">{msg}</div>}
      <form onSubmit={submit}>
        <input className="form-control mb-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
        <input type="password" className="form-control mb-2" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
