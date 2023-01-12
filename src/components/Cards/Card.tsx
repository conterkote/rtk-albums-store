import React from 'react';
import {ICardProps} from "../../models";

function Card({ user } : ICardProps) {
  return <span className="popup-activator">Username : {user.name}</span>;
}

export default Card;