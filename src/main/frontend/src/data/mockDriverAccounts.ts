interface DriverAccount {
  firstName: string;
  lastName: string;
  accountIdentifier: string;
  email: string;
  driverLicenseNumber: string;
  accountLocked: string;
  activePermitCount: number;
  orderCount: number;
  temporaryPermitCount: number;
  citationCount: number;
  lastOrderDate: string;
  lastCitationDate: string;
  driverAddressLine1: string;
  driverAddressLine2: string;
  driverCity: string;
  driverState: string;
  driverZipOrPostalCode: number;
  phoneType: string;
  areaCodeAndPhoneNumber: string;
  phoneExtension: string;
  driverAttributeName: string;
  driverAttributeValue: string;
}

export const mockData: DriverAccount[] = [
  {
    firstName: "John",
    lastName: "Doe",
    accountIdentifier: "123456",
    email: "johndoe@example.com",
    driverLicenseNumber: "AB123456",
    accountLocked: "No",
    activePermitCount: 2,
    orderCount: 4,
    temporaryPermitCount: 1,
    citationCount: 0,
    lastOrderDate: "01-01-2022",
    lastCitationDate: "",
    driverAddressLine1: "123 Main St",
    driverAddressLine2: "",
    driverCity: "Anytown",
    driverState: "OH",
    driverZipOrPostalCode: 12345,
    phoneType: "Home number",
    areaCodeAndPhoneNumber: "(555) 555-5555",
    phoneExtension: "",
    driverAttributeName: "2) Status",
    driverAttributeValue: "[ Active ]",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    accountIdentifier: "789012",
    email: "janesmith@example.com",
    driverLicenseNumber: "CD789012",
    accountLocked: "No",
    activePermitCount: 1,
    orderCount: 3,
    temporaryPermitCount: 0,
    citationCount: 1,
    lastOrderDate: "02-15-2022",
    lastCitationDate: "03-01-2022",
    driverAddressLine1: "456 Park Ave",
    driverAddressLine2: "Apt 2",
    driverCity: "Anothertown",
    driverState: "OH",
    driverZipOrPostalCode: 56789,
    phoneType: "Cell number",
    areaCodeAndPhoneNumber: "(555) 555-1234",
    phoneExtension: "",
    driverAttributeName: "2) Status",
    driverAttributeValue: "[ Active ]",
  },
];
