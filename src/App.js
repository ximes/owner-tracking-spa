import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div id="layout">
        <div id="header">HEader</div>
        <div id="container">
          <div id="tabs">
            <div id="tab-motorcycles">
              <div id="tab-motorcycles-map"></div>
              <div id="tab-motorcycles-actions">
                <div id="tab-motorcycles-actions-submit-trigger">+</div>
                <div id="tab-motorcycles-actions-edit-trigger">Search/Edit - TODO</div>
                <div id="tab-motorcycles-actions-help-trigger">?</div>
              </div>
              <div id="tab-motorcycles-submit-modal"></div>
              <div id="tab-motorcycles-help-modal"></div>
            </div>
            <div id="tab-events">Events - TODO</div>
          </div>
        </div>
        <div id="footer">Footer</div>
      </div>
    </div>
  );
}

export default App;
