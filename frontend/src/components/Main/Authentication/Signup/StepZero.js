import React from 'react';
import '../Form/Form.scss';
import AuthInput from '../Form/AuthInput/AuthInput';
// import Button from '../../../Button/Button';

const StepZero = ({ formState, handleCheckBox }) => {
  //replace with yes and no buttons, and remove next button from first step of the form

  return (
    <div>
      <h3>Are you a Doctor?</h3>
      <AuthInput
        value={formState.isDoctor}
        type="checkbox"
        onValueChange={e => handleCheckBox(e, 'isDoctor')}
      />
    </div>
  );
};

export default StepZero;
