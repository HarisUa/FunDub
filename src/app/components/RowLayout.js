const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export const RowContainer = ({ children, style }) => (
  <div style={Object.assign({}, containerStyle, style)}>
    { children }
  </div>
)

const mainStyle = {
  flex: 1,
}

export const RowMain = ({ children, style }) => (
  <div style={Object.assign({}, mainStyle, style)}>
    { children }
  </div>
)
