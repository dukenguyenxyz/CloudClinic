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
  onInput,
  handleAddLanguage,
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
              maxLength="30"
              icon="condition"
              onValueChange={e =>
                onArrValueChange(e, 'existingConditions', i, 'condition')
              }
              dataCypress={`condition-${i}`}
            />
            <AuthInput
              name="conditionStartDate"
              value={val.startDate}
              type="date"
              icon="calendar"
              placeholder="Start date"
              isDate
              max="2020-01-01"
              min="1900-01-01"
              onValueChange={e =>
                onArrValueChange(e, 'existingConditions', i, 'startDate')
              }
              dataCypress={`conditionStartDate-${i}`}
            />
            <AuthInput
              name="conditionComment"
              value={val.notes}
              placeholder="Comments"
              type="text"
              maxLength="100"
              icon="textArea"
              onValueChange={e =>
                onArrValueChange(e, 'existingConditions', i, 'notes')
              }
              dataCypress={`conditionComment-${i}`}
            />
            <div className="btn-box">
              {formState.existingConditions.length !== 1 && (
                <Button
                  onClick={() => handleRemoveClick('existingConditions', i)}
                  icon="minus"
                  color="mid"
                  dataCypress={`conditionMinus-${i}`}
                />
              )}
              {formState.existingConditions.length - 1 === i && (
                <Button
                  onClick={() =>
                    formState.existingConditions[i].condition !== '' &&
                    handleAddClick('existingConditions', {
                      condition: '',
                      startDate: '',
                      notes: '',
                    })
                  }
                  icon="plus"
                  color="mid"
                  dataCypress={`conditionAdd-${i}`}
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
              value={val.name}
              placeholder="Allergy"
              type="text"
              maxLength="30"
              icon="alertCircle"
              onValueChange={e => onArrValueChange(e, 'allergies', i, 'name')}
              dataCypress={`allergy-${i}`}
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
              dataCypress={`severity-${i}`}
            />
            <div className="btn-box">
              {formState.allergies.length !== 1 && (
                <Button
                  onClick={() => handleRemoveClick('allergies', i)}
                  icon="minus"
                  color="mid"
                  dataCypress={`allergyMinus-${i}`}
                />
              )}
              {formState.allergies.length - 1 === i && (
                <Button
                  onClick={() =>
                    formState.allergies[i].name !== '' &&
                    handleAddClick('allergies', {
                      name: '',
                      severity: '',
                    })
                  }
                  icon="plus"
                  color="mid"
                  dataCypress={`allergyAdd-${i}`}
                />
              )}
            </div>
          </div>
        );
      })}

      <h3>Medication</h3>

      {formState.medication.map((val, i) => {
        return (
          <div key={i}>
            <AuthInput
              name="medication"
              value={val.name}
              placeholder="Medication"
              type="text"
              icon="medication"
              maxLength="30"
              onValueChange={e => onArrValueChange(e, 'medication', i, 'name')}
              dataCypress={`medication-${i}`}
            />
            <AuthInput
              name="dosage"
              value={val.dosage}
              placeholder="Dosage (mg)"
              type="number"
              min="1"
              max="5000"
              maxLength="4"
              icon="hash"
              onValueChange={e =>
                onArrValueChange(e, 'medication', i, 'dosage')
              }
              onInput={onInput}
              dataCypress={`dosage-${i}`}
            />
            <AuthInput
              name="manufacturer"
              value={val.manufacturer}
              placeholder="Manufacturer"
              type="text"
              icon="briefcase"
              maxLength="30"
              onValueChange={e =>
                onArrValueChange(e, 'medication', i, 'manufacturer')
              }
              dataCypress={`manufacturer-${i}`}
            />
            <div className="btn-box">
              {formState.medication.length !== 1 && (
                <Button
                  onClick={() => handleRemoveClick('medication', i)}
                  icon="minus"
                  color="mid"
                  dataCypress={`medicationMinus-${i}`}
                />
              )}
              {formState.medication.length - 1 === i && (
                <Button
                  onClick={() =>
                    formState.medication[i].name !== '' &&
                    handleAddClick('medication', {
                      name: '',
                      dosage: '',
                      manufacturer: '',
                    })
                  }
                  icon="plus"
                  color="mid"
                  dataCypress={`medicationAdd-${i}`}
                />
              )}
            </div>
          </div>
        );
      })}

      <h3>Blood Type & Weight</h3>
      <AuthSelect
        value={formState.bloodType}
        placeholder="Blood Type"
        icon="heart"
        directive="blood"
        options={bloodTypes}
        onValueChange={e => onValueChange(e, 'bloodType')}
        dataCypress="bloodType"
      />
      <AuthInput
        value={formState.weight}
        placeholder="Weight (kg)"
        type="number"
        min="1"
        max="300"
        maxLength="3"
        icon="clipboard"
        onValueChange={e => onValueChange(e, 'weight')}
        onInput={onInput}
        dataCypress="weight"
      />
    </>
  );

  const doctorSignup = (
    <>
      <AuthInput
        value={formState.licence}
        placeholder="Licence"
        type="text"
        maxLength="30"
        icon="licence"
        onValueChange={e => onValueChange(e, 'licence')}
        dataCypress="licence"
      />
      {formState.accreditations.map((val, i) => {
        return (
          <div key={i} className="auth-multi">
            <AuthInput
              name="accreditation"
              value={val.accreditation}
              placeholder="Accreditation"
              type="text"
              maxLength="30"
              icon="briefcase"
              onValueChange={e =>
                onArrValueChange(e, 'accreditations', i, 'accreditation')
              }
              dataCypress={`accreditation-${i}`}
            />
            <div className="btn-box">
              {formState.accreditations.length !== 1 && (
                <Button
                  onClick={() => handleRemoveClick('accreditations', i)}
                  icon="minus"
                  color="mid"
                  dataCypress={`accreditationMinus-${i}`}
                />
              )}
              {formState.accreditations.length - 1 === i && (
                <Button
                  onClick={() =>
                    formState.accreditations[i].accreditation !== '' &&
                    handleAddClick('accreditations', {
                      accreditation: '',
                    })
                  }
                  icon="plus"
                  color="mid"
                  dataCypress={`accreditationAdd-${i}`}
                />
              )}
            </div>
          </div>
        );
      })}
      <AuthInput
        value={formState.specialtyField}
        placeholder="Specialty Field"
        type="text"
        maxLength="30"
        icon="fileText"
        onValueChange={e => onValueChange(e, 'specialtyField')}
        dataCypress="specialtyField"
      />
      <AuthInput
        value={formState.subSpecialtyField}
        placeholder="Sub Specialty Field"
        type="text"
        maxLength="30"
        icon="fileText"
        onValueChange={e => onValueChange(e, 'subSpecialtyField')}
        dataCypress="subSpecialtyField"
      />
      {formState.educations.map((val, i) => {
        return (
          <div key={i} className="auth-multi">
            <AuthInput
              name="education"
              value={val.education}
              placeholder="Education"
              type="text"
              maxLength="30"
              icon="briefcase"
              onValueChange={e =>
                onArrValueChange(e, 'educations', i, 'education')
              }
              dataCypress={`education-${i}`}
            />
            <div className="btn-box">
              {formState.educations.length !== 1 && (
                <Button
                  onClick={() => handleRemoveClick('educations', i)}
                  icon="minus"
                  color="mid"
                  dataCypress={`educationMinus-${i}`}
                />
              )}
              {formState.educations.length - 1 === i && (
                <Button
                  onClick={() =>
                    formState.educations[i].education !== '' &&
                    handleAddClick('educations', {
                      education: '',
                    })
                  }
                  icon="plus"
                  color="mid"
                  dataCypress={`educationAdd-${i}`}
                />
              )}
            </div>
          </div>
        );
      })}
      <AuthInput
        value={formState.yearsExp}
        placeholder="Years of Experience"
        type="number"
        icon="hash"
        maxLength="2"
        onValueChange={e => onValueChange(e, 'yearsExp')}
        onInput={onInput}
        dataCypress="yearsExp"
      />
      {formState.languages.map((val, i) => {
        return (
          <div key={i} className="auth-multi">
            <AuthSelect
              value={formState.languages[i]}
              placeholder="Language"
              type="text"
              directive="language"
              icon="language"
              options={languages}
              onValueChange={e => handleLanguages(e, i)}
              dataCypress={`languages-${i}`}
            />
            <div className="btn-box">
              {formState.languages.length !== 1 && (
                <Button
                  onClick={() => handleRemoveClick('languages', i)}
                  icon="minus"
                  color="mid"
                  dataCypress={`languagesMinus-${i}`}
                />
              )}
              {formState.languages.length - 1 === i && (
                <Button
                  onClick={() =>
                    formState.languages[i] !== '' &&
                    handleAddLanguage('languages')
                  }
                  icon="plus"
                  color="mid"
                  dataCypress={`languagesAdd-${i}`}
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
