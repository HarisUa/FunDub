const AddButton = ({ isAdding, disabled, onClick }) => {
  const cn = isAdding ?
    'ui positive disabled loading icon button' :
    'ui positive icon button'

  return (
    <button
      className={cn}
      disabled={isAdding || disabled}
      onClick={onClick}>
      <i className="plus icon"></i>
    </button>
  )
}

export default AddButton
