/* eslint-disable jsx-a11y/click-events-have-key-events */
import { type FC, type ReactNode, useRef, useState } from 'react'
import useClickOutside from '../hooks/useClickOutside'

interface ColorPickerPopupProps {
  color: string
  children?: ReactNode
}

export const ColorPickerPopup: FC<ColorPickerPopupProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef(null)

  useClickOutside(pickerRef, () => {
    setIsOpen(false)
  })

  return (
    <div className="relative">
      <div
        role="button"
        tabIndex={0}
        className="rounded-lg h-7 w-7 border-2 border-black cursor-pointer"
        style={{
          backgroundColor: props.color,
        }}
        onClick={() => {
          setIsOpen(true)
        }}
      />
      {isOpen && (
        <div className="absolute top-[100%] left-0 rounded-lg z-10" ref={pickerRef}>
          {props.children}
        </div>
      )}
    </div>
  )
}
