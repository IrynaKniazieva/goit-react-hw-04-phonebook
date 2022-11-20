import React from "react"
import styles from './Filter.module.css'
import PropTypes from 'prop-types';

const Filter = ({filter, onChange}) => (
    <div className={styles.contactFilter}>
        <label className={styles.contactFilterLabel}>
        Find contact by name
        </label>
        <input className={styles.contactFilterInput}
            type="text"
            value={filter}
            onChange={onChange}
      ></input>
        
    </div>

)

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,

  };

export default Filter