import React from 'react';
//import createFeed from '@S/createFeedLead';
//import { useFormState } from 'react-dom';

//async function getData() {
//  const res = await fetch('http://localhost:3000/akhundelar');
//  return res.json();
//}
 
export default /*async*/function Feed() {
  //let [state, formAction] = useFormState(createFeed, initialState);
 // let post = getData();
 // console.log(post);
  return (
    // <form action={createFeed}>
      <>
        <div className="grid grid-cols-[77%_max(23%)] size-full">
          <div className="feed-container h-screen">
            <div>
            </div>
          </div>
          <div className="right-margin">
          </div>
        </div>
        <div className="grid grid-cols-subgrid col-span-2 text-center">
        </div>
      </>
    //</form>
  );
}

// Use inline flex
