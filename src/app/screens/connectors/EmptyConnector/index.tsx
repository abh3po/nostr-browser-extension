import { useEffect } from "react";
import toast from "~/app/components/Toast";
import ConnectionErrorToast from "~/app/components/toasts/ConnectionErrorToast";
import msg from "~/common/lib/msg";
import utils from "~/common/lib/utils";

export const EmptyConnector: React.FC = () => {
  const InitializeAccount = async () => {
    const account = {
      name: `Nostr Signer`,
      id: "1",
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
        utils.redirectPage(`options.html#/nostr/settings`);
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
    InitializeAccount();
  }, []);

  return <div style={{ color: "White" }}> EmptyConnector </div>;
};
