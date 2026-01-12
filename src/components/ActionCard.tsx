import { LucideIcon } from "lucide-react";

interface ActionCardProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

const ActionCard = ({ icon: Icon, label, onClick, variant = "primary" }: ActionCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`action-card flex flex-col items-center justify-center p-4 gap-2 w-full aspect-[4/3] ${
        variant === "secondary" ? "bg-gradient-to-br from-orange-100 to-amber-100" : ""
      }`}
    >
      <Icon size={28} className="text-primary" />
      <span className="font-semibold text-sm text-foreground">{label}</span>
    </button>
  );
};

export default ActionCard;
