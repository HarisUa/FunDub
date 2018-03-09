const HideSearch = ({ onHide }) => (
  <button
    className="ui negative icon button"
    style={{margin: 0}}
    onClick={onHide}>
    <i className="remove icon"></i>
  </button>
)

export default HideSearch
