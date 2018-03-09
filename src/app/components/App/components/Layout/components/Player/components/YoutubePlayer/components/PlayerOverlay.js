const overlayStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 9999,
  backgroundColor: '#F1F1F1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const iconStyle = {
  fontSize: '10rem',
  paddingTop: '3rem',
}

const Overlay = () => (
  <div style={overlayStyle}>
    <i className="youtube square icon" style={iconStyle}></i>
  </div>
)

export default Overlay
