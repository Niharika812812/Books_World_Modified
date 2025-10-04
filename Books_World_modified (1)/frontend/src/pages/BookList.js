import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';
export default function BookList(){
  const [books, setBooks] = useState([]);
  const [page,setPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1);
  useEffect(()=>{ fetch(); }, [page]);
  async function fetch(){
    const res = await API.get('/books?page='+page);
    setBooks(res.data.books || []);
    setTotalPages(res.data.totalPages || 1);
  }
  return (
    <div>
      <h3>Books</h3>
      <div className="row">
        {books.map(b=>(
          <div key={b._id} className="col-md-6 mb-3">
            <div className="card p-2">
              <h5>{b.title} {b.avgRating ? <small className="text-warning">★ {b.avgRating}</small> : null}</h5>
              <p>{b.author}</p>
              <p>{b.description?.slice(0,150)}</p>
              <Link to={'/books/'+b._id} className="btn btn-sm btn-outline-primary">Details</Link>
            </div>
          </div>
        ))}
      </div>
      <nav>
        <ul className="pagination">
          <li className={`page-item ${page<=1 ? 'disabled':''}`}><button className="page-link" onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button></li>
          <li className="page-item disabled"><span className="page-link">Page {page}</span></li>
          <li className={`page-item ${page>=totalPages ? 'disabled':''}`}><button className="page-link" onClick={()=>setPage(p=>p+1)}>Next</button></li>
        </ul>
      </nav>
    </div>
  );
}
