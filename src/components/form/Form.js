import { Field } from "../field/Field";
import { Select } from "../select/Select";

export const Form = ({ formState, onChange, onSubmit }) => {
    return (
       <form className="form" onSubmit={onSubmit}>
          
          <fieldset>
            <Select name="tokenSymbol"
                label="Token Symbol"
                value={formState.tokenId}
                onChange={onChange} />
            <Field
                name="amount"
                label="Amount"
                value={formState.amount}
                onChange={onChange}/>
          </fieldset>
          <button> {formState.mode} </button>
       </form>
    );
  };