import React from 'react';
import '../Form/Form.scss';
import Button from '../../../Button/Button';
import AuthInput from '../Form/AuthInput/AuthInput';
import AuthSelect from '../Form/AuthSelect/AuthSelect';
import { v4 as uuidv4 } from 'uuid';

const StepThree = ({
  formState,
  onValueChange,
  handleAddClick,
  handleRemoveClick,
}) => {
  const isDoctor = true;
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const severityOptions = [1, 2, 3, 4, 5];

  const clientSignup = (
    <>
      <h3>Existing Conditions</h3>
      <p>
        Please list any current medical conditions and their approximate start
        date
      </p>

      {formState.existingConditions.map((val, i) => {
        return (
          <div key={uuidv4()}>
            <AuthInput
              name="Condition"
              value={val.condition}
              placeholder="Condition"
              type="text"
              icon="condition"
            />
            <AuthInput
              name="conditionStartDate"
              value={val.conditionStartDate}
              // placeholder="Condition Start Date"
              type="date"
              icon="calendar"
            />
            <AuthInput
              name="conditionComment"
              value={val.conditionComment}
              placeholder="Comments"
              type="text"
              icon="textArea"
            />
            <div className="btn-box">
              {formState.existingConditions.length !== 1 && (
                <Button
                  onClick={() => handleRemoveClick('existingConditions', i)}
                  action="-"
                  color="pink"
                />
              )}
              {formState.existingConditions.length - 1 === i && (
                <Button
                  onClick={() =>
                    handleAddClick('existingConditions', {
                      condition: '',
                      conditionStartDate: '',
                      conditionComment: '',
                    })
                  }
                  action="+"
                  color="pink"
                />
              )}
            </div>
          </div>
        );
      })}

      <h3>Allergies</h3>

      {formState.allergies.map((val, i) => {
        return (
          <div key={uuidv4()}>
            <AuthInput
              name="Allergy"
              value={val.allergy}
              placeholder="Allergy"
              type="text"
              icon="alertCircle"
            />

            <AuthSelect
              name="Severity"
              value={val.severity}
              placeholder="Severity"
              type="text"
              icon="hash"
              options={severityOptions}
            />
            <div className="btn-box">
              {formState.allergies.length !== 1 && (
                <Button
                  onClick={() => handleRemoveClick('allergies', i)}
                  action="-"
                  color="pink"
                />
              )}
              {formState.allergies.length - 1 === i && (
                <Button
                  onClick={() =>
                    handleAddClick('allergies', {
                      allergy: '',
                      severity: '',
                    })
                  }
                  action="+"
                  color="pink"
                />
              )}
            </div>
          </div>
        );
      })}

      <h3>Medication</h3>

      {formState.medications.map((val, i) => {
        return (
          <div key={uuidv4()}>
            <AuthInput
              name="Medication"
              value={val.medication}
              placeholder="Medication"
              type="text"
              icon="medication"
            />
            <AuthInput
              name="Dosage"
              value={val.dosage}
              placeholder="Dosage"
              type="number"
              icon="hash"
            />
            <AuthInput
              name="Manufacturer"
              value={val.manufacturer}
              placeholder="Manufacturer"
              type="number"
              icon="briefcase"
            />
            <div className="btn-box">
              {formState.medications.length !== 1 && (
                <Button
                  onClick={() => handleRemoveClick('medications', i)}
                  action="-"
                  color="pink"
                />
              )}
              {formState.medications.length - 1 === i && (
                <Button
                  onClick={() =>
                    handleAddClick('medications', {
                      medication: '',
                      dosage: '',
                      manufacturer: '',
                    })
                  }
                  action="+"
                  color="pink"
                />
              )}
            </div>
          </div>
        );
      })}

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
      {formState.languages.map((val, i) => {
        return (
          <div key={uuidv4()}>
            <AuthInput
              name="Language"
              value={val.language}
              placeholder="Language Spoken"
              type="text"
              icon="language"
            />
            <div className="btn-box">
              {formState.languages.length !== 1 && (
                <Button
                  onClick={() => handleRemoveClick('languages', i)}
                  action="-"
                  color="pink"
                />
              )}
              {formState.languages.length - 1 === i && (
                <Button
                  onClick={() =>
                    handleAddClick('languages', {
                      language: '',
                    })
                  }
                  action="+"
                  color="pink"
                />
              )}
            </div>
          </div>
        );
      })}
    </>
  );

  return (
    <div className="form-wrapper ">
      {isDoctor ? doctorSignup : clientSignup}
    </div>
  );
};

export default StepThree;
