const PlayButton = ({ isSelecting, disabled, onClick }) => {
  const cn = isSelecting ?
    'ui disabled icon button loading' :
    'ui icon button'
  return (
    <button
      className={cn}
      disabled={isSelecting || disabled}
      onClick={onClick}>
      <i className="play icon"></i>
    </button>
  )
}

export default PlayButton
