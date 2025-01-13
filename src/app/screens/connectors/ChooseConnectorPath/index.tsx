import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "~/app/components/Button";
import ConnectorPath from "~/app/components/ConnectorPath";

export default function ChooseConnectorPath() {
  const { t } = useTranslation("translation", {
    keyPrefix: "choose_path",
  });

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative">
        <h1 className="text-2xl font-bold dark:text-white text-center mb-8">
          {t("title")}
        </h1>
        <div className="grid lg:grid-cols-2 gap-8 mb-4">
          <ConnectorPath
            title={t("other.title")}
            icon={
              <div className="grid grid-cols-2 gap-1">
                <img
                  src="https://raw.githubusercontent.com/github/explore/0382c83d646175721d5050463ec7ef2e5acf92f2/topics/nostr/nostr.png"
                  className="w-[18px] h-[18px] rounded-md"
                />
              </div>
            }
            description={t("other.description")}
            actions={
              <Link to="choose-connector/empty" className="flex flex-1">
                <Button tabIndex={-1} label={t("other.connect")} flex />
              </Link>
            }
          />
        </div>
      </div>
    </div>
  );
}
