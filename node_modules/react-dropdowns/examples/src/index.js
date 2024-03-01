var Dropdown = require('../../dist/react-dropdowns');
var React = require('react');
var ReactDOM = require('react-dom');

var App = (
  <div className="react-dropdowns">
    <h3>react-dropdown</h3>

    <Dropdown toggle={<button type="button">Toggle</button>}>
      <Dropdown.Item label="Item 1" />
      <Dropdown.Item label="Item 2">
        <Dropdown.Item label="Item A" />
        <Dropdown.Item label="Item B" href="/" />
        <Dropdown.Item label="Item C">
          <Dropdown.Item label="Item I" />
          <Dropdown.Item label="Item II" />
        </Dropdown.Item>
      </Dropdown.Item>
    </Dropdown>

  </div>
);

ReactDOM.render(App, document.getElementById('app'));