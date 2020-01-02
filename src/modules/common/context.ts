interface Role {
  id: string;
  roleName: string;
}

interface CurrentUser {
  id: string;
  roles: [Role];
}

export interface Context {
  currentUser: CurrentUser;
}
