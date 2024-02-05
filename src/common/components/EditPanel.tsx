import { useRef, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import Popup from './Popup';
import './EditPanel.css';

interface EditPanelProps {
    targetElement: Element;
    options: SelectOption[];
}

export interface updatedOption {
    id: string,
    title: string | null
}

function EditPanel({ targetElement, options }: EditPanelProps) {
    const lableElement = targetElement.querySelector('label');
    const selectOptionAttr = targetElement.getAttribute('jb-col-id');
    const conTypeId = targetElement.getAttribute('con-type-id');

    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string | undefined>((lableElement != null ? lableElement.innerHTML : ''));
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>((selectOptionAttr != null ? selectOptionAttr : "-1"));
    const selectRef = useRef<HTMLSelectElement | null>(null);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const handleOnChange = () => {
        if (selectRef.current != null) {
            setTitle(selectRef.current.options[parseInt(selectRef.current.value)].text);
            setSelectedOptionId(selectRef.current.value);
        }
    }

    const onSave = () => {
        if (lableElement != null) {
            lableElement.innerHTML = title != undefined ? title : '';
        }

        targetElement.removeAttribute('jb-col-id');
        targetElement.setAttribute('jb-col-id', (selectedOptionId != null ? selectedOptionId : '-1'));

        setIsPopupOpen(false);
    }

    const onClose = () => {
        setIsPopupOpen(false);
    }

    return (
        <div>
            <FaEdit onClick={openPopup} />
            <Popup isOpen={isPopupOpen}>
                <h3>EDIT</h3>
                <div className='popup-body'>
                    {
                        conTypeId == "1" && <>
                            <div className='form-group'>
                                <label>Display Name : </label>
                                <input className='form-control' type='text' value={title?.toString()} onChange={(e) => setTitle(e.target.value)}></input>
                            </div>
                        </>
                    }

                    <div className="form-group">
                        <label>Select Field to Bind - </label>
                        <select ref={selectRef} className="form-control" value={selectedOptionId != null ? selectedOptionId : "-1"} onChange={handleOnChange}>
                            <option> -- Select Field -- </option>
                            {
                                options.map(option =>
                                    <option key={option.id} value={option.id}>{option.name}</option>
                                )
                            }
                        </select>
                    </div>
                </div>
                <hr />
                <div className='button-wrapper'>
                    <button className="save-button" onClick={onSave}> Save </button>
                    <button className="close-button" onClick={onClose}> Close </button>
                </div>
            </Popup>
        </div>
    )
}

export default EditPanel
