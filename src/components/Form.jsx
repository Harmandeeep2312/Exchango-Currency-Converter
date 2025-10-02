import React, { useEffect, useState } from "react"

export default function Form(){
    let [inputAmount , setInputAmount] = useState(1);
    let [initialCurrency , setInitialCurrency] = useState("INR");
    let [outputCurrency , setOutputCurrency] = useState("USD");
    let [isConverted , setIsConverted] = useState("");
    let [currencies, setCurrencies] = useState([]);

      useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/976e443def727337a0901797/codes`
        );
        const data = await res.json();
        if (data.result === "success") {
          setCurrencies(data.supported_codes);
        }
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    fetchCurrencies();
  }, []);

    useEffect(()=>{
        const fetchConversion = async()=>{
            try{
                const res = await fetch (`https://v6.exchangerate-api.com/v6/976e443def727337a0901797/pair/${initialCurrency}/${outputCurrency}/${inputAmount}`
                );
                const data = await res.json();
                 console.log(`${initialCurrency} = ${data.conversion_rate} ${outputCurrency}`);
                setIsConverted(data.result ? data.conversion_result : "N/A")
            }catch (error) {
                console.error("Error fetching conversion:", error);
                setIsConverted("Error");
      }
        };
        fetchConversion();
    },[inputAmount, initialCurrency, outputCurrency]);
    return (
        <>
        <div className="container">
            <div className="row">
            <input type="number" 
                defaultValue={1} 
                onChange={(e)=>setInputAmount(e.target.value)}
                className="bg-black text-white w-full outline-none px-2"
            />

            <div className="w-px h-6 bg-gray-600 mx-2"></div>

            <select 
                className="bg-black text-white outline-none"
                value={initialCurrency}
                onChange={(e) => setInitialCurrency(e.target.value)}
            >
                {currencies.map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
            </select>
            </div>
        
        <div className="row">
            <input value={isConverted}
             type="number" 
             readOnly
             className="bg-black text-white w-full outline-none px-2"
            />
            <div className="w-px h-6 bg-gray-600 mx-2"></div>
            <select 
                 className="bg-black text-white outline-none"
                value={outputCurrency}
                onChange={(e) => setOutputCurrency(e.target.value)}
            >
                {currencies.map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
            </select>
    </div>
    </div>
        
        </>

    )
}