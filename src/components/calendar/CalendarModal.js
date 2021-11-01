import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/events';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const endDate = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: endDate.toDate()
};

export const CalendarModal = () => {

    const { modalOpen } = useSelector(state => state.ui);  
    const { activeEvent } = useSelector(state => state.calendar);  
    
    const dispatch = useDispatch();

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEndDate, setDateEndDate] = useState(endDate.toDate());
    const [ titleValid, setTitleValid ] = useState(true);

    const [formValues, setFormValues] = useState(initEvent);

    const {title, notes, start, end} = formValues;

    useEffect(() => {
        if( activeEvent ){
            setFormValues( activeEvent );
        }else{
            setFormValues( initEvent );
        }
    }, [ activeEvent, setFormValues])

    const closeModal = (e) => {
        dispatch(uiCloseModal());
        dispatch( eventClearActiveEvent() )
        setFormValues( initEvent );
    }

    const handleStartDateChange = (e) => {
        setDateStart(e);
        console.log(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateDateChange = (e) => {
        setDateEndDate(e);
        console.log(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log(formValues);

        const momentStart = moment( start );
        const momentEnd = moment( end );

        if( momentStart.isSameOrAfter( momentEnd ) ){
            return Swal.fire('Error', 'Date End is smaller than Date Start', 'error');
        }

        if( title.trim().length < 2){
            return setTitleValid( false );
        }

        if( activeEvent ){
            dispatch(eventUpdated( formValues ))
        }else{
            dispatch(eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: '123',
                    name: 'Edw'
                }
            }));
        }

        setTitleValid(true);
        closeModal();
    }

    return (
        <Modal
            isOpen={ modalOpen }
            //onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> { (activeEvent)? 'Editar evento': 'Nuevo evento'} </h1>
            <hr />
            <form 
                className="container"
                onSubmit= { handleSubmitForm }
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ dateStart }
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateDateChange }
                        value={ dateEndDate }
                        minDate={ dateStart }
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${ !titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>    
    )
}
