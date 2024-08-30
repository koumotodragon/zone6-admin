import FormRowSelect from "./FormRowSelect";
const FormTags = () => {
    return (
        <div className="tag-container">
            <FormRowSelect name="tags" list={['all']} />
        </div>
    );
};
export default FormTags;
