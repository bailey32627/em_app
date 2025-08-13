
export interface Facility {
  id: number;
  name: string;
  division: {
    id: number;
    name: string;
  };
}

export interface Division {
  id: number;
  name: string;
  facilities: Facility[];
};


export interface Organization {
  id: number;
  name: string;
  is_owner: boolean;
  subscription_active: boolean;
}

export interface UserProfile {
  id: number;
  fullname: string;
  email: string;
  is_organization_admin: boolean;
  organization: Organization;
  admin_divisions: Division[];
  admin_facilities: Facility[];
  member_facilities: Facility[];
}
