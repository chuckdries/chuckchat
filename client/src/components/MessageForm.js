import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import classnames from 'classnames';

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
  <form className="flex" onSubmit={handleSubmit}>
    <div className="flex p1" style={{ width: '300px' }}>
      <div className="flex flex-auto flex-column">
        <input className={classnames({ invalid: touched.user && errors.user })} type="text" name="user" onChange={handleChange} onBlur={handleBlur} value={values.user} placeholder="User" />
        {touched.user && errors.user && <span className="self-start fs-0">{errors.user}</span>}
      </div>
    </div>
    <div className="flex flex-auto p1">
      <div className="flex flex-auto flex-column">
        <input className={classnames({ invalid: touched.message && errors.message })} type="text" name="message" onChange={handleChange} onBlur={handleBlur} value={values.message} placeholder="Message" />
        {touched.message && errors.message && <span className="self-start fs-0">{errors.message}</span>}
      </div>
    </div>
    <div className="p1">
      <button className="p1" type="submit" disabled={isSubmitting || Object.values(errors).length || !dirty}>
        send
      </button>
    </div>
  </form>
);

export default withFormik({
  handleSubmit: (
    {
      message,
      user,
    },
    {
      props,
      resetForm,
      setSubmitting,
    },
  ) => {
    props.socket.emit('message', {
      message,
      user,
    }, () => {
      resetForm({ user, message: '' });
      setSubmitting(false);
    });
  },
  mapPropsToValues: () => ({ message: '', user: '' }),
  validate: ({ message, user }) => {
    const errors = {};
    if (!message) {
      errors.message = 'This Field is Required';
    }
    if (!user) {
      errors.user = 'This Field is Required';
    }
    return errors;
  },
})(MessageForm);

MessageForm.propTypes = {
  dirty: PropTypes.bool,
  errors: PropTypes.shape({
    message: PropTypes.string,
    user: PropTypes.string,
  }),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  touched: PropTypes.shape({
    message: PropTypes.bool,
    user: PropTypes.bool,
  }),
  values: PropTypes.shape({
    message: PropTypes.string,
    user: PropTypes.string,
  }).isRequired,
};
