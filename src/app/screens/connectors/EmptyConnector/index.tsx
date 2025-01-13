import { ChangeEvent, useEffect, useState } from "react";
import Button from "~/app/components/Button";
import Input from "~/app/components/form/Input";
import toast from "~/app/components/Toast";
import ConnectionErrorToast from "~/app/components/toasts/ConnectionErrorToast";
import msg from "~/common/lib/msg";
import utils from "~/common/lib/utils";

export const EmptyConnector: React.FC = () => {
  const [accountName, setAccountName] = useState<string>("Nostr Signer");
  const InitializeAccount = async () => {
    const account = {
      name: accountName,
      config: {},
      connector: "empty",
    };

    try {
      console.log("Initializating account...");
      const addResult = await msg.request("addAccount", account);
      console.log("Add account Result", addResult);
      if (addResult.accountId) {
        await msg.request("selectAccount", {
          id: addResult.accountId,
        });
        utils.redirectPage(`options.html#/accounts`);
      }
    } catch (e) {
      console.error(e);
      let message = "";
      if (e instanceof Error) {
        message += `${e.message}`;
      }
      toast.error(<ConnectionErrorToast message={message} />);
    }
  };
  useEffect(() => {
    console.log("Inside EmptyConnector");
    //InitializeAccount();
  }, []);

  return (
    <div>
      <label className="mt-6 dark:text-neutral-400">Account Name:</label>
      <div
        className="mt-6 dark:text-neutral-400"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <Input
          placeholder="Account name"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setAccountName(e.target.value);
          }}
          value={accountName}
          className="mt-6 dark:text-neutral-400"
          style={{ margin: 10 }}
        />
        <Button
          label="Submit"
          onClick={() => {
            InitializeAccount();
          }}
        />
      </div>
    </div>
  );
};
