export const ResumeButton = ({ isSending, disabled, onResume }) => {
  const cn = isSending ?
    'ui disabled labeled icon button loading' :
    'ui labeled icon button'

  return (
    <button
      className={cn}
      disabled={isSending || disabled}
      onClick={onResume}>
      <i className="play icon"></i>
      Resume
    </button>
  )
}

export const PauseButton = ({ isSending, disabled, onPause }) => {
  const cn = isSending ?
    'ui disabled labeled icon button loading' :
    'ui labeled icon button'

  return (
    <button
      className={cn}
      disabled={isSending || disabled}
      onClick={onPause}>
      <i className="pause icon"></i>
      Pause
    </button>
  )
}

export const PrevButton = ({ isSending, disabled, onPrevious }) => {
  const cn = isSending ?
    'ui disabled labeled icon button loading' :
    'ui labeled icon button'

  return (
    <button
      className={cn}
      disabled={isSending || disabled}
      onClick={onPrevious}>
      <i className="step backward icon"></i>
      Previous
    </button>
  )
}

export const NextButton = ({ isSending, disabled, onNext }) => {
  const cn = isSending ?
    'ui disabled right labeled icon button loading' :
    'ui right labeled icon button'

  return (
    <button
      className={cn}
      disabled={isSending || disabled}
      onClick={onNext}>
      <i className="step forward icon"></i>
      Next
    </button>
  )
}

export const SyncButton = ({ isSending, disabled, onSync }) => {
  const cn = isSending ?
    'ui disabled labeled icon button loading' :
    'ui labeled icon button'

  return (
    <button
      className={cn}
      disabled={isSending || disabled}
      style={{margin: 0}}
      onClick={onSync}>
      <i className="refresh icon"></i>
      Sync Play Time
    </button>
  )
}
