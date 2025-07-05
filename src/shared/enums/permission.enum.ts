export enum PermissionEnum {
  // 🔐 AUTH
  VIEW_ME = 'view_me',
  UPDATE_ME = 'update_me',

  // 👤 USER
  CREATE_USER = 'create_user',
  READ_USER = 'read_user',
  UPDATE_USER = 'update_user',
  DELETE_USER = 'delete_user',

  // 🧱 ROLE
  CREATE_ROLE = 'create_role',
  READ_ROLE = 'read_role',
  UPDATE_ROLE = 'update_role',
  DELETE_ROLE = 'delete_role',

  // 🛡️ PERMISSION
  READ_PERMISSION = 'read_permission',

  // 📝 AUDIT LOG
  READ_AUDIT_LOG = 'read_audit_log',

  // 🧪 TESTING or DEBUG
  ACCESS_TEST_ENDPOINT = 'access_test_endpoint',
}
