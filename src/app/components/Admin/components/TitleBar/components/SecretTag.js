const style= {
  marginLeft: '2em'
}

const SecretTag = ({ username }) => (
  <div
    className="ui grey large tag label"
    style={style}>
    {username}
  </div>
)

export default SecretTag
