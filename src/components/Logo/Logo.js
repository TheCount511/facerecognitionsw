 import React from 'react';
 import Tilt from 'react-tilt';
 import './Logo.css';
 import logo from './logo.png';

 const Logo = () => {

     return (
         <div className='ma4 mt0'>
<Tilt className="Tilt br3 shadow-2" options={{ max : 55 }} style={{ height: 140, width: 140 }} >
 <div className="Tilt-inner pa3"> <img style={{paddingTop:'5px'}} alt='Logo' src={logo}/></div> 
</Tilt>
			</div>
     );


 }
 export default Logo