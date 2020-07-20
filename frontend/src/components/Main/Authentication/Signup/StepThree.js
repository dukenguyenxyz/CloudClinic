import React from 'react';
import '../Form/Form.scss';
import Button from '../../../Button/Button';
import AuthInput from '../Form/AuthInput/AuthInput';
import AuthSelect from '../Form/AuthSelect/AuthSelect';

const StepThree = ({ formState, onValueChange }) => {
  const isDoctor = false;
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const severityOptions = [1, 2, 3, 4, 5];

  const clientSignup = (
    <>
      <h3>Existing Conditions</h3>
      <p>
        Please list any current medical conditions and their approximate start
        date
      </p>
      <AuthInput
        value={formState.condition}
        placeholder="Condition"
        type="text"
        icon="condition"
        onValueChange={e => onValueChange(e, 'condition')}
      />
      <AuthInput
        value={formState.conditionStartDate}
        // placeholder="Condition Start Date"
        type="date"
        icon="calendar"
        onValueChange={e => onValueChange(e, 'conditionStartDate')}
      />
      <AuthInput
        value={formState.conditionComment}
        placeholder="Comments"
        type="text"
        icon="textArea"
        onValueChange={e => onValueChange(e, 'conditionComment')}
      />
      {/* Need to trigger an event to render more forms if people have multiple conditions */}
      <Button action="+" color="pink" />

      <h3>Allergies</h3>
      <AuthInput
        value={formState.allergy}
        placeholder="Allergy"
        type="text"
        icon="alertCircle"
        onValueChange={e => onValueChange(e, 'allergy')}
      />

      <AuthSelect
        value={formState.severity}
        placeholder="Severity"
        type="text"
        icon="hash"
        options={severityOptions}
        onValueChange={e => onValueChange(e, 'severity')}
      />
      <Button action="+" color="pink" />

      <h3>Medication</h3>
      <AuthInput
        value={formState.medication}
        placeholder="Medication"
        type="text"
        icon="medication"
        onValueChange={e => onValueChange(e, 'medication')}
      />
      {/* Replace this field with comments/notes? Dosage is often context dependent such as daily vs monthly */}
      <AuthInput
        value={formState.dosage}
        placeholder="Dosage"
        type="number"
        icon="hash"
        onValueChange={e => onValueChange(e, 'dosage')}
      />
      <Button action="+" color="pink" />

      <h3>Blood Type</h3>
      <AuthSelect
        value={formState.bloodType}
        placeholder="Blood Type"
        icon="heart"
        options={bloodTypes}
        onValueChange={e => onValueChange(e, 'bloodType')}
      />
    </>
  );

  const doctorSignup = (
    <>
      <AuthInput
        value={formState.licence}
        placeholder="Licence"
        type="text"
        icon="licence"
        onValueChange={e => onValueChange(e, 'licence')}
      />
      <AuthInput
        value={formState.accreditation}
        placeholder="Accreditation"
        type="text"
        icon="briefcase"
        onValueChange={e => onValueChange(e, 'accreditation')}
      />
      <AuthInput
        value={formState.specialtyField}
        placeholder="Specialty Field"
        type="text"
        icon="fileText"
        onValueChange={e => onValueChange(e, 'specialtyField')}
      />
      <AuthInput
        value={formState.subSpecialtyField}
        placeholder="Sub Specialty Field"
        type="text"
        icon="fileText"
        onValueChange={e => onValueChange(e, 'subSpecialtyField')}
      />
      <AuthInput
        value={formState.education}
        placeholder="Education"
        type="text"
        icon="education"
        onValueChange={e => onValueChange(e, 'education')}
      />
      <AuthInput
        value={formState.yearsExp}
        placeholder="Years of Experience"
        type="number"
        icon="hash"
        onValueChange={e => onValueChange(e, 'yearsExp')}
      />
      <AuthInput
        value={formState.language}
        placeholder="Languages Spoken"
        type="text"
        icon="language"
        onValueChange={e => onValueChange(e, 'language')}
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
