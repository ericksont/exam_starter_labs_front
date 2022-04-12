import { useEffect, useState } from "react";
import { coingeckoAPI } from "../../api";
//import api from "./api";

export const Select = ({ label = "", name = "", value = "", onChange }) => {

   const [coins, setCoins] = useState([]);
   
   useEffect(() => {
      coingeckoAPI
        .get("/coins/list")
        .then((response) => {setCoins(response.data)})
        .catch((err) => {
            throw(err);
        });
    }, []); 
 
    return (
       <div className="field">
          <label>{label}</label>
          <select name={name} value={value} onChange={onChange}>
             {coins.map((coin, key) => {
                return (<option key={key} value={coin.id}>{coin.symbol}</option>)
             })}
          </select>
       </div>
    );
};