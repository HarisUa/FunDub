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
          style={{marginLeft: 5}} href={'https://github.com/HarisUa'}>
          Haris
        </a> and
          <a
              style={{marginLeft: 5}} href={'https://github.com/antydemant'}>
              Ostapchuk
          </a>
      </div>
    </div>
  </h2>
)

export default Brand
