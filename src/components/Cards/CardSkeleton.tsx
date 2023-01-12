import React from 'react';
import {ICardSkeletonProps} from "../../models";

function CardSkeleton({count, size = 's', type = "card"}: ICardSkeletonProps) {
  const content = []
  const sizes = {
    's' : 'h-12',
    'm' : 'h-24',
    'l' : 'h-36',
  }
  const types = {
    "card" : (
      <>
        <div className="rounded-full bg-slate-700 h-1/3 w-1/2"></div>
        <span className="rounded-full bg-slate-700 h-1/3 w-1/12"></span>
      </>
    ),
    "photo" : (
      <>
        <div className="rounded-full bg-slate-700 m-auto h-1/2 w-1/2"></div>
      </>
    )
  }
  for (let i = 0; i < count; i++) {
    content.push(
      <div key={i}
        className={`box-border animate-pulse px-2.5 ${sizes[size]} rounded border-slate-700 border-2 mb-2 flex items-center justify-between`}>
        {types[type]}
      </div>)
  }
  return (<>{content}</>)
}

export default CardSkeleton;