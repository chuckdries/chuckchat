import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

const MessageForm = ({
  dirty,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit}>
    <div>
      <input type="text" name="user" onChange={handleChange} onBlur={handleBlur} value={values.user} placeholder="User" />
      {touched.user && errors.user && <span>{errors.user}</span>}
    </div>
    <div>
      <input type="text" name="message" onChange={handleChange} onBlur={handleBlur} value={values.message} placeholder="Message" />
      {touched.message && errors.message && <span>{errors.message}</span>}
    </div>
    <button type="submit" disabled={isSubmitting || Object.values(errors).length || !dirty}>
      send
    </button>
  </form>
);

export default withFormik({
  mapPropsToValues: () => ({ message: '', user: '' }),
  validate: ({ message, user }) => {
    const errors = {};
    if (!message) {
      errors.message = 'Required';
    }
    if (!user) {
      errors.user = 'Required';
    }
    return errors;
  },
  handleSubmit: (
    {
      user,
      message,
    },
    {
      props,
      resetForm,
      setSubmitting,
    },
  ) => {
    props.socket.emit('message', {
      user,
      message,
    });
    resetForm({ user, message: '' });
    setSubmitting(false);
  },
})(MessageForm);

MessageForm.propTypes = {
  dirty: PropTypes.bool,
  errors: PropTypes.shape({
    user: PropTypes.string,
    message: PropTypes.string,
  }),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  touched: PropTypes.shape({
    user: PropTypes.bool,
    message: PropTypes.bool,
  }),
  values: PropTypes.shape({
    user: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};
