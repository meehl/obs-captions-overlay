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
    <div style={{ position: 'relative' }}>
      <div
        style={{
          backgroundColor: props.color,
          width: 28,
          height: 28,
          borderRadius: 8,
          cursor: 'pointer',
          border: '3px solid #000',
        }}
        onClick={() => {
          setIsOpen(true)
        }}
      />

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            borderRadius: '9px',
            top: '100%',
            zIndex: 1,
            left: 0,
          }}
          ref={pickerRef}
        >
          {props.children}
        </div>
      )}
    </div>
  )
}
