const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid rgba(34,36,38,.15)',
  overflowX: 'auto',
}

export const ListItem = ({ children }) => (
  <div style={containerStyle}>
    { children }
  </div>
)

const controlStyle = {
  marginLeft: 15,
  flexShrink: 0,
}

export const ListItemControl = ({ children }) => (
  <div style={controlStyle}>
    { children }
  </div>
)
