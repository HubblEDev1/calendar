import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {

    const { modalOpen } = useSelector(state => state.ui);  
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(uiOpenModal())
    }
    
    return (

        <button
            className="btn btn-primary fab"
            onClick={handleOpenModal}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
