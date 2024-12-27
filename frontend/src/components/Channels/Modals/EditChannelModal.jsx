import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useValidationSchemas } from '../../../contexts/validationContex.jsx';
// надо все handleAdd/Delete/EditChannel перенести в ../../API/channels
import { handleEditChannel } from '../buttonHandlers.js';
import { closeModal } from '../../../store/slices/modalSlice';

const EditChannelModal = ({ channels, setError, token }) => {
  const { t } = useTranslation();
  // const { validationChannelSchema } = useValidationSchemas(); // ща перестала работать валидация...
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkDuplicate = (channelName) => {
    return channels.some(
      (channelItem) => channelItem.name.trim().toLowerCase() === channelName.trim().toLowerCase()
    );
  };

  const handleClose = () => {
    dispatch(closeModal()); // now we can close modal via reedux :)
  };

  const initialValues = { name: '' };

  const onSubmit = (values, actions) => {
    setIsSubmitting(true);
    if (checkDuplicate(values.name)) {
      setError(t('validationErrors.duplicate'));
      actions.setSubmitting(false);
      setIsSubmitting(false);
      return;
    }

    handleEditChannel(values, actions, channels, dispatch, handleClose, setError, token, t);
  };

  useEffect(() => {
    setIsSubmitting(false);
  }, [channels]);

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('channels.addNewChannel')}</h5>
            <button type="button" className="btn-close" onClick={handleClose} />
          </div>
          <div className="modal-body">
            <Formik
              initialValues={initialValues}
              // validationSchema={validationChannelSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      {t('channels.modals.labels.typeNewChannelName')}
                    </label>
                    <Field
                      type="text"
                      id="name"
                      className="form-control"
                      name="name"
                      placeholder={t('modals.rename')}
                    />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="me-2 btn btn-secondary" onClick={handleClose}>
                      {t('channels.cancel')}
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting} // Disable the button while submitting
                    >
                      {t('channels.add')}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditChannelModal;
