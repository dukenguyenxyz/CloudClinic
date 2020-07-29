const doctorAvailability = {
  unavailableDateTimes: [
    {
      startDateTime: 'foo',
      endDateTime: 'bar',
      modifier: 'x',
    },
  ],
};

const checkValidSubDateFields = key => {
  doctorAvailability[key].forEach(el => {
    const clone = (({ modifier, ...o }) => o)(el);
    console.log(clone.startDateTime);
  });
};

checkValidSubDateFields('unavailableDateTimes');
