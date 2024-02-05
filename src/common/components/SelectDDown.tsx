import React from 'react'
import { Form } from 'react-bootstrap'

interface SelectDDownProp {
    selectedId: number,
    options: SelectOption[],
    handleTemplateChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

function SelectDDown({ selectedId, options, handleTemplateChange }: SelectDDownProp) {
    return (
        <Form.Select value={selectedId.toString()} aria-label="Default select example" onChange={handleTemplateChange}>
            <option value="-1">SELECT A TEMPLATE</option>
            {
                options.map(item =>
                    <option key={item.id} value={item.id}>{item.name}</option>
                )
            }
        </Form.Select>
    )
}

export default SelectDDown
