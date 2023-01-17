import React, { useEffect } from 'react'
import '../App.css';
import { Button, Card, Form } from "react-bootstrap";
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { useState } from 'react';
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction, updateNoteAction } from '../action/noteAction';
import { useNavigate, useParams, } from 'react-router-dom';
import axios from 'axios';
import {matchPath} from 'react-router-dom';


const Edit = () => {
  const { id } = useParams();
  

    const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

 



  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/edit/${id}`);
      console.log(data)

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      
    };

    fetching();
  }, [id]);

 

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = () => {
    
    dispatch(updateNoteAction( id,title, content, category));
    if (!title || !content || !category) return;

    
    
  };
  return (
    <>

    <section className="h-100 h-custom" style={{ backgroundColor: "#8fc4b7" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-8 col-xl-6">
            <div className="card rounded-3">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
                className="w-100" style={{ borderTopLeftRadius: ".3rem " }}
                alt="Sample photo" />
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Create Notes</h3>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              {loading && <Loading />}

                <form className="px-md-2" method='post' onSubmit={updateHandler} >

                  <div className="form-outline mb-4">
                    <input type="text" id="form3Example1q" className="form-control" name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label className="form-label" for="form3Example1q">Title</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="text" id="form3Example1q" className="form-control" name='content' value={content} onChange={(e) => setContent(e.target.value)} />
                    <label className="form-label" for="form3Example1q">Content</label>
                  </div>
                  {content && (
                    <Card>
                      <Card.Header>Note Preview</Card.Header>
                      <Card.Body>
                        <ReactMarkdown>{content}</ReactMarkdown>
                      </Card.Body>
                    </Card>
                  )}
                  <div className="form-outline mb-4">
                    <input type="text" id="form3Example1q" className="form-control" name='category' value={category} onChange={(e) => setCategory(e.target.value)} />
                    <label className="form-label" for="form3Example1q">Category</label>
                  </div>



                  <button type="submit" className="btn btn-success btn-lg mb-1">Submit</button>
                  <button type="submit" className="btn btn-danger btn-lg mb-1 " onClick={resetHandler} >Reset Feilds</button>
                  <Card.Footer className="text-muted">
                    Creating on - {new Date().toLocaleDateString()}
                  </Card.Footer>

                </form>




              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
  )
}

export default Edit