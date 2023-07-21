declare module "@app-model" {
  interface ApiResponseError {
    message: string | string[];
    code: number;
    error: string;
    statusCode: number;
  }

  interface ApiResponseSuccess<T> {
    message: string;
    code: number;
    timestamp?: string;
    data: T;
    result?: T;
    results?: T[];
  }

  type IThunkAPIStatus = "idle" | "loading" | "completed" | "failed";

  interface UserInfo {
    access_token?: string;
    accessToken?: {
      access_token: string;
    };
  }

  type CustomJwtPayload = JwtPayload & {
    permissions: IPermission[];
    userId: number;
    partnerId?: number;
    [p: string]: any;
  };

  interface IUserData {
    id: number;
    code: string;
    firstName: string;
    lastName: string;
    username: string;
    companyName: string;
    designation: string;
    password: string;
    rawPassword: string;
    email: string;
    phone: string;
    gender: string;
    profileImageUrl: string;
    active: boolean;
    enabled: boolean;
    loginToken: string;
    gatewayId: string;
    loginDate: Date;
    contacts: IContact[];
    partner: IPartner;
    partnerId: number;
    roles: IRole[];
    createdAt: Date;
    updatedAt: Date;
    partner: IPartner;
  }

  interface IPartner {
    id: number;
    name: string;
    slug: string;
    phone: string;
    email: string;
    totalStaff: number;
    totalTechnicians: number;
    brands: string[];
    images: string[];
    yearOfIncorporation: number;
    cac: string;
    vatNumber: string;
    nameOfDirector: string;
    nameOfManager: string;
    logo: string;
    googleMap: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    workingHours: string[];
    users: IUser[];
    categories: ICategory[];
    technicians: [];
    contact: IContact;
    isAccountProvisioned: boolean;
    createdAt: Date;
    updatedAt: Date;
    accountProvisionStatus:
      | "NOT_REQUESTED"
      | "PENDING"
      | "APPROVED"
      | "DECLINED";
  }

  interface LoginDTO {
    username: string;
    password: string;
  }

  interface AccountBalanceDTO {
    ledgerBalance: number;
    availableBalance: number;
    withdrawableBalance: number;
    accountNumber?: string;
    accountName?: string;
    accountProvider?: string;
    businessName?: string;
  }

  interface PostingEntry {
    entryCode: string;
    referenceNumber: string;
    reversalReferenceNumber: any;
    accountNumber: string;
    linkedAccountNumber: string;
    realDate: string;
    amount: number;
    openingBalance: number;
    balanceAfter: number;
    narration: string;
    instrumentNumber: string;
    postingRecordType: number;
    postedBy: string;
    financialDate: string;
    financialDateToBackdate: any;
    ipAddress: any;
    merchant: "Kuda";
    recipientName: any;
    senderName: any;
    recipientBank: any;
    senderBank: any;
    userID: any;
    hasCOTWaiver: boolean;
    forceDebit: boolean;
    postingType: number;
    transactionMethod: number;
    sessionId: string;
    charge: number;
    beneficiaryName: string;
    allowChangeCategory: boolean;
    categoryId: number;
    categorySet: boolean;
    tagId: number;
    beneficiaryReference: string;
    goalTitle: string;
    phoneNumberRecharged: string;
    billId: string;
    tier0Waiver: boolean;
    detailOfClosure: any;
    reasonForClosure: any;
    closedBy: any;
  }

  interface AccountTransactionsResponseDTO {
    postingsHistory: PostingEntry[];
    totalRecordInStore: number;
    totalDebit: number;
    totalCredit: number;
    statusCode: string;
    message: string;
  }

  interface UploadResult {
    file: {
      url: string;
      name: string;
    };
    uploadStartTime: Date | null;
    busboyFinishTime: Date | null;
    s3UploadFinishTime: Date | null;
  }

  interface IBeneficiary {
    name: string;
    id?: number;
    accountNumber: string;
    accountName: string;
    bankName: string;
    bankCode?: string;
  }

  export interface IGarageSignupModel {
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    phone: string;
    dialCode: string;
    state: string;
    isRegistered?: boolean;
    address: string;
    password: string;
  }

  interface IBank {
    bankName: string;
    bankCode: string;
  }
}
