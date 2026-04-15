import { useEffect } from "react";
import { X } from "lucide-react";

const Popup = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-[10000] w-[90%] max-w-md bg-background rounded-xl  shadow-xl p-6 animate-scaleIn">
        <div className="flex items-center ">
          <h1 className="text-lg font-semibold">{title}</h1>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Popup;
