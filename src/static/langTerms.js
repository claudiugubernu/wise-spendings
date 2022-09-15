export function langTerms($language, $term) {
  const storedTerms = [
    {
      term: "Settings",
      lang: {
        en: "Settings",
        ro: "Setări",
      },
    },
    {
      term: "English",
      lang: {
        en: "English",
        ro: "Engleză",
      },
    },
    {
      term: "Romanian",
      lang: {
        en: "Romanian",
        ro: "Română",
      },
    },
    {
      term: "Dark Mode",
      lang: {
        en: "Dark Mode",
        ro: "Mod Întunecat",
      },
    },
    {
      term: "Currency",
      lang: {
        en: "Currency",
        ro: "Valută",
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
    return "[term not found: " + $term + "]";
  }

  if (!filterIt(storedTerms, $term).lang[$language]) {
    return `[ ${$language} term not found ]`;
  }

  return filterIt(storedTerms, $term).lang[$language];
}
