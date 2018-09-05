import classnames from 'classnames';
import { FormikBag, withFormik } from 'formik';
import React from 'react';

interface FormAssoc {
  message?: string | boolean;
  user?: string | boolean;
}

interface InnerProps {
  dirty: boolean;
  errors: FormAssoc;
  handleBlur: any;
  handleChange: any;
  handleSubmit: any;
  touched: FormAssoc;
  values: FormAssoc;
  isSubmitting: boolean;
}

export interface Props {
  socket: any;
}

const MessageForm = ({
  dirty,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}: InnerProps) => (
  <form className="flex items-end pb1" onSubmit={handleSubmit}>
    <div className="flex" style={{ width: '250px' }}>
      <div className="flex flex-auto flex-column">
        {/*touched.user && errors.user && <span className="self-start fs-0">{errors.user}</span>*/}
        <input className={classnames({ invalid: touched.user && errors.user })} type="text" name="user" onChange={handleChange} onBlur={handleBlur} value={values.user as string} placeholder="User" />
      </div>
    </div>
    <div className="flex flex-auto">
      <div className="flex flex-auto flex-column">
        {/*touched.message && errors.message && <span className="self-start fs-0">{errors.message}</span>*/}
        <input className={classnames({ invalid: touched.message && errors.message })} type="text" name="message" onChange={handleChange} onBlur={handleBlur} value={values.message as string} placeholder="Message" />
      </div>
    </div>
    <div>
      <button className="p1" type="submit" disabled={Boolean(isSubmitting || Object.keys(errors).length || !dirty)}>
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
    }: FormAssoc,
    {
      props,
      resetForm,
      setSubmitting,
    }: FormikBag<Props, FormAssoc>,
  ) => {
    const { socket } = props;
    socket.emit('message', {
      message,
      user,
    }, () => {
      resetForm({ user, message: '' });
      setSubmitting(false);
    });
  },
  mapPropsToValues: () => ({ message: '', user: '' }),
  validate: ({ message, user }) => {
    const errors: FormAssoc = {};
    if (!message) {
      errors.message = 'This Field is Required';
    }
    if (!user) {
      errors.user = 'This Field is Required';
    }
    return errors;
  },
})(MessageForm);
