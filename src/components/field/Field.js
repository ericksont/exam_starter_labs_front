export const Field = ({ label = "", name = "", value = "", onChange }) => {
    return (
        <div className="field">
            <label>{label}</label>
            <input type="text" name={name} value={value} onChange={onChange} />
        </div>
    );
};