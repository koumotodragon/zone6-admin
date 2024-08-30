const FormTextArea = ({ name, labelText, defaultValue, onChange }: any) => {
    return (
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>
                {labelText || name}
            </label>
            <textarea
                id={name}
                name={name}
                className='form-input-text-area'
                defaultValue={defaultValue || ''}
                onChange={onChange}
            />
        </div>
    );
};
export default FormTextArea;
