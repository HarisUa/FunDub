const PeekButton = ({ peeking, onClick }) => {
  const iconCn = peeking ? 'remove icon' : 'film icon'
  return (
    <button
      className="ui icon button"
      onClick={onClick}>
      <i className={iconCn}></i>
    </button>
  )
}

export default PeekButton
