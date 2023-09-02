import { type FC } from 'react'
import { CONNECTION_STATUS } from '../constants'
import useHideOnMouseStop from '../hooks/useHideOnMouseStop'

type StatusIndicatorProps = {
  status: CONNECTION_STATUS
}

export const StatusIndicator: FC<StatusIndicatorProps> = (props) => {
  const [hide] = useHideOnMouseStop({ delay: 15000, initialHide: true })

  let status = ''
  switch (props.status) {
    case CONNECTION_STATUS.CONNECTED:
      status = '🟢 Connected'
      break
    case CONNECTION_STATUS.CONNECTING:
      status = '🟠 Trying to connect...'
      break
    case CONNECTION_STATUS.NOT_AUTHENTICATED:
    case CONNECTION_STATUS.ERROR:
      status = '🔴 Connection Error'
      break
    case CONNECTION_STATUS.DISCONNECTED:
    case CONNECTION_STATUS.UNKNOWN:
      status = '⚫ Disconnected'
      break
  }
  if (!hide) {
    return (
      <div className='fixed bottom-0 left-0 m-4 p-3 rounded-xl bg-zinc-900 z-0'>
        {status}
      </div>
    )
  } else {
    return null
  }
}
