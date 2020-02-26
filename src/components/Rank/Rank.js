import React from 'react';

 const Rank = ({name, entries}) => {

     return (
         <div className='light-yellow' >
         <div className='f3'>
         	{`${name}, your current rank is...`}
         </div>
          <div className='f1 yellow'>
         	{entries}
         </div>
		</div>

     );


 } 
 export default Rank;