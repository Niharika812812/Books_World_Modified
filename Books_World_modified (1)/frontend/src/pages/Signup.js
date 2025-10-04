import React, { useState } from 'react';
import API from '../api';
export default function Signup(){
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [msg,setMsg] = useState('');
  const submit = async (e)=>{
    e.preventDefault();
    try{
      await API.post('/auth/signup', form);
      setMsg('Signup success. Please login.');
    }catch(err){ setMsg(err.response?.data?.message || 'Error'); }
  };
  return (
    <div className="col-md-6 offset-md-3">
      <h3>Signup</h3>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={submit}>
        <input className="form-control mb-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        <input className="form-control mb-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
        <input type="password" className="form-control mb-2" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
        <button className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
}
