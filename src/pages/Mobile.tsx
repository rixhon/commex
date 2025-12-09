import { useLanguage } from "../contexts/LanguageContext";
import mobileScreens from "../assets/mobile-screens.png";

export function Mobile() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-7xl">
        <div className="flex justify-center">
          <img
            src={mobileScreens}
            alt="Mobile Screens"
            className="h-auto w-full max-w-full object-contain"
            style={{ maxHeight: "90vh" }}
          />
        </div>
      </div>
    </div>
  );
}

