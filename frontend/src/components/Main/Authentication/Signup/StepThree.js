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
      {/* Slider input */}
      {/* <label for="severity">Severity</label>
      <AuthInput value="" id="severity" type="range" min="1" max="5" /> */}
      {/* Plain number input */}
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
      {/* <AuthInput value="" placeholder="Blood Type" type="text" /> */}
      <select>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
      </select>
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
