import React from 'react';
import '../Form/Form.scss';
import Button from '../../../Button/Button';
import AuthInput from '../Form/AuthInput/AuthInput';

const StepThree = () => {
  // To be replaced with API call from backend
  const isDoctor = true;

  const clientSignup = (
    <>
      <h3>Existing Conditions</h3>
      <p>
        Please list any current medical conditions and their approximate start
        date
      </p>
      <AuthInput value="" placeholder="Condition" type="text" />
      <AuthInput value="" placeholder="Condition Start Date" type="date" />
      <AuthInput value="" placeholder="Comments" type="text" />
      {/* Need to trigger an event to render more forms if people have multiple conditions */}
      <Button action="+" color="pink" />

      <h3>Allergies</h3>
      <AuthInput value="" placeholder="Allergies" type="text" />
      {/* Change input type to slider or similar */}
      <AuthInput value="" placeholder="Severity" type="number" />
      <Button action="+" color="pink" />

      <h3>Medication</h3>
      <AuthInput value="" placeholder="Medications" type="text" />
      {/* Replace this field with comments/notes? Dosage is often context dependent */}
      {/* E.g. daily, weekly etc and a single number doesn't really tell us much */}
      <AuthInput value="" placeholder="Dosage" type="number" />
      <Button action="+" color="pink" />

      {/* Change to select input type */}
      <AuthInput value="" placeholder="Blood Type" type="text" />
    </>
  );

  const doctorSignup = (
    <>
      <AuthInput value="" placeholder="Licence" type="text" />
      <AuthInput value="" placeholder="Accreditation" type="text" />
      <AuthInput value="" placeholder="Specialty Field" type="text" />
      <AuthInput value="" placeholder="Sub Specialty Field" type="text" />
      <AuthInput value="" placeholder="Education" type="text" />
      <AuthInput value="" placeholder="Years of Experience" type="number" />
      <AuthInput value="" placeholder="Languages Spoken" type="text" />
      <Button action="+" color="pink" />
    </>
  );

  return (
    <div className="form-wrapper ">
      {isDoctor ? doctorSignup : clientSignup}
    </div>
  );
};

export default StepThree;
