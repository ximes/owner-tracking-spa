import React from 'react';
import ReactDOM from 'react-dom';
import CapoSubmitForm from './CapoSubmitForm';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CapoSubmitForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});