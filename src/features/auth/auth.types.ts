type TEndpointDefaultTimeout = number;

// Set a default timeout in miliseconds
export const API_ENDPOINT_DEAFULT_TIMEOUT:TEndpointDefaultTimeout = 5000;

export type TLoginAuthArgs = {
  username: string,
  password: string
}

export type TLoginAuthResponse = {
  accessToken: string | null | undefined
};

export type TAccessToken = TLoginAuthResponse;

export type TUserInfo = {
  roles: Array<string>,
  username: string
}

export type TAccessTokenResponse = {
  UserInfo : TUserInfo,
  exp : number,
  iat: number
};

export enum TUserRoles {
  Employee = 'Employee',
	Manager = 'Manager',
	Admin = 'Admin',
  SuperAdmin = 'SuperAdmin',
}

export const userRoles = {
	Employee: TUserRoles.Employee,
	Manager: TUserRoles.Manager,
	Admin: TUserRoles.Admin,
  SuperAdmin: TUserRoles.SuperAdmin
};


export type TUserRolesTypes = Array<keyof typeof userRoles>;
export const allUsers:TUserRolesTypes = [TUserRoles.Admin, TUserRoles.SuperAdmin, TUserRoles.Manager, TUserRoles.Employee];
export const superAdmin:TUserRolesTypes = [TUserRoles.SuperAdmin];
export const admins:TUserRolesTypes = [TUserRoles.SuperAdmin, TUserRoles.Admin];
export const admin:TUserRolesTypes = [TUserRoles.Admin];
export const manager:TUserRolesTypes = [TUserRoles.Manager];
export const employee:TUserRolesTypes = [TUserRoles.Employee];
export const nonUser:TUserRolesTypes = [];

//console.log(staff);