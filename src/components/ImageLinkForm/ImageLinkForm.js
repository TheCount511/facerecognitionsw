 import React from 'react';
 import './ImageLinkForm.css'
 

 const ImageLinkForm = ({onInputChange, onPictureSubmit}) => {

     return (
         <div className='ma4 mt0'>
         <p className='f3'>
         {'This Magic Brain will detect faces in your picture try it out'}</p> 
		<div className='center'>
		<div className='form center shadow-5 pa4 br3'>
			<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
			<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-blue' onClick={onPictureSubmit}>Detect</button>
			</div>
		</div>
		</div>

     );


 } 
 export default ImageLinkForm;