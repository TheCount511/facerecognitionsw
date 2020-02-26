import React from 'react';
import Loader from 'react-loader-spinner'
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box, loader, errorMessage }) => {
        return (
            <div className='center ma light-yellow'>
			<div className='absolute mt2' >
			<img id='input-image' alt='' src={imageUrl} width='500px' height='auto'/>
			  <Loader
           style={{display:loader}}
         type="Puff"
         color="#FBF1A9"
         height={30}
         width={30}
         timeout={5000} //5 secs
      />
      		<p>{errorMessage}</p>
			<div className='bounding-box' style={{top:box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div> </div> )
        }
        export default FaceRecognition;