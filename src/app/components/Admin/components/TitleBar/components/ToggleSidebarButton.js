const ToggleSidebarButton = ({ showSidebar, onClick }) => {
  const cn = showSidebar ?
    'ui icon button':
    'ui basic icon button'

  return (
    <button
      className={cn}
      style={{margin: 0}}
      data-tip="Toggle Sidebar"
      onClick={onClick}>
      <i className="sidebar icon"></i>
    </button>
  )
}

export default ToggleSidebarButton
