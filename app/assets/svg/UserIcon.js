import React from 'react';
import PropTypes from 'prop-types';

const UserIcon = ({ bgColor, width, height }) => (
    <svg 
    width="16px"
    height="16px"
    viewBox="0 0 55 55">
<g>
	<g>
		<path d="M24.827,0C11.138,0,0.001,11.138,0.001,24.827c0,13.689,11.137,24.827,24.826,24.827
			c13.688,0,24.826-11.138,24.826-24.827C49.653,11.138,38.517,0,24.827,0z M39.142,38.51c0-0.574,0-0.979,0-0.979
			c0-3.386-3.912-4.621-6.006-5.517c-0.758-0.323-2.187-1.011-3.653-1.728c-0.495-0.242-0.941-0.887-0.997-1.438l-0.162-1.604
			c1.122-1.045,2.133-2.5,2.304-4.122h0.253c0.398,0,0.773-0.298,0.832-0.663l0.397-2.453c0.053-0.524-0.442-0.842-0.843-0.842
			c0.011-0.052,0.02-0.105,0.025-0.149c0.051-0.295,0.082-0.58,0.102-0.857c0.025-0.223,0.045-0.454,0.056-0.693
			c0.042-1.158-0.154-2.171-0.479-2.738c-0.33-0.793-0.83-1.563-1.526-2.223c-1.939-1.836-4.188-2.551-6.106-1.075
			c-1.306-0.226-2.858,0.371-3.979,1.684c-0.612,0.717-0.993,1.537-1.156,2.344c-0.146,0.503-0.243,1.112-0.267,1.771
			c-0.026,0.733,0.046,1.404,0.181,1.947c-0.382,0.024-0.764,0.338-0.764,0.833l0.396,2.453c0.059,0.365,0.434,0.663,0.832,0.663
			h0.227c0.36,1.754,1.292,3.194,2.323,4.198l-0.156,1.551c-0.056,0.55-0.502,1.193-0.998,1.438
			c-1.418,0.692-2.815,1.358-3.651,1.703c-1.97,0.812-6.006,2.131-6.006,5.517v0.766c-3.288-3.541-5.316-8.266-5.316-13.467
			c0-10.932,8.894-19.826,19.826-19.826c10.933,0,19.826,8.894,19.826,19.826C44.653,30.133,42.548,34.946,39.142,38.51z"/>
	</g>
</g>
</svg>

);

UserIcon.defaultProps = {
    bgColor: '',
    width: '16',
    height: '16',
};

UserIcon.propTypes = {
    bgColor: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
};

export default UserIcon;