const checkEmptyObjectInputFields = key => {
  formState[key].forEach(el => {
    const inputValues = Object.values(el);
    for (let i = 0; i < inputValues.length; i++) {
      if (!inputValues[i]) console.log('falsy value found', inputValues[i]);
    }
  });
};

const formState = {
  existingConditions: [
    { condition: 'heart disease', startDate: '', notes: 'lorem' },
  ],
};

checkEmptyObjectInputFields('existingConditions');
