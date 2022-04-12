import { useEffect, useState } from 'react';
import { coingeckoAPI, localAPI } from './api';
import './App.scss';

import { Form } from './components/form/Form';
import { Table } from './components/table/Table';


function App() {

  const [formState, setFormState] = useState({mode: "submit"});
  const [portfolios, setPortfolios] = useState([]);

  useEffect(  () => {
      let tokenIds = [];
      let resume = [];

      async function featchData () {
         await localAPI
            .get("/portfolios")
            .then((response) => {
               response.data.forEach(element=>{
                  element.amount = new Intl.NumberFormat('en-US').format(element.amount);
                  tokenIds.push(element.tokenId)
               })   
               resume = response.data;
            })
            .catch((err) => {
               throw(err);
            });

            coingeckoAPI
               .get(`/simple/price?ids=${tokenIds.toString()}&vs_currencies=usd`)
               .then((response) => {
                  setPortfolios( resume.map((element) => {
                     element.usd = (response.data[element.tokenId].usd * parseFloat(element.amount.replace(/[^0-9.]/g,'')));
                     element.usd = new Intl.NumberFormat('en-US').format(element.usd);
                     return element;
                  }));
                  
               })
               .catch((err) => {
                  throw(err);
               });
         
      }
     featchData ()
   }, []); 

   const resetFormState = () => {
      setFormState({
         tokenSymbol: "",
         amount: "",
         mode: "submit",
         id: ""
      });
   };

   const onChange = event => {
      let field = event.target.name;
      let value = event.target.value;
      if(field === 'amount') 
         value = event.target.value.replace(/[^0-9.]/g,'');
      else 
         field = 'tokenId';
      setFormState({
         ...formState,
         [field]: value
      });      
   };

  const update = (key,id) => {
      portfolios[key].updating = true;
      setFormState({ ...portfolios[key], mode: "edit" })
   };

   const deletePortfolio = key => {
      const portfolio = portfolios[key]
      localAPI
            .delete(`/portfolios/${portfolio.id}`)
            .then(() => {
               portfolios.splice(key, 1);
               setPortfolios(
                  [...portfolios]);
            })
            .catch((err) => {
               throw(err);
            });
   }

   const onSubmit = async event => {

      event.preventDefault();

      const select = event.target.querySelector("select[name='tokenSymbol']")
      const tokenSymbol = select.options[select.selectedIndex].text;
      const tokenId = select.value;
      
      let amount = event.target.querySelector("input[name='amount']").value;
      amount = new Intl.NumberFormat('en-US').format(amount);

      let usdValue = 0;

      await coingeckoAPI
         .get(`/simple/price?ids=${tokenId}&vs_currencies=usd`)
         .then((response) => {
               usdValue = (response.data[tokenId].usd * parseFloat(amount.replace(/[^0-9.]/g,'')));
               usdValue = new Intl.NumberFormat('en-US').format(usdValue);
            }).catch((err) => {
            throw(err);
         });
         
      if (formState.mode === "submit") {
         
         const data = JSON.stringify({tokenSymbol, tokenId, amount: parseFloat(amount.replace(/[^0-9.]/g,''))});
         const options = { headers: {"content-type": "application/json"} }
         localAPI
            .post("/portfolios", data, options)
            .then((response) => {
               setPortfolios([
                  ...portfolios,
                  {
                     id: response.data.id,
                     tokenSymbol,
                     tokenId,
                     amount,
                     usd: usdValue,
                     updating: false
                  }
               ]); 
            })
            .catch((err) => {
               throw(err);
            });

      } else if (formState.mode === "edit") {

         const index = portfolios.findIndex((portfolio)=> portfolio.id === formState.id);

         const data = JSON.stringify({tokenSymbol, tokenId, amount: parseFloat(amount.replace(/[^0-9.]/g,''))});
         const options = { headers: {"content-type": "application/json"} }
         localAPI
            .put(`/portfolios/${formState.id}`, data, options)
            .then(() => {
               portfolios[index] = {
                  id: formState.id,
                  tokenId,
                  tokenSymbol,
                  amount,
                  usd: usdValue,
                  updating: false,
                  
               }
               setPortfolios([
                  ...portfolios
               ])
            })
            .catch((err) => {
               throw(err);
            });

      }

      resetFormState();
   };

   
   return (
      <div className="App">
         <Form 
            formState={formState}
            onChange={onChange} 
            onSubmit={onSubmit} />
         <Table 
            portfolios={portfolios} 
            update={update} 
            deletePortfolio={deletePortfolio} />
      </div>
   );
}

export default App;