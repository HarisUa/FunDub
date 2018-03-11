const Brand = (props) => (
  <h2
    className="ui header"
    style={{margin: 0}}>
    <i className="youtube icon"></i>
    <div className="content">
        {props.playingTitle?props.playingTitle:''} 🙌 😁
      <div className="sub header">
        <i className="code icon"></i> with <i className="heart icon"></i> by
        <a
          style={{marginLeft: 5}}>
          Haris
        </a>
      </div>
    </div>
  </h2>
)

export default Brand
