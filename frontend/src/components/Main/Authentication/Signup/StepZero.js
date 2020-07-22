import React from 'react';
import '../Form/Form.scss';
import AuthInput from '../Form/AuthInput/AuthInput';

const StepZero = ({ formState, onValueChange, handleCheckBox }) => {
  return (
    <div>
      <h3>Are you a Doctor?</h3>
      <AuthInput
        // value={formState.isDoctor}
        type="checkbox"
        // defaultChecked={false}
        // onValueChange={e => onValueChange(e, 'isDoctor')}
        onValueChange={e => handleCheckBox(e, 'isDoctor')}
      />
    </div>
  );
};

export default StepZero;
