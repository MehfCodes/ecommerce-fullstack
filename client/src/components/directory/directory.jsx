import React, { Component } from 'react';
import MenuItem from '../menuItem/menuItem';
import './directory.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySection } from '../../redux/directory/directory.selector';
function Directory({ sections }) {
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...otherSections }) => {
        return <MenuItem key={id} {...otherSections} />;
      })}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySection,
});
export default connect(mapStateToProps)(Directory);
