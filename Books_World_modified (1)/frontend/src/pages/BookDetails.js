import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';
export default function BookDetails(){
  const { id } = useParams();
  const [book,setBook] = useState(null);
  const [rating,setRating] = useState(5);
  const [reviewText,setReviewText] = useState('');
  useEffect(()=>{ fetch(); }, [id]);
  async function fetch(){
    try{ const res = await API.get('/books/'+id); setBook(res.data); }catch(err){}
  }
  const submitReview = async ()=>{
    try{
      await API.post('/reviews/'+id, { rating, reviewText });
      setRating(5); setReviewText(''); fetch();
    }catch(err){ alert(err.response?.data?.message || 'Error'); }
  };
  const deleteReview = async (rid)=>{
    if(!window.confirm('Delete review?')) return;
    await API.delete('/reviews/'+rid); fetch();
  };
  const deleteBook = async ()=>{
    if(!window.confirm('Delete book?')) return;
    await API.delete('/books/'+id); window.location='/';
  }
  if(!book) return <div>Loading...</div>;
  const meId = JSON.parse(localStorage.getItem('user'))?.id;
  return (
    <div>
      <h3>{book.title} {book.avgRating ? <small className="text-warning">★ {book.avgRating}</small>:null}</h3>
      <p><strong>Author:</strong> {book.author}</p>
      <p>{book.description}</p>
      {book.addedBy === meId && <div className="mb-2">
        <Link className="btn btn-sm btn-outline-secondary me-2" to={'/edit/'+id}>Edit</Link>
        <button className="btn btn-sm btn-danger" onClick={deleteBook}>Delete</button>
      </div>}

      <hr />
      <h5>Reviews ({book.reviewsCount || 0})</h5>
      <div className="mb-3">
        <label>Rating</label>
        <select className="form-select mb-2" value={rating} onChange={e=>setRating(Number(e.target.value))}>
          {[5,4,3,2,1].map(n=> <option key={n} value={n}>{n}</option>)}
        </select>
        <textarea className="form-control mb-2" value={reviewText} onChange={e=>setReviewText(e.target.value)} placeholder="Write a review..."></textarea>
        <button className="btn btn-primary" onClick={submitReview}>Submit/Update Review</button>
      </div>
      {book.reviews?.map(r => (
        <div className="card mb-2 p-2" key={r._id}>
          <strong>{r.userId?.name || r.userId}</strong> <span className="text-warning">★ {r.rating}</span>
          <p>{r.reviewText}</p>
          {r.userId?._id === meId && <button className="btn btn-sm btn-danger" onClick={()=>deleteReview(r._id)}>Delete</button>}
        </div>
      ))}
    </div>
  );
}
