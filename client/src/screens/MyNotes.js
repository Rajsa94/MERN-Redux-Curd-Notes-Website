import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import Product from './Product'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { deleteNoteAction, listNotes } from "../action/noteAction"
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import './notes.css';

const MyNotes = ({ search }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const noteList = useSelector((state) => state.noteList)
    const { loading, error, notes } = noteList;
    console.log(notes)
    const serLogin = useSelector((state) => state.userLogin);
    const { userInfo } = serLogin;


    const noteCreate = useSelector((state) => state.noteCreate);
    const { success: successCreate } = noteCreate;

    const noteDelete = useSelector((state) => state.noteDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = noteDelete;




    useEffect(() => {
        dispatch(listNotes());
        if (!userInfo) {
            navigate("/login");
        }
    }, [
        dispatch,
        navigate,
        userInfo,
        successCreate,
        successDelete



    ]);

    const deleteHandler = (id) => {
        if (window.confirm("are you sure?")) {
            dispatch(deleteNoteAction(id));


        }
        navigate('/mynotes')
    }
    return (
        <>
            <div className="container py-4">
                <h1>Welcome <span>{!userInfo ? userInfo : userInfo.name} </span>in Website</h1>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
                <div className="btn pt-4">
                    <button className="btn btn-primary " type="click" to='/createnotes'><NavLink className="nav-link active" aria-current="page" to='/createnotes'>Create Your Notes</NavLink></button>
                </div>

            </div>

            <div className="container">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    {
                        notes?.filter((filteredNote) =>
                            filteredNote.title.toLowerCase().includes(search.toLowerCase())
                        ).reverse().map(note => {
                            return (
                                <div key={note._id} className="accordion-item py-4">
                                    <h2 className="accordion-header" id="flush-headingOne">
                                        <button className="accordion-button collapsed" eventKey="0" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                            <h2> {note.title}</h2>


                                        </button>

                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">
                                            <h1>{note.content}</h1>
                                            {note.category}
                                        </div>
                                        <button type="button" className="btn btn-success ps-4"><NavLink className="nav-link active" aria-current="page" to={`/edit/${note._id}`}>Edit</NavLink></button>
                                        <button type="button" className="btn btn-danger "><NavLink className="nav-link active" aria-current="page" onClick={() => deleteHandler(note._id)}>Delete</NavLink></button>
                                    </div>
                                </div>)
                        })
                    }

                </div>
            </div>


        </>
    )
}

export default MyNotes