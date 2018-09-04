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
  <form className="flex items-end pb1" onSubmit={handleSubmit}>
    <div className="flex" style={{ width: '250px' }}>
      <div className="flex flex-auto flex-column">
        {/*touched.user && errors.user && <span className="self-start fs-0">{errors.user}</span>*/}
        <input className={classnames({ invalid: touched.user && errors.user })} type="text" name="user" onChange={handleChange} onBlur={handleBlur} value={values.user} placeholder="User" />
      </div>
    </div>
    <div className="flex flex-auto">
      <div className="flex flex-auto flex-column">
        {/*touched.message && errors.message && <span className="self-start fs-0">{errors.message}</span>*/}
        <input className={classnames({ invalid: touched.message && errors.message })} type="text" name="message" onChange={handleChange} onBlur={handleBlur} value={values.message} placeholder="Message" />
      </div>
    </div>
    <div className="">
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
