import React, {useRef, useState} from 'react';
import {IPhotoProps} from "../../models";
import {FaTrash} from 'react-icons/fa'
import {useRemovePhotoMutation} from "../../store/APIs/photosApi";
import Spinner from "../Spinner";

type trashScale = 'scale-100' | 'scale-125'
type imageBlurEvents = 'enter' | 'leave'

function Photo({photo}: IPhotoProps) {
  const [deleteIsDisplayed, setDeleteIsDisplayed] = useState<boolean>(false);
  const [size, setSize] = useState<trashScale>('scale-100');
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [removePhoto, {isLoading}] = useRemovePhotoMutation()

  function blurImage(event: imageBlurEvents, e?: React.SyntheticEvent) {
    if (imageRef.current)
      switch (event) {
        case 'enter':
          imageRef.current.classList.add('blur-sm')
          setDeleteIsDisplayed(true)
          break;
        case 'leave':
          imageRef.current.classList.remove('blur-sm')
          setDeleteIsDisplayed(false)
          break;
      }
  }

  const onDivHoverHandle = () => blurImage('enter')
  const onLeaveHandle = () => blurImage('leave')

  const onTrashClick = () => removePhoto(photo)

  const onTrashLeaveHandle = (e: React.SyntheticEvent<SVGElement>) => setSize('scale-100')
  const onTrashHoverHandle = (e: React.SyntheticEvent<SVGElement>) => {
    blurImage('enter');
    setSize('scale-125')
  }

  return (
    <div className="image-wrapper my-2 relative">
      <img onMouseEnter={onDivHoverHandle}
           onMouseLeave={onLeaveHandle}
           ref={imageRef}
           className="transition duration-150"
           src={photo.url} alt="404"
      />
      {deleteIsDisplayed ?
        isLoading ?
          <Spinner
            className={`absolute ${size} left-1/2 top-1/2 transition duration-150 -translate-x-1/2 -translate-y-1/2`}
            onMouseEnter={onTrashHoverHandle} size={'m'}
          /> :
          <FaTrash color="#FFFFFF"
                   onMouseEnter={onTrashHoverHandle}
                   size={32}
                   onMouseLeave={onTrashLeaveHandle}
                   onClick={onTrashClick}
                   className={`trashPhotoLogo absolute ${size} left-1/2 top-1/2 transition duration-150 -translate-x-1/2 -translate-y-1/2`}
          />
        : null}
    </div>
  );
}

export default Photo;