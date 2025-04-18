export interface IUser {
	id: string;
	name: string;
	email: string;
	firstName: string;
	lastName: string;
	username: string;
	isVerified: boolean;
	isEnabled: boolean;
	isAccountNonExpired: boolean | null;
	isAccountNonLocked: boolean | null;
	isCredentialsNonExpired: boolean | null;
	createdAt: Date;
}

export interface IUpdateProfile {
	firstName: string;
	lastName: string;
	username: string;
	email: string;
}
