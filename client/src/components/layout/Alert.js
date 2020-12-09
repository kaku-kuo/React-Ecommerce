import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';


const Alert = ({ alert }) => {

    return (

        <div className="container">
         {alert.length > 0 && alert.map(al =>(
            <div key={al.id} className={`alert alert-${al.type}`} role="alert">
            <FontAwesomeIcon icon={['fas', 'exclamation-circle']}/>{al.msg}
         </div> 
         ))}
        </div>
     
    )
}

Alert.propTypes = {
    alert:PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alert:state.alert
});

export default connect(mapStateToProps, null)(Alert);