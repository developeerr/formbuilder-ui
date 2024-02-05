import React, { useEffect } from 'react'
import { APIClient } from '../common/services/APIClient'
import { useParams, useSearchParams } from 'react-router-dom';

function TemplateView() {
  const { id } = useParams();
  const templateId = id;
  const patientVisitId = 1;

  useEffect(() => {
    const loadTemplateData = async () => {
      const response = await APIClient<string>('FormBuilder/TemplateV2/Patient/' + templateId + '/' + patientVisitId);
      //const htmlTemplate = JSON.parse(response.data);

      const templateWrapper = document.getElementById('template-wrapper');
      if(templateWrapper != null){
        templateWrapper.innerHTML = response.data;
      }
    }

    loadTemplateData();
  }, [])

  return (
    <>
      <div className='row'>
        <div className='col-md-12'>
          <h3>Template View</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-8'>
          <div id='template-wrapper'></div>
        </div>
      </div>
    </>
  )
}

export default TemplateView
