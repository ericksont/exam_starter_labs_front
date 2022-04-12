import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Table = ({ portfolios = [], update, deletePortfolio }) => {
   let total = 0;
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
             { portfolios.map((portfolio, key) => {
                if(typeof portfolio.usd === 'string')
                  total = total + parseFloat(portfolio.usd.replace(/[^0-9.]/g,''));
                return (
                   <div key={key} className={`row ${portfolio.updating ? "updating" : ""}`}>
                      <div className="column">{portfolio.tokenSymbol}</div>
                      <div className="column">{portfolio.amount}</div>
                      <div className="column total">$ {new Intl.NumberFormat('en-US', {minimumFractionDigits: 2}).format(parseFloat(portfolio.usd.replace(/[^0-9.]/g,'')))}</div>
                      <div className="column">
                         <button
                            className="icon"
                            onClick={() => update(key, portfolio.id)}
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
             <div className="row">
               <div className="column"><b>Total</b></div>
               <div className="column"> </div>
               <div className="column total"><b>$ {new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(total)}</b></div>
               <div className="column"> </div>
            </div>
          </div>
       </div>
    );
  };