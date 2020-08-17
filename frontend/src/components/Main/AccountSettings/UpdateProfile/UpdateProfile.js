import React, { useState, useContext } from 'react';
import AuthInput from '../../Authentication/Form/AuthInput/AuthInput';
import AuthSelect from '../../Authentication/Form/AuthSelect/AuthSelect';
import countries from '../../Authentication/Form/countries';
import Button from '../../../Button/Button';
import { navigate } from '@reach/router';
import { AuthContext, MessageContext } from '../../../../globalState/index';
import { updateProfile } from '../../../AxiosTest/userRoutes';
import moment from 'moment';
import { request } from '../../../AxiosTest/config.js';
import { signOutAll, deleteProfile } from '../../../AxiosTest/userRoutes.js';
import Card from '../../../Card/Card';

const UpdateProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const { flashMessage, setFlashMessage } = useContext(MessageContext);

  const sexOptions = ['male', 'female'];
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const severityOptions = [1, 2, 3, 4, 5];

  const [uploadedImage, setUploadedImage] = useState({});
  const [imgSrc, setImgSrc] = useState(null);

  const sanitizeForm = () => {
    const formFormRequest = Object.assign({}, user);

    if (formFormRequest.doctorInfo && formFormRequest.doctorInfo.rating) {
      delete formFormRequest.doctorInfo.rating;
    }

    //obj key and subkey
    if (formFormRequest.isDoctor === false) {
      deleteUnwantedKeys(formFormRequest, 'allergies', '_id');
      deleteUnwantedKeys(formFormRequest, 'medicalHistory', '_id');
      deleteUnwantedKeys(formFormRequest, 'medication', '_id');
    }

    if (formFormRequest.email) {
      delete formFormRequest.email;
    }

    if (formFormRequest.confirmPassword) {
      delete formFormRequest.confirmPassword;
    }

    if (formFormRequest.isDoctor) {
      delete formFormRequest.isDoctor;
    }

    if (formFormRequest._id) {
      delete formFormRequest._id;
    }

    if (formFormRequest.createdAt) {
      delete formFormRequest.createdAt;
    }

    if (formFormRequest.__v) {
      delete formFormRequest.__v;
    }

    return formFormRequest;
  };

  const onValueChange = (e, key) => {
    setFlashMessage(null);
    setUser({
      ...user,
      [key]: e.target.value,
    });
  };

  const onNestedValueChange = (e, key, subKey) => {
    const targetObject = user[key];
    targetObject[subKey] = e.target.value;
    setFlashMessage(null);
    setUser({
      ...user,
      [key]: targetObject,
    });
  };

  const onNestedArrObjValueChange = (e, key, subKey, i, objKey) => {
    const targetObject = user[key];
    targetObject[subKey][i][objKey] = e.target.value;

    setUser({
      ...user,
      [key]: targetObject,
    });
  };

  const handleRemoveClick = (key, i, subKey) => {
    const targetObject = user[key];
    targetObject[subKey].splice(i, 1);
    setUser({
      ...user,
      [key]: targetObject,
    });
  };

  const handleAddMultiClick = (key, subKey, obj) => {
    const targetObject = user[key];
    targetObject[subKey].push(obj);

    setUser({
      ...user,
      [key]: targetObject,
    });
  };

  const checkEmptyInputFields = key => {
    user.clientInfo[key].forEach(el => {
      const inputValues = Object.values(el);

      for (let i = 0; i < inputValues.length; i++) {
        if (!inputValues[i]) {
          setFlashMessage({
            message: `Please enter all fields`,
            type: 'error',
            icon: 'alert',
          });
          return null;
        }
      }
    });
  };

  const deleteUnwantedKeys = (obj, key, subKey) => {
    obj.clientInfo[key].forEach(el => {
      if (el[subKey]) {
        delete el[subKey];
      }
    });

    return obj;
  };

  //handler for submitting form
  const handleSubmit = async () => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (
      !user.firstName ||
      !user.lastName ||
      !user.title ||
      !user.dateOfBirth ||
      !user.phoneNumber ||
      !user.address.number ||
      !user.address.state ||
      !user.address.street ||
      !user.address.city ||
      !user.address.country ||
      !user.address.postcode ||
      !user.password
    ) {
      setFlashMessage({
        message: `Please fill in all the inputs`,
        type: 'error',
        icon: 'alert',
      });
      return null;
    }

    if (user.password !== user.confirmPassword) {
      setFlashMessage({
        message: `Passwords do not match`,
        type: 'error',
        icon: 'alert',
      });
      return null;
    }

    if (!emailRegex.test(user.email)) {
      setFlashMessage({
        message: `Please enter a valid email`,
        type: 'error',
        icon: 'alert',
      });
      return null;
    }

    if (user.clientInfo) {
      checkEmptyInputFields('medicalHistory');
      checkEmptyInputFields('allergies');
      checkEmptyInputFields('medication');

      if (!user.clientInfo.bloodType) {
        setFlashMessage({
          message: `Please enter your blood type`,
          type: 'error',
          icon: 'alert',
        });
        return null;
      }

      if (!user.clientInfo.weight) {
        setFlashMessage({
          message: `Please enter your weight`,
          type: 'error',
          icon: 'alert',
        });
        return null;
      }
    }

    if (uploadedImage) {
      if (uploadedImage.size > 1000000) {
        setFlashMessage({
          message: `'${uploadedImage.name}' is too large, please pick a file under 1mb`,
          type: 'error',
          icon: 'alert',
        });
        return null;
      } else {
        const fd = new FormData();

        fd.append('image', uploadedImage, uploadedImage.name);
        if (fd) {
          try {
            const responseFile = await request.post('/uploads', fd, {});
            console.log(responseFile);
            const responseUpdateUser = await updateProfile({
              profileImage: responseFile.data.Location,
            });
            console.log(responseUpdateUser);
            setUser(responseUpdateUser.data);
          } catch (err) {
            console.log(err);
            setFlashMessage({
              message: `Something went wrong - ${err.message}`,
              type: 'error',
              icon: 'alert',
            });
            return null;
          }
        }
      }
    }

    if (flashMessage === null) {
      const updateData = async () => {
        const cloneForm = sanitizeForm();
        // console.log(cloneForm);
        try {
          const response = await updateProfile(cloneForm);
          console.log(response);
          setUser(response.data);
          navigate('/profile');
        } catch (err) {
          console.log(err);
          setFlashMessage({
            message: `Something went wrong - ${err.message}`,
            type: 'error',
            icon: 'alert',
          });
          return null;
        }
      };
      updateData();
    }
  };

  const handleSignOutAll = async () => {
    try {
      await signOutAll(setUser, '/');
    } catch (error) {
      console.log(error);
      setUser({
        ...user,
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteProfile(setUser, '/');
    } catch (error) {
      console.log(error);
      setUser({
        ...user,
      });
    }
  };

  const handleChange = event => {
    const file = event.target.files[0];
    if (
      file.type === 'image/gif' ||
      file.type === 'image/png' ||
      file.type === 'image/bmp' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg'
    ) {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          setImgSrc(reader.result);
        },
        false
      );
      reader.readAsDataURL(file);
      setUploadedImage(file);
    } else {
      alert('Please upload a valid image type');
    }
  };

  const handleImageUpload = async e => {
    e.preventDefault();

    if (
      Object.keys(uploadedImage).length === 0 &&
      uploadedImage.constructor === Object
    ) {
      setFlashMessage({
        message: `Please include an image`,
        type: 'error',
        icon: 'alert',
      });
      return null;
    }

    if (uploadedImage.size > 1000000) {
      setFlashMessage({
        message: `'${uploadedImage.name}' is too large, please pick a file under 1mb`,
        type: 'error',
        icon: 'alert',
      });
      return null;
    }

    const fd = new FormData();

    fd.append('image', uploadedImage, uploadedImage.name);

    if (fd) {
      try {
        const responseFile = await request.post('/uploads', fd, {
          onUploadProgress: progressEvent => {
            console.log(
              'Upload Progress: ' +
                Math.round(progressEvent.loaded / progressEvent.total) * 100
            );
          },
        });
        console.log(responseFile);

        const responseUpdateUser = await updateProfile({
          profileImage: responseFile.data.Location,
        });
        console.log(responseUpdateUser);
        setUser(responseUpdateUser.data);
        navigate('/profile');
      } catch (err) {
        console.log(err);
        setFlashMessage({
          message: `something went wrong - ${err.message}`,
          type: 'error',
          icon: 'alert',
        });
        return null;
      }
    }
  };

  if (user) {
    return (
      <div className="update-profile-wrapper">
        <h1 className="account-settings-heading">Update your profile</h1>
        <div className="account-control">
          <Button
            action="Delete your account"
            color="pink"
            icon="cross"
            onClick={() => {
              handleDeleteAccount();
            }}
          />
          <Button
            action="Sign out all sessions"
            color="dark"
            icon="logOutLarge"
            onClick={() => {
              handleSignOutAll();
            }}
          />
        </div>
        <div className="image-upload-container">
          <Card>
            <div className="image-upload-wrapper">
              <form>
                <label htmlFor="img">Upload your profile image</label>
                <div className="preview-wrapper">
                  <div>
                    <AuthInput
                      type="file"
                      id="img"
                      name="img"
                      accept="image/*"
                      onValueChange={handleChange}
                      icon="upload"
                    />
                    <Button
                      action="Upload"
                      icon="uploadCloud"
                      onClick={handleImageUpload}
                      color="mid"
                    />
                  </div>
                  <div className="preview-container">
                    <div className="progress"></div>
                    {imgSrc ? (
                      <img className="preview" src={imgSrc} alt="" />
                    ) : null}
                  </div>
                </div>
              </form>
            </div>
          </Card>
        </div>
        <div className="form-wrapper">
          <div className="trim" />
          <div className="form-container">
            <div className="form-header">
              <h2>Login Details</h2>
            </div>
            <AuthInput
              value={user.password || ''}
              placeholder="Password"
              type="password"
              icon="password"
              minLength="6"
              onValueChange={e => onValueChange(e, 'password')}
              // validationIcon={formState.validationIcon}
            />
            <AuthInput
              value={user.confirmPassword || ''}
              placeholder="Confirm"
              type="password"
              icon="password"
              minLength="6"
              onValueChange={e => onValueChange(e, 'confirmPassword')}
              // validationIcon={formState.validationIcon}
            />
            <div className="form-header">
              <h3>Basic Information</h3>
            </div>
            <AuthSelect
              value={user.title}
              placeholder="Title"
              type="text"
              maxLength="30"
              icon="licence"
              onValueChange={e =>
                onNestedValueChange(e, 'doctorInfo', 'licence')
              }
            />
            <AuthInput
              value={user.firstName}
              placeholder="First Name"
              type="text"
              minLength="2"
              maxLength="26"
              icon="username"
              onValueChange={e => onValueChange(e, 'firstName')}
            />
            <AuthInput
              value={user.lastName}
              placeholder="Last Name"
              type="text"
              minLength="2"
              maxLength="26"
              icon="username"
              onValueChange={e => onValueChange(e, 'lastName')}
            />
            <AuthSelect
              value={user.sex}
              placeholder="Sex"
              type="text"
              icon="users"
              directive="sex"
              options={sexOptions}
              onValueChange={e => onValueChange(e, 'sex')}
            />
            <AuthInput
              value={moment(user.dateOfBirth).format('YYYY-MM-DD')}
              placeholder="Date of Birth"
              type="date"
              icon="calendar"
              isDate
              max="2020-01-01"
              min="1900-01-01"
              onValueChange={e => onValueChange(e, 'dateOfBirth')}
            />
            <AuthInput
              value={user.phoneNumber}
              placeholder="Mobile number"
              type="tel"
              pattern="[0-9]{10}"
              icon="phone"
              isMobile
              onValueChange={e => onValueChange(e, 'phoneNumber')}
              minLength="9"
              maxLength="12"
            />
            <div className="form-header">
              <h3>Address</h3>
            </div>
            <AuthInput
              value={user.address.number}
              placeholder="Street No."
              type="text"
              icon="hash"
              minLength="1"
              maxLength="28"
              onValueChange={e => onNestedValueChange(e, 'address', 'number')}
            />
            <AuthInput
              value={user.address.street}
              placeholder="Street"
              type="text"
              icon="mapPin"
              minLength="2"
              maxLength="95"
              onValueChange={e => onNestedValueChange(e, 'address', 'street')}
            />
            <AuthInput
              value={user.address.city}
              placeholder="City"
              type="text"
              icon="home"
              minLength="2"
              maxLength="28"
              onValueChange={e => onNestedValueChange(e, 'address', 'city')}
            />
            <AuthInput
              value={user.address.state}
              placeholder="State"
              type="text"
              icon="postcode"
              minLength="2"
              maxLength="28"
              onValueChange={e => onNestedValueChange(e, 'address', 'state')}
            />
            <AuthSelect
              value={user.address.country}
              placeholder="Country"
              type="text"
              icon="navArrow"
              options={countries}
              onValueChange={e => onNestedValueChange(e, 'address', 'country')}
            />
            <AuthInput
              value={user.address.postcode}
              placeholder="Postcode"
              type="number"
              icon="postcode"
              min="1"
              max="100000"
              maxLength="6"
              onValueChange={e => onNestedValueChange(e, 'address', 'postcode')}
            />
            {!user.isDoctor && (
              <>
                <h2>Medical Information</h2>
                <div className="form-header">
                  <h3>Existing Conditions</h3>
                </div>
                {user.clientInfo.medicalHistory.map((val, i) => {
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
                          onNestedArrObjValueChange(
                            e,
                            'clientInfo',
                            'medicalHistory',
                            i,
                            'condition'
                          )
                        }
                      />
                      <AuthInput
                        name="conditionStartDate"
                        value={moment(val.startDate).format('YYYY-MM-DD')}
                        type="date"
                        icon="calendar"
                        placeholder="Start date"
                        isDate
                        max="2020-01-01"
                        min="1900-01-01"
                        onValueChange={e =>
                          onNestedArrObjValueChange(
                            e,
                            'clientInfo',
                            'medicalHistory',
                            i,
                            'startDate'
                          )
                        }
                      />
                      <AuthInput
                        name="conditionComment"
                        value={val.notes}
                        placeholder="Comments"
                        type="text"
                        maxLength="100"
                        icon="textArea"
                        onValueChange={e =>
                          onNestedArrObjValueChange(
                            e,
                            'clientInfo',
                            'medicalHistory',
                            i,
                            'notes'
                          )
                        }
                      />
                      <div className="btn-box update-account">
                        {user.clientInfo.medicalHistory.length !== 1 && (
                          <Button
                            onClick={() =>
                              handleRemoveClick(
                                'clientInfo',
                                i,
                                'medicalHistory'
                              )
                            }
                            icon="minus"
                            color="mid"
                          />
                        )}
                        {user.clientInfo.medicalHistory.length - 1 === i && (
                          <Button
                            onClick={() =>
                              user.clientInfo.medicalHistory[i].condition !==
                                '' &&
                              user.clientInfo.medicalHistory[i].startDate !==
                                '' &&
                              user.clientInfo.medicalHistory[i].notes !== '' &&
                              handleAddMultiClick(
                                'clientInfo',
                                'medicalHistory',
                                {
                                  condition: '',
                                  startDate: '',
                                  notes: '',
                                }
                              )
                            }
                            icon="plus"
                            color="mid"
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
                <div className="form-header">
                  <h3>Allergies</h3>
                </div>
                {user.clientInfo.allergies.map((val, i) => {
                  return (
                    <div key={i}>
                      <AuthInput
                        name="allergy"
                        value={val.name}
                        placeholder="Allergy"
                        type="text"
                        maxLength="30"
                        icon="alertCircle"
                        onValueChange={e =>
                          onNestedArrObjValueChange(
                            e,
                            'clientInfo',
                            'allergies',
                            i,
                            'name'
                          )
                        }
                      />

                      <AuthSelect
                        name="severity"
                        value={val.severity}
                        placeholder="Severity"
                        type="text"
                        icon="hash"
                        isDate
                        directive="allergy"
                        options={severityOptions}
                        onValueChange={e =>
                          onNestedArrObjValueChange(
                            e,
                            'clientInfo',
                            'allergies',
                            i,
                            'severity'
                          )
                        }
                      />
                      <div className="btn-box update-account">
                        {user.clientInfo.allergies.length !== 1 && (
                          <Button
                            onClick={() =>
                              handleRemoveClick('clientInfo', i, 'allergies')
                            }
                            icon="minus"
                            color="mid"
                          />
                        )}
                        {user.clientInfo.allergies.length - 1 === i && (
                          <Button
                            onClick={() =>
                              user.clientInfo.allergies[i].name !== '' &&
                              user.clientInfo.allergies[i].severity !== '' &&
                              handleAddMultiClick('clientInfo', 'allergies', {
                                name: '',
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
                <div className="form-header">
                  <h3>Medication</h3>
                </div>
                {user.clientInfo.medication.map((val, i) => {
                  return (
                    <div key={i}>
                      <AuthInput
                        name="medication"
                        value={val.name}
                        placeholder="Medication"
                        type="text"
                        icon="medication"
                        maxLength="30"
                        onValueChange={e =>
                          onNestedArrObjValueChange(
                            e,
                            'clientInfo',
                            'medication',
                            i,
                            'name'
                          )
                        }
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
                          onNestedArrObjValueChange(
                            e,
                            'clientInfo',
                            'medication',
                            i,
                            'dosage'
                          )
                        }
                      />
                      <AuthInput
                        name="manufacturer"
                        value={val.manufacturer}
                        placeholder="Manufacturer"
                        type="text"
                        icon="briefcase"
                        maxLength="30"
                        onValueChange={e =>
                          onNestedArrObjValueChange(
                            e,
                            'clientInfo',
                            'medication',
                            i,
                            'manufacturer'
                          )
                        }
                      />
                      <div className="btn-box update-account">
                        {user.clientInfo.medication.length !== 1 && (
                          <Button
                            onClick={() =>
                              handleRemoveClick('clientInfo', i, 'medication')
                            }
                            icon="minus"
                            color="mid"
                          />
                        )}
                        {user.clientInfo.medication.length - 1 === i && (
                          <Button
                            onClick={() =>
                              user.clientInfo.medication[i].name !== '' &&
                              user.clientInfo.medication[i].dosage !== '' &&
                              user.clientInfo.medication[i].manufacturer !==
                                '' &&
                              handleAddMultiClick('clientInfo', 'medication', {
                                name: '',
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
                <div className="form-header">
                  <h3>Blood Type & Weight</h3>
                </div>
                <AuthSelect
                  value={user.clientInfo.bloodType}
                  placeholder="Blood Type"
                  icon="heart"
                  directive="blood"
                  options={bloodTypes}
                  onValueChange={e =>
                    onNestedValueChange(e, 'clientInfo', 'bloodType')
                  }
                />
                <AuthInput
                  value={user.clientInfo.weight}
                  placeholder="Weight (kg)"
                  type="number"
                  min="1"
                  max="300"
                  maxLength="3"
                  icon="clipboard"
                  onValueChange={e =>
                    onNestedValueChange(e, 'clientInfo', 'weight')
                  }
                />
              </>
            )}
            <Button
              action="Update"
              color="pink"
              onClick={handleSubmit}
              icon="check"
            />
          </div>
        </div>
      </div>
    );
  } else {
    return '';
  }
};

export default UpdateProfile;
