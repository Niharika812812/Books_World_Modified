import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate, useParams } from 'react-router-dom';
export default function AddEditBook(){
  const { id } = useParams();
  const nav = useNavigate();
  const [form,setForm] = useState({ title:'', author:'', description:'', genre:'', year:'' });
  useEffect(()=>{ if(id) load(); }, [id]);
  async function load(){
    const res = await API.get('/books/'+id);
    setForm(res.data);
  }
  async function submit(e){
    e.preventDefault();
    try{
      if(id) await API.put('/books/'+id, form);
      else await API.post('/books', form);
      nav('/');
    }catch(err){ alert(err.response?.data?.message || 'Error'); }
  }
  return (
    <div className="col-md-8 offset-md-2">
      <h3>{id ? 'Edit' : 'Add'} Book</h3>
      <form onSubmit={submit}>
        <input className="form-control mb-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
        <input className="form-control mb-2" placeholder="Author" value={form.author} onChange={e=>setForm({...form,author:e.target.value})} />
        <input className="form-control mb-2" placeholder="Genre" value={form.genre} onChange={e=>setForm({...form,genre:e.target.value})} />
        <input className="form-control mb-2" placeholder="Published Year" value={form.year} onChange={e=>setForm({...form,year:e.target.value})} />
        <textarea className="form-control mb-2" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
        <button className="btn btn-primary">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}
