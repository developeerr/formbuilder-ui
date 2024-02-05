import React, { ReactNode } from 'react'
import './Popup.css'

interface PopupProps {
    isOpen: boolean;
    children: ReactNode;
}


const Popup: React.FC<PopupProps> = ({ isOpen, children }) => {
    return (
        <>
            {isOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Popup
