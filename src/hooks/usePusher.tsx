import Pusher from 'pusher-js'
import { useEffect } from 'react'

interface UsePusherProps {
  channelName: string | null
  eventName: string
  callback: (data: any) => void
}

const usePusher = ({ channelName, eventName, callback }: UsePusherProps) => {
  useEffect(() => {
    if (!channelName) return

    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
      wsHost: import.meta.env.VITE_PUSHER_HOST,
      wsPort: import.meta.env.VITE_PUSHER_PORT,
      forceTLS: false,
      enabledTransports: ['ws', 'wss'],
      cluster: 'eu',
    })

    const channel = pusher.subscribe(channelName)
    channel.bind(eventName, (data) => {
      callback(data)
    })

    return () => {
      channel.unbind()
      pusher.unsubscribe(channelName)
    }
  }, [channelName, eventName, callback])
}

export default usePusher
