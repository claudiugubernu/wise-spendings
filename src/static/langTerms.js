export function langTerms($language, $term) {
  const storedTerms = [
    {
      term: 'Settings',
      lang: {
        en: 'Settings',
        ro: 'Setări',
      },
    },
    {
      term: 'Language',
      lang: {
        en: 'Language',
        ro: 'Limbă',
      },
    },
    {
      term: 'English',
      lang: {
        en: 'English',
        ro: 'Engleză',
      },
    },
    {
      term: 'Romanian',
      lang: {
        en: 'Romanian',
        ro: 'Română',
      },
    },
    {
      term: 'Dark Mode',
      lang: {
        en: 'Dark Mode',
        ro: 'Mod Întunecat',
      },
    },
    {
      term: 'Currency',
      lang: {
        en: 'Currency',
        ro: 'Valută',
      },
    },
    {
      term: 'Add Budget',
      lang: {
        en: 'Add Budget',
        ro: 'Adaugă Buget',
      },
    },
    {
      term: 'Budget Period',
      lang: {
        en: 'Budget Period',
        ro: 'Perioadă Buget',
      },
    },
    {
      term: 'One Week',
      lang: {
        en: 'One Week',
        ro: 'O Săptămână',
      },
    },
    {
      term: 'One Month',
      lang: {
        en: 'One Month',
        ro: 'O Lună',
      },
    },
    {
      term: 'Three Months',
      lang: {
        en: 'Three Months',
        ro: 'Trei Luni',
      },
    },
    {
      term: 'Six Months',
      lang: {
        en: 'Six Months',
        ro: 'Șase Luni',
      },
    },
    {
      term: 'One Year',
      lang: {
        en: 'One Year',
        ro: 'Un An',
      },
    },
    {
      term: 'Add Expense',
      lang: {
        en: 'Add Expense',
        ro: 'Adaugă Cheltuială',
      },
    },
    {
      term: 'View Expenses',
      lang: {
        en: 'View Expenses',
        ro: 'Vezi Cheltuieli',
      },
    },
    {
      term: 'Expenses',
      lang: {
        en: 'Expenses',
        ro: 'Cheltuieli',
      },
    },
    {
      term: 'Delete',
      lang: {
        en: 'Delete',
        ro: 'Șterge',
      },
    },
    {
      term: 'Repeat',
      lang: {
        en: 'Repeat',
        ro: 'Repetă',
      },
    },
    {
      term: 'Name',
      lang: {
        en: 'Name',
        ro: 'Nume',
      },
    },
    {
      term: 'New Budget',
      lang: {
        en: 'New Budget',
        ro: 'Buget Nou',
      },
    },
    {
      term: 'Maximum Spending',
      lang: {
        en: 'Maximum Spending',
        ro: 'Buget Maxim',
      },
    },
    {
      term: 'Add',
      lang: {
        en: 'Add',
        ro: 'Adaugă',
      },
    },
    {
      term: 'New Expense',
      lang: {
        en: 'New Expense',
        ro: 'Cheltuială Nouă',
      },
    },
    {
      term: 'Description',
      lang: {
        en: 'Description',
        ro: 'Descriere',
      },
    },
    {
      term: 'Amount',
      lang: {
        en: 'Amount',
        ro: 'Sumă',
      },
    },
    {
      term: 'Budget',
      lang: {
        en: 'Budget',
        ro: 'Buget',
      },
    },
    {
      term: 'Uncategorized',
      lang: {
        en: 'Uncategorized',
        ro: 'Fără categorie',
      },
    },
    {
      term: 'Date',
      lang: {
        en: 'Date',
        ro: 'Dată',
      },
    },
    {
      term: 'Over budget by',
      lang: {
        en: 'Over budget by',
        ro: 'Buget depășit cu',
      },
    },
    {
      term: 'Sort by date',
      lang: {
        en: 'Sort by date',
        ro: 'Sortează după dată',
      },
    },
    {
      term: 'Alert',
      lang: {
        en: 'Alert',
        ro: 'Alertă',
      },
    },
    {
      term: 'Your budget period has come to an end. How would you like to proceed ?',
      lang: {
        en: 'Your budget period has come to an end. How would you like to proceed ?',
        ro: 'Perioada bugetului dumneavoastră a ajuns la sfârșit. Cum doriti să procedați ?',
      },
    },
    {
      term: 'Icon',
      lang: {
        en: 'Icon',
        ro: 'Icoană',
      },
    },
    {
      term: 'Budget',
      lang: {
        en: 'Budget',
        ro: 'Buget',
      },
    },
    {
      term: 'Savings',
      lang: {
        en: 'Savings',
        ro: 'Economii',
      },
    },
    {
      term: 'Add Savings Account',
      lang: {
        en: 'Add Savings Account',
        ro: 'Adaugă cont economii',
      },
    },
    {
      term: 'Savings Account',
      lang: {
        en: 'Savings Account',
        ro: 'Cont economii',
      },
    },
    {
      term: 'Target',
      lang: {
        en: 'Target',
        ro: 'Obiectiv',
      },
    },
    {
      term: 'Interest(%p.a.)',
      lang: {
        en: 'Interest(%p.a.)',
        ro: 'Dobândă(%p.a.)',
      },
    },
    {
      term: 'Interest',
      lang: {
        en: 'Interest',
        ro: 'Dobândă',
      },
    },
    {
      term: 'Deposit',
      lang: {
        en: 'Deposit',
        ro: 'Depozit',
      },
    },
    {
      term: 'New Deposit',
      lang: {
        en: 'New Deposit',
        ro: 'Depozit Nou',
      },
    },
    {
      term: 'View Deposits',
      lang: {
        en: 'View Deposits',
        ro: 'Vezi Depozitele',
      },
    },
    {
      term: 'Deposits',
      lang: {
        en: 'Deposits',
        ro: 'Depozite',
      },
    },
    {
      term: 'Close Account',
      lang: {
        en: 'Close Account',
        ro: 'Închide Cont',
      },
    },
    {
      term: 'Withdrawal',
      lang: {
        en: 'Withdrawal',
        ro: 'Retrage',
      },
    },
    {
      term: 'Choose An Option',
      lang: {
        en: 'Choose An Option',
        ro: 'Alege o opțiune',
      },
    },
    {
      term: 'Bill',
      lang: {
        en: 'Bill',
        ro: 'Factură',
      },
    },
    {
      term: 'Loan',
      lang: {
        en: 'Loan',
        ro: 'Împrumut',
      },
    },
  ];
  // Filter the array and return the result
  function filterIt(array, value, key) {
    return array.filter(
      key
        ? (a) => a[key] === value
        : (a) => Object.keys(a).some((k) => a[k] === value)
    )[0];
  }
  // If returns false the term is not added
  if (!filterIt(storedTerms, $term)) {
    return '[term not found: ' + $term + ']';
  }

  if (!filterIt(storedTerms, $term).lang[$language]) {
    return `[ ${$language} term not found ]`;
  }

  return filterIt(storedTerms, $term).lang[$language];
}
