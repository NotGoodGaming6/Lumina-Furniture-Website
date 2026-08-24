import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)' },
  AZN: { code: 'AZN', symbol: '₼', rate: 1.70, label: 'AZN (₼)' }
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('lumina_currency');
    return CURRENCIES[saved] ? saved : 'USD';
  });

  useEffect(() => {
    localStorage.setItem('lumina_currency', currency);
  }, [currency]);

  const currentCurrency = CURRENCIES[currency] || CURRENCIES.USD;

  const formatPrice = (amountInUSD) => {
    const num = Number(amountInUSD) || 0;
    const converted = num * currentCurrency.rate;

    if (currentCurrency.code === 'AZN') {
      return `${converted.toFixed(2)} ₼`;
    }
    return `${currentCurrency.symbol}${converted.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currentCurrency,
        formatPrice,
        currencies: CURRENCIES
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
