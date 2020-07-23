import React from 'react';
import '../Form/Form.scss';
import Button from '../../../Button/Button';
import AuthInput from '../Form/AuthInput/AuthInput';
import AuthSelect from '../Form/AuthSelect/AuthSelect';
import languages from '../Form/languages';

const StepThree = ({
  formState,
  onValueChange,
  handleAddClick,
  handleRemoveClick,
  onArrValueChange,
  handleLanguages,
}) => {
  const { isDoctor } = formState;
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
          <div key={i}>
            <AuthInput
              name="condition"
              value={val.condition}
              placeholder="Condition"
              type="text"
              icon="condition"
              onValueChange={e =>
                onArrValueChange(e, 'existingConditions', i, 'condition')
              }
            />
            <AuthInput
              name="conditionStartDate"
              value={val.conditionStartDate}
              // placeholder="Condition Start Date"
              type="date"
              icon="calendar"
              placeholder="Start date"
              isDate
              max="2020-01-01"
              min="1900-01-01"
              onValueChange={e =>
                onArrValueChange(
                  e,
                  'existingConditions',
                  i,
                  'conditionStartDate'
                )
              }
            />
            <AuthInput
              name="conditionComment"
              value={val.conditionComment}
              placeholder="Comments"
              type="text"
              icon="textArea"
              onValueChange={e =>
                onArrValueChange(e, 'existingConditions', i, 'conditionComment')
              }
            />
            <div className="btn-box">
              {formState.existingConditions.length !== 1 && (
                <Button
                  onClick={() => handleRemoveClick('existingConditions', i)}
                  icon="minus"
                  color="mid"
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
                  icon="plus"
                  color="mid"
                />
              )}
            </div>
          </div>
        );
      })}

      <h3>Allergies</h3>

      {formState.allergies.map((val, i) => {
        return (
          <div key={i}>
            <AuthInput
              name="allergy"
              value={val.allergy}
              placeholder="Allergy"
              type="text"
              icon="alertCircle"
              onValueChange={e =>
                onArrValueChange(e, 'allergies', i, 'allergy')
              }
            />

            <AuthSelect
              name="severity"
              value={val.severity}
              placeholder="Severity"
              type="text"
              icon="hash"
              directive="allergy"
              options={severityOptions}
              onValueChange={e =>
                onArrValueChange(e, 'allergies', i, 'severity')
              }
            />
            <div className="btn-box">
              {formState.allergies.length !== 1 && (
                <Button
                  onClick={() => handleRemoveClick('allergies', i)}
                  icon="minus"
                  color="mid"
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
                  icon="plus"
                  color="mid"
                />
              )}
            </div>
          </div>
        );
      })}

      <h3>Medication</h3>

      {formState.medications.map((val, i) => {
        return (
          <div key={i}>
            <AuthInput
              name="medication"
              value={val.medication}
              placeholder="Medication"
              type="text"
              icon="medication"
              onValueChange={e =>
                onArrValueChange(e, 'medications', i, 'medication')
              }
            />
            <AuthInput
              name="dosage"
              value={val.dosage}
              placeholder="Dosage (mg)"
              type="number"
              min="1"
              max="5000"
              icon="hash"
              onValueChange={e =>
                onArrValueChange(e, 'medications', i, 'dosage')
              }
            />
            <AuthInput
              name="manufacturer"
              value={val.manufacturer}
              placeholder="Manufacturer"
              type="text"
              icon="briefcase"
              onValueChange={e =>
                onArrValueChange(e, 'medications', i, 'manufacturer')
              }
            />
            <div className="btn-box">
              {formState.medications.length !== 1 && (
                <Button
                  onClick={() => handleRemoveClick('medications', i)}
                  icon="minus"
                  color="mid"
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
                  icon="plus"
                  color="mid"
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
        directive="blood"
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
        console.log(val);
        return (
          <div key={i} className="auth-multi">
            {/* <AuthInput
              name="language"
              value={val}
              placeholder="Language Spoken"
              type="text"
              icon="language"
              // onValueChange={e =>
              //   onArrValueChange(e, 'languages', i, 'language')
              // }
              onValueChange={e => on2DArrValueChange(e, 'languages')}
            /> */}
            <AuthSelect
              value={formState.languages[i]}
              placeholder="Language"
              type="text"
              directive="language"
              icon="language"
              options={languages}
              onValueChange={e => handleLanguages(e, i)}
            />
            <div className="btn-box">
              {formState.languages.length !== 1 && (
                <Button
                  onClick={() => handleRemoveClick('languages', i)}
                  icon="minus"
                  color="mid"
                />
              )}
              {formState.languages.length - 1 === i && (
                <Button
                  onClick={() =>
                    handleAddClick('languages', {
                      language: '',
                    })
                  }
                  icon="plus"
                  color="mid"
                />
              )}
            </div>
          </div>
        );
      })}
    </>
  );

  return <div>{isDoctor ? doctorSignup : clientSignup}</div>;
};

export default StepThree;
