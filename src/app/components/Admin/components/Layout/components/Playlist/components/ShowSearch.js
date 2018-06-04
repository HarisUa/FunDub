const ShowSearch = ({ onShow, icon }) => (
  <button
    className="ui positive icon button"
    style={{margin: 5}}
    onClick={onShow}>
    <i className={icon + ' icon'}></i>
  </button>
)

export default ShowSearch
