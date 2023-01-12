import React, {useState} from 'react';
import {AiFillCaretLeft, AiFillCaretDown} from 'react-icons/ai'
import {IAlbum, IPhoto, IPopupPayload, IUser} from "../models";
import {useAppDispatch} from "../store/store";
import {openPopup} from "../store/Slices/popupSlice";

export interface IExpandablePanelProps {
  header: JSX.Element | string,
  children?: JSX.Element | string,
  selectedItem : IUser | IAlbum | IPhoto | null,
  value : string,
  target : string
}

function ExpandablePanel({header, children, selectedItem, value, target}: IExpandablePanelProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const onClick = (e : React.MouseEvent) => {
    console.log(e)
    const payload: IPopupPayload = {
      currentValue : value,
      selectedItem : selectedItem,
      offsetLeft : e.pageX,
      offsetTop : e.pageY,
      target
    }
    dispatch(openPopup(payload))
  }
  const onClickHandle = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLElement
    if (!target.classList.contains('popup-activator')) {
      setIsExpanded(!isExpanded)
    }
  };
  return (
    <div className={"w-full mb-2 box-border rounded border-slate-700 border-2 py-2 px-2.5"}>
      <div className={"h-10 items-center flex justify-between"} onClick={onClickHandle}>
        <div onClick={onClick} className="popup-activator cursor-pointer">
          {header}
        </div>
        {isExpanded ? <AiFillCaretDown size={'1.5em'}/> : <AiFillCaretLeft size={'1.5em'}/>}
      </div>
      {isExpanded && children}
    </div>
  );
}

export default ExpandablePanel;