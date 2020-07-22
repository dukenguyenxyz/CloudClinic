import React from 'react';
import '../Form/Form.scss';
import AuthInput from '../Form/AuthInput/AuthInput';

const StepZero = ({ formState, handleCheckBox }) => {
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
