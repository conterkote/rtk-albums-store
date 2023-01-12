import React from 'react';
import {ICardWrapperProps} from "../../models";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import ExpandablePanel from "../ExpandablePanel";
import AlbumWrapper from "../Albums/AlbumWrapper";

function CardWrapper({users, isLoadingUsers, postSkeletonsCount}: ICardWrapperProps) {
  const content = users.map((user) =>
    <ExpandablePanel
      header={<Card key={user.id}
                    user={user}
      />}
      key={user.id}
      value={user.name}
      selectedItem={user}
      target={'user'}>
      <AlbumWrapper user={user}/>
    </ExpandablePanel>);
  return (
    <div className="w-full">
      {isLoadingUsers && <CardSkeleton count={5}/>}
      {content}
      <CardSkeleton count={postSkeletonsCount}/>
    </div>
  );
}

export default CardWrapper;