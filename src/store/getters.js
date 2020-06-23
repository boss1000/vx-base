const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  token: state => state.user.token,
  account: state => state.user.account,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  ruleData: state => state.user.ruleData,
  otherData: state => state.user.otherData,
  name: state => state.user.name,
  isPhone: state => state.app.isPhone,
  introduction: state => state.user.introduction,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  approverList: state => state.user.approver
}
export default getters
