import {
  AccountBalanceDTO,
  AccountHolder,
  AccountTransactionsResponseDTO,
  AccountTransferDTO,
  AccountTransferResponseDTO,
  ApiResponseSuccess,
  IBank,
  IBeneficiary,
  IThunkAPIStatus,
} from "@app-model";

import asyncThunkWrapper from "../helpers/asyncThunkWrapper";
import axiosClient from "../config/axiosClient";
import {
  ACCOUNT_TRANSACTIONS,
  ACTIVATION_REQUEST,
  CREATE_BENEFICIARIES,
  GET_BANKS,
  GET_BENEFICIARIES,
  GET_USER_ACCOUNT_BALANCE,
  PERFORM_ACCOUNT_TRANSFER,
  PERFORM_NAME_ENQUIRY,
} from "./types";
import { createSlice } from "@reduxjs/toolkit";

export const getAccountBalanceAction = asyncThunkWrapper<
  ApiResponseSuccess<AccountBalanceDTO>,
  void
>(GET_USER_ACCOUNT_BALANCE, async () => {
  const response = await axiosClient.get(`/api/v1/account/balance`);

  return response.data;
});

export const getAccountTransactionsAction = asyncThunkWrapper<
  ApiResponseSuccess<AccountTransactionsResponseDTO>,
  { startDate: string; endDate: string } | void
>(
  ACCOUNT_TRANSACTIONS,
  async (args: { startDate: string; endDate: string } | void) => {
    const response = await axiosClient.get(
      args
        ? `/api/v1/account/transactions?startDate=${args.startDate}&endDate=${args.endDate}`
        : `/api/v1/account/transactions`
    );

    return response.data;
  }
);

export const getBeneficiariesAction = asyncThunkWrapper<
  ApiResponseSuccess<IBeneficiary>,
  void
>(GET_BENEFICIARIES, async () => {
  const response = await axiosClient.get(`/api/v1/beneficiaries`);
  return response.data;
});

export const createBeneficiaryAction = asyncThunkWrapper<
  ApiResponseSuccess<IBeneficiary>,
  IBeneficiary
>(CREATE_BENEFICIARIES, async (args) => {
  const response = await axiosClient.post(`/api/v1/beneficary/add`, args);
  return response.data;
});

export const getAllBankAction = asyncThunkWrapper<
  ApiResponseSuccess<IBank[]>,
  void
>(GET_BANKS, async () => {
  const response = await axiosClient.get(`/api/v1/banks`);

  return response.data;
});

export const requestActivationAction = asyncThunkWrapper<
  ApiResponseSuccess<string>,
  any
>(ACTIVATION_REQUEST, async (args: any) => {
  const response = await axiosClient.post(
    `/api/v1/account/request/activation`,
    args
  );

  return response.data;
});

export const performNameEnquiryAction = asyncThunkWrapper<
  ApiResponseSuccess<AccountHolder>,
  {
    beneficiaryBankCode: string;
    beneficiaryAccountNumber: string;
  }
>(
  PERFORM_NAME_ENQUIRY,
  async (args: {
    beneficiaryBankCode: string;
    beneficiaryAccountNumber: string;
  }) => {
    const response = await axiosClient.post(`/api/v1/account/enquiry`, args);

    return response.data;
  }
);

export const initiateAccountTranfer = asyncThunkWrapper<
  ApiResponseSuccess<AccountTransferResponseDTO>,
  AccountTransferDTO
>(PERFORM_ACCOUNT_TRANSFER, async (args: AccountTransferDTO) => {
  const response = await axiosClient.post(`/api/v1/account/transfer`, args);

  return response.data;
});

export interface IBankState {
  accountBalance: AccountBalanceDTO | null;

  getUserAccountBalanceStatus: IThunkAPIStatus;
  getUserAccountBalanceSuccess: string;
  getUserAccountBalanceError: string;

  getAccountTransactionStatus: IThunkAPIStatus;
  getAccountTransactionSuccess: string;
  getAccountTransactionError: string;

  transaction: AccountTransactionsResponseDTO | null;

  beneficiaries: IBeneficiary[];

  getBenenficiariesStatus: IThunkAPIStatus;
  getBenenficiariesSuccess: string;
  getBenenficiariesError: string;

  createBeneficiaryStatus: IThunkAPIStatus;
  createBeneficiarySuccess: string;
  createBeneficiaryError: string;

  getBankStatus: IThunkAPIStatus;
  getBankSuccess: string;
  getBankError: string;

  performAccountEnquiryStatus: IThunkAPIStatus;
  performAccountEnquirySuccess: string;
  performAccountEnquiryError: string;

  performAccountTransferRequestStatus: IThunkAPIStatus;
  performAccountTransferRequestSuccess: string;
  performAccountTransferRequestError: string;

  requestActivationStatus: IThunkAPIStatus;
  requestActivationSuccess: string;
  requestActivationError: string;

  banks: IBank[];

  accountHolder: AccountHolder | null;

  accountTransferInfo: {
    accountNumber: string;
    bank: {
      label: string;
      value: string;
    };
    accountName: string;
    amount: string;
    narration: string;
    saveAsBeneficiary?: boolean;
    pin?: string;
  } | null;

  accountTransferResponse: AccountTransferResponseDTO | null;
}

const initialState: IBankState = {
  accountBalance: null,

  getUserAccountBalanceStatus: "idle",
  getUserAccountBalanceSuccess: "",
  getUserAccountBalanceError: "",

  performAccountEnquiryStatus: "idle",
  performAccountEnquirySuccess: "",
  performAccountEnquiryError: "",

  performAccountTransferRequestStatus: "idle",
  performAccountTransferRequestSuccess: "",
  performAccountTransferRequestError: "",

  getAccountTransactionStatus: "idle",
  getAccountTransactionSuccess: "",
  getAccountTransactionError: "",

  transaction: null,
  beneficiaries: [],

  getBenenficiariesStatus: "idle",
  getBenenficiariesSuccess: "",
  getBenenficiariesError: "",

  createBeneficiaryStatus: "idle",
  createBeneficiarySuccess: "",
  createBeneficiaryError: "",

  getBankStatus: "idle",
  getBankSuccess: "",
  getBankError: "",

  requestActivationStatus: "idle",
  requestActivationSuccess: "",
  requestActivationError: "",

  banks: [],

  accountHolder: null,

  accountTransferInfo: null,

  accountTransferResponse: null,
};

const bankSlice = createSlice({
  name: "bankSlice",
  initialState,
  reducers: {
    clearCreateBeneficiaryStatus(state: IBankState) {
      state.createBeneficiaryStatus = "idle";
      state.createBeneficiarySuccess = "";
      state.createBeneficiaryError = "";
    },

    clearAccountActivationStatus(state: IBankState) {
      state.requestActivationStatus = "idle";
      state.requestActivationSuccess = "";
      state.requestActivationError = "";
    },
    clearAccountHolder(state: IBankState) {
      state.accountHolder = null;
    },

    saveAccountTransferInfo(state: IBankState, action) {
      state.accountTransferInfo = action.payload;
    },
  },

  extraReducers: (builder) => {
    // Use dynamic import to avoid circular dependency
    builder.addCase(getAccountBalanceAction.pending, (state, action) => {
      state.getUserAccountBalanceStatus = "loading";
    });
    builder.addCase(getAccountBalanceAction.fulfilled, (state, action) => {
      state.getUserAccountBalanceStatus = "completed";
      state.accountBalance = action.payload.result as AccountBalanceDTO;
    });
    builder.addCase(getAccountBalanceAction.rejected, (state, action) => {
      state.getUserAccountBalanceStatus = "failed";
      state.getUserAccountBalanceError = action.payload?.error as string;
    });

    builder.addCase(getAccountTransactionsAction.pending, (state, action) => {
      state.getAccountTransactionStatus = "loading";
    });
    builder.addCase(getAccountTransactionsAction.fulfilled, (state, action) => {
      state.getAccountTransactionStatus = "completed";
      state.transaction = action.payload
        .result as AccountTransactionsResponseDTO;
    });
    builder.addCase(getAccountTransactionsAction.rejected, (state, action) => {
      state.getAccountTransactionStatus = "failed";
      state.getAccountTransactionError = action.payload?.error as string;
    });

    builder.addCase(getBeneficiariesAction.pending, (state, action) => {
      state.getBenenficiariesStatus = "loading";
    });
    builder.addCase(getBeneficiariesAction.fulfilled, (state, action) => {
      state.getBenenficiariesStatus = "completed";
      state.beneficiaries = action.payload.results as IBeneficiary[];
    });
    builder.addCase(getBeneficiariesAction.rejected, (state, action) => {
      state.getBenenficiariesStatus = "failed";
      state.getBenenficiariesError = action.payload?.error as string;
    });

    builder.addCase(getAllBankAction.pending, (state, action) => {
      state.getBankStatus = "loading";
    });
    builder.addCase(getAllBankAction.fulfilled, (state, action) => {
      state.getBankStatus = "completed";
      state.banks = action.payload.result as IBank[];
    });
    builder.addCase(getAllBankAction.rejected, (state, action) => {
      state.getBankStatus = "failed";
      state.getBankError = action.payload?.error as string;
    });

    builder.addCase(createBeneficiaryAction.pending, (state, action) => {
      state.createBeneficiaryStatus = "loading";
    });
    builder.addCase(createBeneficiaryAction.fulfilled, (state, action) => {
      state.createBeneficiaryStatus = "completed";
    });
    builder.addCase(createBeneficiaryAction.rejected, (state, action) => {
      state.createBeneficiaryStatus = "failed";
      state.createBeneficiaryError = action.payload?.message as string;
    });

    builder.addCase(requestActivationAction.pending, (state, action) => {
      state.requestActivationStatus = "loading";
    });
    builder.addCase(requestActivationAction.fulfilled, (state, action) => {
      state.requestActivationStatus = "completed";
      state.requestActivationSuccess = action.payload.message;
    });
    builder.addCase(requestActivationAction.rejected, (state, action) => {
      state.requestActivationError = "failed";
      state.requestActivationError = action.payload?.error as string;
    });

    builder.addCase(performNameEnquiryAction.pending, (state, action) => {
      state.performAccountEnquiryStatus = "loading";
    });
    builder.addCase(performNameEnquiryAction.fulfilled, (state, action) => {
      state.performAccountEnquiryStatus = "completed";
      state.performAccountEnquirySuccess = action.payload.message;
      state.accountHolder = action.payload.result as AccountHolder;
    });
    builder.addCase(performNameEnquiryAction.rejected, (state, action) => {
      state.performAccountEnquiryStatus = "failed";
      state.performAccountEnquiryError = action.payload?.error as string;
    });

    builder.addCase(initiateAccountTranfer.pending, (state, action) => {
      state.performAccountTransferRequestStatus = "loading";
    });
    builder.addCase(initiateAccountTranfer.fulfilled, (state, action) => {
      state.performAccountTransferRequestStatus = "completed";
      state.performAccountTransferRequestSuccess = action.payload.message;
      state.accountTransferResponse = action.payload
        .result as AccountTransferResponseDTO;
    });
    builder.addCase(initiateAccountTranfer.rejected, (state, action) => {
      state.performAccountTransferRequestStatus = "failed";
      state.performAccountTransferRequestError = action.payload
        ?.message as string;
    });
  },
});

export const {
  clearCreateBeneficiaryStatus,
  clearAccountActivationStatus,
  clearAccountHolder,
  saveAccountTransferInfo,
} = bankSlice.actions;

export default bankSlice.reducer;
