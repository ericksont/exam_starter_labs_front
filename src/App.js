import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import './App.scss';

function App() {

  const [formState, setFormState] = useState({
                                            id: '',
                                            tokenSymbol: "",
                                            amount: "",
                                            usd: 1231321321,
                                            mode: "submit"
                                          });

  const [portfolios, setPortfolios] = useState([
                                              {
                                                id: 1,
                                                tokenSymbol: "BIT",
                                                amount: 1233,
                                                usd: 1231321321,
                                                updating: false
                                              }
                                          ]);

  const resetFormState = () => {
    setFormState({
        
          tokenSymbol: "",
          amount: "",
          mode: "submit",
          id: ""
        
    });
  };

  const onChange = event => {
    setFormState({
      
        ...formState,
        [event.target.name]: event.target.value
        
    });
  };

  const update = key => {
    
    portfolios[key].updating = true;
    setFormState({ ...portfolios[key], mode: "edit" })
    
 };

 const deletePortfolio = key => {
  
  portfolios.splice(key, 1);
  setPortfolios(
      [...portfolios]);
};

  const onSubmit = event => {

    event.preventDefault();
    const tokenSymbol = event.target.querySelector("input[name='tokenSymbol']").value;
    const amount = event.target.querySelector("input[name='amount']").value;


    
    
    if (formState.mode === "submit") {
      

      setPortfolios([
          
             ...portfolios,
             {
                usd: 1231321321,
                
                tokenSymbol,
                amount,
                updating: false,
                id: portfolios[portfolios.length - 1].id + 1
             }
          
            ]);
    } else if (formState.mode === "edit") {

      const index = portfolios.find((portfolio)=> portfolio.id === formState.id).id;
      
      portfolios[index - 1] = {
              tokenSymbol,
              amount,
               usd: 123,
               updating: false,
               id: index
            }

            setPortfolios([
          
              ...portfolios,
           
             ]);
      
   }

    resetFormState();
 };

   
  return (
    <div className="App">
      
      <Form 
        formState={formState}
        onChange={onChange} 
        onSubmit={onSubmit}
      />
      <Table portfolios={portfolios} update={update} deletePortfolio={deletePortfolio} />
            
    </div>
  );
}

const Form = ({ formState, onChange, onSubmit }) => {
  return (
     <form className="form" onSubmit={onSubmit}>
        <fieldset>
           <Field
              name="tokenSymbol"
              label="Token Symbol"
              value={formState.tokenSymbol}
              onChange={onChange}
           />
           <Field
              name="amount"
              label="Amount"
              value={formState.amount}
              onChange={onChange}
           />
        </fieldset>
        <button> {formState.mode} </button>
     </form>
  );
};

const Field = ({ label = "", name = "", value = "", onChange }) => {
  return (
     <div className="field">
        <label>{label}</label>
        <input type="text" name={name} value={value} onChange={onChange} />
     </div>
  );
};

const Table = ({ portfolios = [], update, deletePortfolio }) => {
  return (
     <div className="table">
        <div className="table-header">
           <div className="row">
              <div className="column">Token</div>
              <div className="column">Quantity</div>
              <div className="column">Amount in USD</div>
              <div className="column">Options</div>
           </div>
        </div>
        <div className="table-body">
           {portfolios.map((portfolio, key) => {
              return (
                 <div key={key} className={`row ${portfolio.updating ? "updating" : ""}`}>
                    <div className="column">{portfolio.tokenSymbol}</div>
                    <div className="column">{portfolio.amount}</div>
                    <div className="column">{portfolio.usd}</div>
                    <div className="column">
                       <button
                          className="icon"
                          onClick={() => update(key)}
                       >
                         <FontAwesomeIcon icon={faEdit} />
                          
                       </button>
                       <button className="icon" onClick={() => deletePortfolio(key)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                       </button>
                    </div>
                 </div>
              );
           })}
        </div>
     </div>
  );
};


export default App;
