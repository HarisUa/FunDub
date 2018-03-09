const DeleteButton = ({ isDeleting, disabled, onClick }) => {
  const cn = isDeleting ?
    'ui disabled negative icon button loading' :
    'ui negative icon button'
  return (
    <button
      className={cn}
      disabled={isDeleting || disabled}
      style={{margin: 0}}
      onClick={onClick}>
      <i className="remove icon"></i>
    </button>
  )
}

export default DeleteButton
