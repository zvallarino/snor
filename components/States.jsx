import React from 'react'

function States({state, disease, day28, total}) {
  return (
    <div className = "flex flex-col bg-gray-100 rounded-md border-2 text-sm text-gray-950 mx-2 px-2 my-2">
        <div className="font-semibold">{state},USA</div>
        <hr className=" border-gray-t border-gray-400 rounded-full" />
        <div>Leading Disease:{disease}</div>
        <div className="flex justify-between"><div>28 Day:  {day28}</div><div>Totals:  {total}</div></div>
  </div>
  )
}

export default States;