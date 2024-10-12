import React from 'react'

type Props = React.AudioHTMLAttributes<HTMLAudioElement>

const Audio = (props: Props) => <audio {...props} className="hide" />

export default Audio
