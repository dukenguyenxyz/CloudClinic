import React from 'react';
import '../Form/Form.scss';
import Button from '../../../Button/Button';
import AuthInput from '../Form/AuthInput/AuthInput';
import AuthSelect from '../Form/AuthSelect/AuthSelect';

const StepThree = () => {
  // To be replaced with API call from backend
  const isDoctor = false;
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const clientSignup = (
    <>
      <h3>Existing Conditions</h3>
      <p>
        Please list any current medical conditions and their approximate start
        date
      </p>
      <AuthInput
        value=""
        placeholder="Condition"
        type="text"
        icon="condition"
      />
      <AuthInput value="" placeholder="Condition Start Date" type="date" />
      <AuthInput value="" placeholder="Comments" type="text" icon="textArea" />
      {/* Need to trigger an event to render more forms if people have multiple conditions */}
      <Button action="+" color="pink" />

      <h3>Allergies</h3>
      <AuthInput
        value=""
        placeholder="Allergy"
        type="text"
        icon="alertCircle"
      />

      {/* Could replace with selector */}
      <AuthInput
        value=""
        placeholder="Severity (1-5)"
        type="number"
        icon="hash"
      />
      <Button action="+" color="pink" />

      <h3>Medication</h3>
      <AuthInput
        value=""
        placeholder="Medication"
        type="text"
        icon="medication"
      />
      {/* Replace this field with comments/notes? Dosage is often context dependent such as daily vs monthly */}
      <AuthInput value="" placeholder="Dosage" type="number" icon="hash" />
      <Button action="+" color="pink" />

      <h3>Blood Type</h3>
      <AuthSelect
        value=""
        placeholder="Blood Type"
        icon="heart"
        options={bloodTypes}
      />
    </>
  );

  const doctorSignup = (
    <>
      <AuthInput value="" placeholder="Licence" type="text" icon="licence" />
      <AuthInput
        value=""
        placeholder="Accreditation"
        type="text"
        icon="briefcase"
      />
      <AuthInput
        value=""
        placeholder="Specialty Field"
        type="text"
        icon="fileText"
      />
      <AuthInput
        value=""
        placeholder="Sub Specialty Field"
        type="text"
        icon="fileText"
      />
      <AuthInput
        value=""
        placeholder="Education"
        type="text"
        icon="education"
      />
      <AuthInput
        value=""
        placeholder="Years of Experience"
        type="number"
        icon="hash"
      />
      <AuthInput
        value=""
        placeholder="Languages Spoken"
        type="text"
        icon="language"
      />
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
