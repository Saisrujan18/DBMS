/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
function ProfileCard({title,description,target})
{
  // const history = useNavigate();
  function nav(){
    // history(target);
  }
    return (
      <div className="max-w-sm w-full lg:max-w-full lg:flex" onClick={()=>{nav()}}>
        <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" >
        </div>
        <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div class="mb-4">
            <div class="text-gray-900 font-bold text-xl mb-2">{title}</div>
            <p class="text-gray-700 text-base">{description}</p>
          </div>
        </div>
      </div>
    );
}

export default ProfileCard;