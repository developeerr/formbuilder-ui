import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { toast } from 'react-toastify';
import { APIClient, ApiResponse } from '../common/services/APIClient';
import SelectDDown from '../common/components/SelectDDown';
import './TemplateFormBuilder.css'
import EditPanel from '../common/components/EditPanel';
import { useNavigate } from 'react-router-dom';

interface TemplateReponse {
    templateOptions: SelectOption[],
    templateEditOptions: SelectOption[]
}

function TemplateFormBuilder() {
    const navigate = useNavigate();
    const [selectedTemplateId, setSelectedTemplateId] = useState<number>(-1);
    const [selectedTemplateName, setSelectedTemplateName] = useState<String>('');
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [editOptions, setEditOptions] = useState<SelectOption[]>([]);
    const [templateHTML, setTemplateHTML] = useState('');

    useEffect(() => {
        const fetchTemples = async () => {
            const url = 'formbuilder/TemplatesV2'
            const method = 'GET'

            const response: ApiResponse<TemplateReponse> = await APIClient(url, method);

            if (response.error) {
                toast.error('Unable to Fetch Data', { theme: 'dark' });
            } else {
                setOptions(response.data.templateOptions);
                setEditOptions(response.data.templateEditOptions)
            }
        }

        fetchTemples();
    }, [])

    useEffect(() => {
        dynamicallyBindEditToHTML();
    }, [templateHTML])

    useEffect(() => {
        if (selectedTemplateId != -1) {
            const fetchTemples = async () => {
                const url = 'formbuilder/TemplatesV2/' + selectedTemplateId;
                const method = 'GET'

                const response: ApiResponse<string> = await APIClient(url, method);

                if (response.error) {
                    toast.error('Unable to Fetch Data', { theme: 'dark' });
                    return;
                }

                setTemplateHTML(response.data);
            }

            fetchTemples();
        }
    }, [selectedTemplateId])

    const dynamicallyBindEditToHTML = () => {
        const elementsWithClassA = document.querySelectorAll('.bindable-content');

        elementsWithClassA.forEach((targetElement: Element) => {
            const displayName = targetElement.querySelector('label')?.innerHTML;
            const selctedOptionId = targetElement.getAttribute('jb-col-id');

            const wrapperDiv = document.createElement('div');
            wrapperDiv.classList.add('edit-panel-wrapper');

            if (displayName != null && selctedOptionId != null) {
                createRoot(wrapperDiv).render(
                    <>
                        <EditPanel targetElement={targetElement}
                            options={editOptions} />
                    </>
                );

                targetElement.appendChild(wrapperDiv);
            }
        });
    }

    const handleTemplateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.target.value);
        setSelectedTemplateId(selectedId);
        setSelectedTemplateName(options[(event.target.selectedIndex - 1)].name);
    }

    const submitHTML = async (updatedTemplateHTML: string | undefined) => {
        const response = await APIClient('formbuilder/templateV2/' + selectedTemplateId, 'POST',
            { content: updatedTemplateHTML });

        if (response.error) {
            toast.error('Unable to Fetch Data', { theme: 'dark' });
            return;
        }

        console.log(selectedTemplateName);
        toast.success('Template \'' + selectedTemplateName + '\' Updated.', { theme: 'dark' });
        setSelectedTemplateId(-1);
        setSelectedTemplateName('');
        setTemplateHTML('');
    }

    const handleSaveHtml = () => {
        const innerHtmlToSubmit = document.querySelectorAll('.bindable-content');

        innerHtmlToSubmit.forEach((element: Element) => {
            const editableWrappers = element.querySelectorAll('.edit-panel-wrapper');

            editableWrappers.forEach((childElement: Element) => {
                element.removeChild(childElement);
            });
        })

        const updatedTemplateHTML = document.getElementById('template-wrapper')?.innerHTML;
        submitHTML(updatedTemplateHTML);
    }

    const handleClickViewPage = () => {
        navigate('/template/' + selectedTemplateId);
    }

    return (
        <div className='container'>
            <div className='page-header'>
                <h3 className=''>
                    APP
                </h3>
            </div>
            <div className='row'>
                <div className='row'>
                    <div className='col-md-9'>
                        <SelectDDown selectedId={selectedTemplateId} options={options} handleTemplateChange={handleTemplateChange} />
                    </div>
                    <div className='col-md-3'>
                        {
                            selectedTemplateId != -1 && (
                                <button onClick={handleClickViewPage}>View Sample Page</button>
                            )
                        }

                    </div>
                </div>
            </div>
            <hr />
            {
                templateHTML && (
                    <>
                        <div className='row'>
                            <div id='template-wrapper' dangerouslySetInnerHTML={{ __html: templateHTML }}>
                            </div>
                        </div>
                        <br />
                        <div className='row'>
                            <div className='col-md-12 submit-button-wrapper'>
                                <button onClick={handleSaveHtml}>Save</button>
                            </div>
                        </div>
                    </>
                )

            }
        </div>
    )
}

export default TemplateFormBuilder