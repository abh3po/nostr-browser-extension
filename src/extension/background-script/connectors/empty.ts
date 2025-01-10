import { Account } from "~/types";
import Connector, {
  CheckPaymentArgs,
  CheckPaymentResponse,
  ConnectPeerArgs,
  ConnectPeerResponse,
  ConnectorTransaction,
  GetBalanceResponse,
  GetInfoResponse,
  GetTransactionsResponse,
  KeysendArgs,
  MakeInvoiceArgs,
  MakeInvoiceResponse,
  SendPaymentArgs,
  SendPaymentResponse,
  SignMessageArgs,
  SignMessageResponse,
} from "./connector.interface";

type TLVRecord = {
  type: number;
  /**
   * hex-encoded value
   */
  value: string;
};

interface Config {
  nostrWalletConnectUrl: string;
}

interface TlvRecord {
  type: number;
  value: string;
}

class EmptyConnector implements Connector {
  config: Config;

  get supportedMethods() {
    return [
      "getInfo",
      "makeInvoice",
      "sendPayment",
      "sendPaymentAsync",
      "getBalance",
      "keysend",
      "getTransactions",
      "signMessage",
    ];
  }

  constructor(account: Account, config: Config) {
    this.config = config;
  }

  async init() {
    return Promise.resolve();
  }

  async getInfo(): Promise<GetInfoResponse> {
    return { data: { alias: "empty" } };
  }

  async getBalance(): Promise<GetBalanceResponse> {
    return Promise.resolve({ data: { balance: 0, currency: "BTC" } });
  }

  async getTransactions(): Promise<GetTransactionsResponse> {
    throw new Error("Method not implemented.");
  }

  async makeInvoice(args: MakeInvoiceArgs): Promise<MakeInvoiceResponse> {
    throw new Error("Method not implemented.");
  }

  async sendPayment(args: SendPaymentArgs): Promise<SendPaymentResponse> {
    throw new Error("Method not implemented.");
  }

  async keysend(args: KeysendArgs): Promise<SendPaymentResponse> {
    throw new Error("Method not implemented.");
  }

  async checkPayment(args: CheckPaymentArgs): Promise<CheckPaymentResponse> {
    throw new Error("Method not implemented.");
  }

  async signMessage(args: SignMessageArgs): Promise<SignMessageResponse> {
    throw new Error("Method not implemented.");
  }

  connectPeer(args: ConnectPeerArgs): Promise<ConnectPeerResponse> {
    throw new Error("Method not implemented.");
  }

  async unload(): Promise<void> {
    throw Promise.resolve();
  }

  private customRecordsToTlv(
    customRecords: Record<string, string>
  ): TlvRecord[] {
    return [];
  }

  private tlvToCustomRecords(
    tlvRecords: TLVRecord[] | undefined
  ): ConnectorTransaction["custom_records"] | undefined {
    return {};
  }
}

export default EmptyConnector;
