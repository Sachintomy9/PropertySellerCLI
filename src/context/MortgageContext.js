// context/MortgageContext.js
import React, { createContext, useContext, useState } from 'react';

const MortgageContext = createContext();

export const MortgageProvider = ({ children }) => {
  const [mortgageData, setMortgageData] = useState({
    price: 0,
    loanTerm: 25, // in years
    downPayment: 25, // percentage
    interestRate: 4, // percentage
    monthlyPayment: 0,
  });
  

  const calculateMonthlyPayment = (price, loanTerm, downPercentage, interestRate) => {
    const loanAmount = price - (downPercentage / 100) * price;
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTerm * 12;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    
    return Math.round(emi);
  };

  const applyCustomValues = ({ price, loanTerm, downPayment, interestRate }) => {
    const monthly = calculateMonthlyPayment(price, loanTerm, downPayment, interestRate);
    console.log("In Mortgage Context!",monthly);
    setMortgageData({
      price,
      loanTerm,
      downPayment,
      interestRate,
      monthlyPayment: monthly,
    });
  };

  return (
    <MortgageContext.Provider value={{ mortgageData, applyCustomValues }}>
      {children}
    </MortgageContext.Provider>
  );
};

export const useMortgage = () => useContext(MortgageContext);
